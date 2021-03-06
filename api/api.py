#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response

todos = []

def getTodos():
	global todos
	return list(todos)

def setTodos(newTodos):
	global todos
	todos = newTodos

def getTodoWithId(id):
	todo = [todo for todo in getTodos() if todo['id'] == id]
	if len(todo) == 0:
		abort(404)
	return todo[0]

def getMaxId():
	maxId = -1
	for todo in getTodos():
		if todo['id'] > maxId:
			maxId = todo['id']
	return maxId

def updateTodo(todo, newData):
	for prop in newData:
		if prop in newData:
			todo[prop] = newData[prop]
	return todo

def updateAndJsonifyTodo(todo):
	if len(todo) == 0:
		abort(404)
	if not request.json:
		abort(400)
	if 'title' in request.json and type(request.json['title']) != unicode:
		abort(400)
	if 'completed' in request.json and type(request.json['completed']) is not bool:
		abort(400)

	return jsonify(updateTodo(todo, request.get_json()))





app = Flask(__name__)

@app.route('/')
def index():
	return "Hello, Mars!"

@app.route('/api/todos', methods=['GET'])
def getAll():
	return jsonify({'todos': getTodos()})

# Probably ot needed
# @app.route('/api/todos/<int:id>', methods=['GET'])
# def get(id):
# 	todo = getTodoWithId(id)
# 	return jsonify({'todo': todo})

@app.route('/api/todos', methods=['POST'])
def create():
	if not request.json or not 'title' in request.json:
		abort(400)
	todo = {
		'id': getMaxId() + 1,
		'title': request.json['title'],
		'completed': False
	}
	newTodos = getTodos()
	newTodos.append(todo)
	setTodos(newTodos)
	return jsonify(todo), 201

@app.route('/api/todos/<int:id>', methods=['PUT'])
def update(id):
	todo = getTodoWithId(id)
	return updateAndJsonifyTodo(todo)

@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete(id):
	todo = getTodoWithId(id)
	newList = getTodos()
	newList.remove(todo)
	setTodos(newList)
	return jsonify({'deleted': id})

@app.route('/api/todos/updateAll', methods=['PUT'])
def updateAll():

	updateData = request.get_json()
	def performUpdate(todo):
		return updateTodo(todo, updateData)

	updated = map(performUpdate, getTodos())
	setTodos(updated)
	return jsonify({'todos': updated})

@app.route('/api/todos/deleteAll', methods=['DELETE'])
def deleteAll():
	setTodos([])
	return jsonify({'todos': []})

@app.route('/api/todos/order', methods=['POST'])
def order():
	if len(request.json) != len(getTodos()):
		abort(400)
	def orderItem(id):
		return getTodoWithId(id)
	reordered = map(orderItem, request.json)
	setTodos(reordered)
	return jsonify({'todos': reordered})

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'doh': 'you suck'}), 404)

@app.errorhandler(400)
def not_found(error):
	return make_response(jsonify({'doh': 'you really suck'}), 400)

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	return response

if __name__ == '__main__':
	app.run(debug=True)
