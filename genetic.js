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
  const populationSize = 20;
  const generations = 100;

function generateChromosome(length) {
  let chromosome = [];
  for (let i = 0; i < length; i++) {
    chromosome.push(Math.round(Math.random()));
  }
  return chromosome;
}
let population = [];
for (let i = 0; i < populationSize; i++) {
  population.push(generateChromosome(items.length));
}
function calculateFitness(chromosome) {
  let totalCost = 0;
  let totalWeight = 0;
  for (let i = 0; i < chromosome.length; i++) {
    if (chromosome[i] === 1) {
      totalCost += items[i].cost;
      totalWeight += items[i].weight;
    }
  }
  if (totalWeight > maxWeight) {
    totalCost = 0;
  }
  return totalCost;
}

function chromosomeToBinaryString(chromosome) {
  return chromosome.join("");
}

console.log("Initial Population:");
for (let i = 0; i < population.length; i++) {
  let phenotype = [];
  for (let j = 0; j < population[i].length; j++) {
    if (population[i][j] === 1) {
      phenotype.push(items[j]);
    }
  }
  console.log(
    `Chromosome ${i}: ${chromosomeToBinaryString(population[i])} ${JSON.stringify(
      phenotype
    )} Fitness: ${calculateFitness(population[i])}`
  );
}
function rouletteWheelSelection(population) {
  let totalFitness = 0;
  for (let i = 0; i < population.length; i++) {
    totalFitness += calculateFitness(population[i]);
  }
  let selectedChromosomes = [];
  for (let i = 0; i < populationSize; i++) {
    let randomValue = Math.random() * totalFitness;
    let sum = 0;
    for (let j = 0; j < population.length; j++) {
      sum += calculateFitness(population[j]);
      if (sum > randomValue) {
        selectedChromosomes.push(population[j]);
        break;
      }
    }
  }
  return selectedChromosomes;
}
let selectedChromosomes = rouletteWheelSelection(population);
console.log("Selected Chromosomes:");
for (let i = 0; i < selectedChromosomes.length; i++) {
  let phenotype = [];
  for (let j = 0; j < selectedChromosomes[i].length; j++) {
    if (selectedChromosomes[i][j] === 1) {
      phenotype.push(items[j]);
    }
  }
  let clippingPercentage = Math.round((1 - calculateFitness(selectedChromosomes[i]) / calculateFitness(population[i])) * 100);
  console.log(`Chromosome ${i}: ${chromosomeToBinaryString(population[i])} ${JSON.stringify(
      phenotype
    )} Clipping: ${clippingPercentage}%`);
}
function crossover(chromosome1, chromosome2) {
  let crossoverPoint = Math.floor(Math.random() * chromosome1.length);
  let newChromosome1 = chromosome1.slice(0, crossoverPoint).concat(chromosome2.slice(crossoverPoint));
  let newChromosome2 = chromosome2.slice(0, crossoverPoint).concat(chromosome1.slice(crossoverPoint));
    console.log(newChromosome1, 'chr1', newChromosome2, 'chr2')
  return [newChromosome1, newChromosome2];
}
function mutate(chromosome) {
  let mutationPoint = Math.floor(Math.random() * chromosome.length);
  let newChromosome = chromosome.slice();
  newChromosome[mutationPoint] = 1 - newChromosome[mutationPoint];
  return newChromosome;
}

let newPopulation = selectedChromosomes.slice();
while (newPopulation.length < populationSize) {
  let parent1 = selectedChromosomes[Math.floor(Math.random() * selectedChromosomes.length)];
  let parent2 = selectedChromosomes[Math.floor(Math.random() * selectedChromosomes.length)];
  let offspring = crossover(parent1, parent2);
  console.log(`Offspring 1 before mutation: ${offspring[0].toString(2)}`);
  console.log(`Offspring 2 before mutation: ${offspring[1].toString(2)}`);
  offspring[0] = mutate(offspring[0]);
  offspring[1] = mutate(offspring[1]);
  console.log(`Offspring 1 after mutation: ${offspring[0].toString(2)}`);
  console.log(`Offspring 2 after mutation: ${offspring[1].toString(2)}`);
  newPopulation.push(offspring[0]);
  if (newPopulation.length < populationSize) {
    newPopulation.push(offspring[1]);
  }
}
// Calculate fitness for new population
console.log("Fitness for new population:");
for (let i = 0; i < newPopulation.length; i++) {
  console.log(`Chromosome ${i}: ${newPopulation[i].toString(2)} Fitness: ${calculateFitness(newPopulation[i])}`);
}
