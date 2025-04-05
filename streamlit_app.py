import streamlit as st
import os
from PIL import Image
import google.generativeai as genai
from googletrans import Translator
from dotenv import load_dotenv
load_dotenv()
# Configure Google Generative AI with API key from environment variable
api_key = os.getenv("API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    st.error("API_KEY environment variable is not set.")

model = genai.GenerativeModel('gemini-1.5-flash')

# Set page configuration
st.set_page_config(
    page_title="GreenGuideAI"
)

# Define functions
def get_gemini_response(input, image):
    response = model.generate_content([input, image[0]])
    return response.text

def input_image_setup(uploaded_file):
    if uploaded_file is not None:
        bytes_data = uploaded_file.getvalue()
        image_parts = [{
            "mime_type": uploaded_file.type,
            "data": bytes_data
        }]
        return image_parts
    return None

# Initialize the translator
translator = Translator()
    # File uploader
with st.sidebar:
    st.title("Enquiry Booth")
    st.markdown("------")
    uploaded_file = st.file_uploader("Upload your prescription...", type=['jpg', 'jpeg', 'png'])

# Display uploaded image
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", use_container_width=True)

# Prompts for AI
    medicine_prompt = st.text_area(
        "Enter The Query",
        height=68,
        placeholder="Enter The Query",
        key="text_area_1"
    )
    topic=""" {medicine_prompt} and for the image of the plant given always give a rough estimate of the price of the plant per kg in India"""
# Translation Feature
    st.subheader("Translation Settings")
    st.markdown("If you'd like to translate the response into another language, choose a target language below:")
    target_language = st.selectbox("Select target language:", ["None", "en", "bn","hi"])

# Main App Layout
st.title("Green Guide AI")



# Submit button and response handling
submit = st.button("Generate Info")
if submit:
    with st.spinner("Generating Content...This may take a moment.."):
        if uploaded_file is not None:
            image_data = input_image_setup(uploaded_file)
            # Directly ask for the medicine information based on the image
            medicine_name = get_gemini_response(topic, image_data)

            # Handle translation
            if target_language != "None":
                translation = translator.translate(medicine_name, dest=target_language)
                st.subheader(f"Translated to {target_language.upper()}:")
                st.write(translation.text)
        else:
            st.error("Please upload a prescription image.")
