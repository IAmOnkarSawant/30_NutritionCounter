import time
import cv2
import pytesseract
import os
import json
import re
from langchain_community.llms import Ollama

ollama = Ollama(base_url='http://localhost:11434', model="mistral")

def parse_model_output(model_output):
    try:
        # Parse the input string as JSON
        data = json.loads(model_output)

        # Initialize the output JSON structure
        parsed_output = {
            "ingredients_list": [],
            "nutrition_facts": {}
        }

        # Process 'ingredients_list'
        if isinstance(data.get("ingredients_list"), list):
            for item in data["ingredients_list"]:
                # If the item contains a comma, split it into multiple items
                if ',' in item:
                    parsed_output["ingredients_list"].extend([ingredient.strip() for ingredient in item.split(",")])
                else:
                    parsed_output["ingredients_list"].append(item)
        elif isinstance(data.get("ingredients_list"), str) and data.get("ingredients_list"):
            # Handle the case where 'ingredients_list' is a non-empty string
            parsed_output["ingredients_list"] = [data["ingredients_list"]]

        # Process 'nutrition_facts'
        for key, value in data.get("nutrition_facts", {}).items():
            # Simply assign the value as is, no special processing needed here
            parsed_output["nutrition_facts"][key] = value

        return parsed_output
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}

def find_image_in_folder(folder_path):
    """Find an image file in the specified folder."""
    if os.path.exists(folder_path):
        files = os.listdir(folder_path)
        if len(files) == 1 and os.path.isfile(os.path.join(folder_path, files[0])):
            return os.path.join(folder_path, files[0])
        else:
            if len(files) == 0:
                print("No files found in the folder.")
            else:
                print("There are multiple files in the folder. Unable to determine the single file.")
            return None
    else:
        print(f"The folder '{folder_path}' does not exist.")
        return None

def extract_text_from_image(image_path):
    """Extract text from an image file using OCR."""
    image = cv2.imread(image_path)
    if image is None:
        raise Exception("Failed to load the image.")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)
    return text

def preprocess_text(text, task_description):
    """Use Ollama model to process extracted text based on a task description using the `invoke` method."""
    prompt = f"""
    task={task_description}
    text = {text}
    """
    start_time = time.time() 
    response = ollama.invoke(input=prompt)
    print(type(response))
    end_time = time.time() 
    duration = end_time - start_time  
    print(f"Ollama processing time: {duration} seconds")
    return response

def postprocess_nutrient_ingredients(cleaned_list):
    """Apply the post-processing for nutrient ingredients extraction."""
    formatted_text = '\n'.join([line.strip() for line in cleaned_list if line.strip()])
    return formatted_text

def extract_values(item):
    """Extract nutrient values from text, used in post-processing for nutrition table contents."""
    matches = re.findall(r'\b\d+[a-zA-Z%]+', item)
    result = {"Nutrients": None, "weight": None, "percentage": 0}
    if len(matches) >= 2:
        result["Nutrients"] = item.split(matches[0])[0].strip()
        result["weight"] = matches[0]
        result["percentage"] = float(matches[1].rstrip('%'))
    elif len(matches) == 1:
        if item.endswith('%'):
            result["Nutrients"] = item.split(matches[0])[0].strip()
            result["percentage"] = float(matches[0].rstrip('%'))
        elif item.endswith('g'):
            result["Nutrients"] = item.split(matches[0])[0].strip()
            result["weight"] = matches[0]
    return result

image_path = '../uploads'
image_path = find_image_in_folder(folder_path)
if image_path is None:
    return


text = extract_text_from_image(image_path)
print(text)
prompt = '''
Segregation Prompt:

Given text output from Pytesseract, segregate it into two sections: an ingredients list and a nutrition fact table.

Preprocessing: Ensure text formatting consistency and handle noise.
Classification: Distinguish between ingredients list and nutrition facts using pattern matching or keyword identification.
Segregation: Separate the text into the two categories based on classification.
Output: Present the segregated content in structured format for further processing.
Ensure accuracy of original information and implement robust error handling.
Look, please don't give me the python code or any sort of such things, what i want is just the final output.Give me in a dictionary format.
If the macro-nutrints has values in both "mg" and "%", make sure to keep them and make both of them as a value for the corresponding micro nutrient, for example if Total fat has values
"2mg" and "3%", make them as value like(2mg, 3%) for key Total fat.Please keep the format uniform.
If there is no ingredients list, then keep the value corresponding to ingredient list an empty.'''
    
ollama_response = preprocess_text(text, prompt)
parsed_output = parse_model_output(ollama_response)
output = json.dumps(parsed_output, indent=2)
print(output)
    
# print("Ingredients List:\n", output['ingredients_list'])
# print("Nutrition Table Contents:\n", output['nutrition_facts'])

