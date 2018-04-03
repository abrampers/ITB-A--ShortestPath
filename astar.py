import heapq 
import math

# The map is represented by a list of the node cordinates and a boolean matrix that tells whether 2 nodes are connected 
nodes = [(1,2), (3,4), (5,6)] # Node coordinates, to compute the euclidean distance
weights = [] # Contains edge weights. Disconnected nodes = -1. Row = from
weights.append([-1, 1, -1])
weights.append([-1, -1, 2])
weights.append([-1. -1, -1])
start_node = 0 
end_node = 2 
q = [] # Prio-Q for A*. (distance, (node1, node2, ...))

def eDistance(node1, node2):
	return math.sqrt((node1[0] - node2[0])**2 + (node1[1] - node2[1])**2)

# Initialize heapq with the start node
for node in range(0, len(nodes)) :
	if weights[start_node][node] != -1:
		heapq.heappush(q, (weights[start_node][node] + eDistance(nodes[node], nodes[end_node]), (start_node, node)))
# Start the A* algorithm
while True:
	if int(q[0][1][-1]) == end_node: break # If the shortest path yet is able to reach the end node, break
	prev_nodes = heapq.heappop(q)[1]
	# Compute previous distance
	prev_weight = 0
	for x in prev_nodes[1:]: prev_weight += weights[prev_nodes.index(x) - 1][x]
	# Insert into heapq
	for dest_node in range(0, len(nodes)) :
		if (weights[prev_nodes[-1]][dest_node] != -1) and (dest_node not in prev_nodes):
			heapq.heappush(q, (prev_weight + weights[prev_nodes[-1]][dest_node] + eDistance(nodes[dest_node], nodes[end_node]), prev_nodes + (dest_node,)))
# Print
print(heapq.heappop(q))