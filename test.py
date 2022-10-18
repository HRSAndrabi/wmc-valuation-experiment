import numpy as np

np.random.seed(0)

state_probabilities = [
	[0.25, 0.75],
	[0.25, 0.25, 0.5],
	[0.125, 0.125, 0.125, 0.125, 0.5],
	[0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.73],
]
samples = [1, 2, 3]
print(np.std(samples))
	




