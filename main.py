from flask import Flask, render_template, request,jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df = pd.read_csv('Delhi.csv')
model = joblib.load('delhi_house_pricing.pkl')

@app.route('/locations', methods=['GET'])
def get_locations():
    unique_locations = df['Location'].unique().tolist()
    return jsonify({'locations':unique_locations})

@app.route('/predict',methods=['POST'])
def predict():
    input_data = request.get_json()
    print("Received input data:", input_data)
    required_columns = ['Location','Area','Bedrooms']
    print("Model expects columns:", model.feature_names_in_)

    try:
        if not all(col in input_data for col in required_columns):
            return jsonify({'error': f'Missing one or more required fields: {required_columns}'}), 400
            
        df = pd.DataFrame(input_data,index=[0])
        print("Created DataFrame:", df) 
        #prediction
        prediction = model.predict(df)
        print("Prediction:", prediction)
        return jsonify({'prediction':prediction.tolist()})
    except Exception as e:
        return jsonify({'error':str(e)}),500
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001,debug=True)