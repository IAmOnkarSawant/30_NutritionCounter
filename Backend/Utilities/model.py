#######################################
            # IMPORTS #
#######################################

import keras_ocr
import nltk
nltk.download('stopwords')

# tesnorflimport nltk
from nltk.corpus import stopwords


#######################################


import matplotlib.pyplot as plt
images = [
    keras_ocr.tools.read(img) for img in ['chicken.jpg',
                                          'WhatsApp Image 2023-10-21 at 6.45.48 PM.jpeg',]
]

prediction_groups = pipeline.recognize(images)
fig, axs = plt.subplots(nrows=len(images), figsize=(10, 20))
for ax, image, predictions in zip(axs, images, prediction_groups):
    keras_ocr.tools.drawAnnotations(image=image,
                                    predictions=predictions,
                                    ax=ax)

predicted_image = prediction_groups[0]
ls=[]

for text, box in predicted_image:
  ls.append(text)
  print(text)

print(ls)

txt = " "
tx = txt.join(ls)
print(tx)

import nltk

from nltk.tokenize import word_tokenize
nltk.download('punkt')
# ingredients = "misspelt ingredeints"
tokens = word_tokenize(tx)

# -----------------------------------------------------------------------
                    # Removing stop words
# -----------------------------------------------------------------------

stop_words = set(stopwords.words("english"))
filtered_text = [word for word in ls if word.lower() not in stop_words]
print(filtered_text)
