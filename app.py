from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def hello():
	return render_template("index.html")

@app.route("/go", methods=["POST"])
def astar():
	data = request.get_json(force=True)
	print(data)

	adjacencyMatrix = data['adjMat']
	distanceMatrix = data['distMat']
	start = data['start']
	end = data['end']

	print("Adjacency Matrix \n {}".format(adjacencyMatrix))
	print("Distance Matrix \n {}".format(distanceMatrix))
	print("start \n {}".format(start))
	print("end \n {}".format(end))

	return jsonify({'a': (1,2,3)})
	# return jsonify({
	# 	'path': # Masukin sini wang pathnya, janlup kabari ya wujudnya kaya apa,
	# 	'dist': # Masukin sini juga wang distnya
	# })

if __name__ == '__main__':
	app.debug=True
	app.run(port=5000)