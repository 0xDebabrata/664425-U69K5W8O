import tensorflow
import string

from pickle import load
from numpy import argmax

from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.models import Model


tokenizer_url = "./sGPT/tokenizer.pkl"
model_url = "./sGPT/model_9.h5"
model_json_url = "./sGPT/model.json"
test_image_url = "./sGPT/image.jpg"

# load the tokenizer
tokenizer = load(open(tokenizer_url, "rb"))
# pre-define the max sequence length (from training)
max_length = 34

# opening and store file in a variable
json_file = open(model_json_url, "r")
loaded_model_json = json_file.read()
json_file.close()

# use Keras model_from_json to make a loaded model
loaded_model = tensorflow.keras.models.model_from_json(loaded_model_json)

# load weights into new model
loaded_model.load_weights(model_url)
model = loaded_model


# extract features from each photo in the directory
def extract_features(filename):
    # load the model
    model = VGG16()
    # opening and store file in a variable
    # re-structure the model
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)
    # load the photo
    image = load_img(filename, target_size=(224, 224))
    # convert the image pixels to a numpy array
    image = img_to_array(image)
    # reshape data for the model
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    # prepare the image for the VGG model
    image = preprocess_input(image)
    # get features
    feature = model.predict(image, verbose=0)
    return feature


# map an integer to a word
def word_for_id(integer, tokenizer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None


# generate a description for an image
def generate_desc(model, tokenizer, photo, max_length):
    # seed the generation process
    in_text = "startseq"
    # iterate over the whole length of the sequence
    for i in range(max_length):
        # integer encode input sequence
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        # pad input
        sequence = pad_sequences([sequence], maxlen=max_length)
        # predict next word
        yhat = model.predict([photo, sequence], verbose=0)
        # convert probability to integer
        yhat = argmax(yhat)
        # map integer to word
        word = word_for_id(yhat, tokenizer)
        # stop if we cannot map the word
        if word is None:
            break
        # append as input for generating the next word
        in_text += " " + word
        # stop if we predict the end of the sequence
        if word == "endseq":
            break
    return in_text


def generate_caption() -> str:
    # load and prepare the photograph
    photo = extract_features(test_image_url)
    # generate description
    description = generate_desc(model, tokenizer, photo, max_length)
    print(description)
    return description
