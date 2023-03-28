// Define the data I am passing
const items = [
    { cost: 25, weight: 12 },
    { cost: 32, weight: 8 },
    { cost: 5, weight: 15 },
    { cost: 8, weight: 2 },
    { cost: 16, weight: 9 },
    { cost: 12, weight: 17 },
    { cost: 19, weight: 36 },
    { cost: 2, weight: 8 },
    { cost: 14, weight: 14 },
    { cost: 3, weight: 9 }
  ];
  const maxWeight = 89;
  const populationSize = 10;
  const generations = 100;
  
  // creating the fitness function
  function fitness(individual) {
    let totalCost = 0;
    let totalWeight = 0;
    // Calculate the total cost and weight of the selected items
    for (let i = 0; i < individual.length; i++) { //iterating through passed individual
      if (individual[i] === 1) { //if individual binary value is 1 => adding to total cost and weight
        totalCost += items[i].cost;
        totalWeight += items[i].weight;
      }
    }
     // Return the fitness as an object with the cost and weight values
    return (totalWeight <= maxWeight) ? { cost: totalCost, weight: totalWeight } : { cost: 0, weight: 0 }; // If the total weight exceeds the maximum weight, the fitness is zero
  }
  
  // Define the initial population
  function createIndividual() {
    // Create a new individual as an array of binary values (0 or 1)
    return Array.from({ length: items.length }, () => Math.round(Math.random())); //creating a new array of binary values
  }

  // Generate the initial population
  let population = Array.from({ length: populationSize }, createIndividual);
  
  // Implement selection
  function selection(population) {
    let fitnesses = population.map(fitness); // Calculate the fitness of each individual in the population(mapping fitness function to each individual in the population)
    let totalFitness = fitnesses.reduce((a, b) => a + b.cost, 0); // Calculate the total fitness of the population
    let probabilities = fitnesses.map(f => f.cost / totalFitness); // Calculate the probabilities of selecting each individual based on their fitness
    let cumulativeProbabilities = probabilities.reduce((a, p, i) => [...a, p + (a[i-1] || 0)], []);// Calculate the cumulative probabilities of each individual (where a - the current value, p - probabilities array, index = i of the current value)
    let selected = []; // Select individuals randomly based on their cumulative probabilities
    for (let i = 0; i < populationSize; i++) {
      let r = Math.random();
      for (let j = 0; j < populationSize; j++) {
        if (r <= cumulativeProbabilities[j]) {
          selected.push(population[j]);
          break;
        }
      }
    }
    // Return the selected individuals
    return selected;
  }
  
  // Implement crossover
  function crossover(parent1, parent2) {
     // Choose a random crossover point
    let crossoverPoint = Math.floor(Math.random() * parent1.length);
    // Create a new offspring by combining the genes of the parents at and after the crossover point
    return [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
  }
  
  // Implement mutation
  function mutation(individual) {
    // Choose a random gene to mutate
    let mutationPoint = Math.floor(Math.random() * individual.length);
     // Create a new individual with the mutated gene (flip 0 to 1 or 1 to 0)
    return [
      ...individual.slice(0, mutationPoint),
      1 - individual[mutationPoint],  // Flip 0 to 1 or 1 to 0
      ...individual.slice(mutationPoint+1)
    ];
  }
  
  // Implement the genetic algorithm
  let bestIndividual = { cost: 0, weight: 0 };
  for (let generation = 0; generation < generations; generation++) {
    population = selection(population);
    let newPopulation = [];
    while (newPopulation.length < populationSize) {
      let parent1 = population[Math.floor(Math.random() * populationSize)];
      let parent2 = population[Math.floor(Math.random() * populationSize)];
      let offspring = crossover(parent1, parent2);
      if (Math.random() < 0.1) {  // 10% chance of mutation
        offspring = mutation(offspring);
      }
      newPopulation.push(offspring);
    }
    population = newPopulation;
    
    // Update the best individual found so far
    let currentBest = population.reduce((a, b) => fitness(a).cost > fitness(b).cost ? a : b);
    if (fitness(currentBest).cost > bestIndividual.cost) {
      bestIndividual = fitness(currentBest);
    }
  }
  
  // Print the results
  console.log("Best individual:", bestIndividual);
  