from flask import Flask,request
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
from flask import jsonify
from firebase import firebase


app = Flask(__name__)
@app.route('/matchInterest')
def matchInterest():
    module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
    model = hub.load(module_url)
    user = request.args.get('user')
    data_local_raw = {'First_Name':['Marian', 'Joe', 'Gibbs', 'Linda', 'Max', 'Cesar', 'Liza', 'Amanda', 'Dian', 'Donald'], 
             'Last_name':['Boynton', 'Vaz', 'Paul', 'Hundsay', 'Millan', 'Millar', 'Ray', 'Lopez', 'Harris', 'Obama'],
            'Interest_1':['data science', 'Roller skating', 'Look at the clouds', 'mobile app development', 'Summer job', 'Go hunting', 'to become and entrepreneur', 'CRICKET', 'theatres and drama', 'Computer Vision'],
            'Interest_2':['Python', 'reading thriller books', 'Horse races', 'deep learning in computer vision', 'Make bird feeder', 'Collect sea shells', 'Pick wild flowers', 'playing musical instruments', 'sharing my experience and wisdom', 'machine learning'],
            'Interest_3':['c++', 'legged race', 'angel investor', 'Mini golf', 'Adopt a star', 'Watch a sunset', 'all things related to cats', 'connecting with kindred spirits', 'research and discovery', 'Data Science']}
    data_local = pd.DataFrame(data_local_raw)
    callFirebase()
    return find_a_match(int(user) , data_local,model)

def callFirebase():
    
    fb = firebase.FirebaseApplication("https://interestmat.firebaseio.com/",None)
    data = fb.get("/user-list",'')
    print('data------------------------->  ',data)
def embed(input,model):
  return model(input)

def get_embeddings(person1, person2,model):
    person1_embeddings = embed(person1,model)
    person2_embeddings = embed(person2,model)
    
    return person1_embeddings, person2_embeddings

def calculate_corr_value(person1, person2,model):
    person1_embeddings, person2_embeddings = get_embeddings(person1, person2,model)
    sum = 0
    for i in range(3):
        min_diff = float('inf')
        for j in range(3):
            diff = np.sum(np.abs(person1_embeddings[i] - person2_embeddings[j]))
            if diff < min_diff:
                min_diff = diff
        
        sum += min_diff
        
    return sum

def find_a_match(person_id , data_local,model):
    person1_list = data_local.iloc[person_id, 2:].values.tolist()
    best_match_value = float('inf')
    best_match_index = 0
    result=[]
    res={}
    for j in range (10):
        if person_id != j:
            person2_list = data_local.iloc[j, 2:].values.tolist()
            corr = calculate_corr_value(person1_list, person2_list,model)
            result.append("Match score bet person {} and {} is {}".format(person_id, j, corr))
            if corr < best_match_value:
                best_match_value = corr
                best_match_index = j
    result.append("\n{} {}({}) shares similar interest with {} {}({})".format(data_local.iloc[person_id, 0], 
        data_local.iloc[person_id, 1],person_id, data_local.iloc[best_match_index, 0],data_local.iloc[best_match_index,1], best_match_index))

    res = { i : result[i] for i in range(0, len(result) ) }    
    return jsonify(res)
 
           
if __name__ == '__main__':
    app.run(debug=True)
