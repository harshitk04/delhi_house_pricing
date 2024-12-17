from flask import Flask, render_template, request
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load('delhi_house_pricing.pkl')

@app.route('/predict', methods=['POST'])

def predict():
    data = request.get_json()
    df = pd.read_csv(data,index)