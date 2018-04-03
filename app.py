from flask import Flask, render_template, request, jsonify
from astar import astar

app = Flask(__name__)

@app.route("/")
def hello():
	return render_template("index.html")

@app.route("/go", methods=["POST"])
def execute_astar():
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

	path_tuple = astar(distanceMatrix, adjacencyMatrix, int(start), int(end))

	print(path_tuple)

	return jsonify({
		'path': path_tuple[1],
		'dist': path_tuple[0]
	})

if __name__ == '__main__':
	app.debug=True
	app.run(port=5000)