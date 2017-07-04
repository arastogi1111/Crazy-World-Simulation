# -Crazy-World-Simulation
An Evolutionary system with lots of features, some very eccentric.
(using Genetic Algorithm, created in p5.js )

Instructions : Download archive, unpack and open RUN.html. 


Features :
1.	Fishes continuously evolve through time, through survival of the fittest.
2.	They age with time. Their age affects their abilities to reproduce/ fight and probability of death.
3.	They have different perception radii and affinities for food and poison.
They try to find the closest food within their vision and flee from the sight of poison.
4.	Their health goes down with age constantly, but can be reversed with eating food/ worsened by eating poison.
5.	Health is indicated by colour which is mapped between blue and red. If health goes below zero, they are eliminated from the population.
6.	There is Black-Magic in their luck which makes them love poison and  creates an aversion for food. When they are under this influence, their colour is black.
7.	If their age permits and they are in good health, they’ll clone themselves with some mutation (Asexual reproduction).
8.	When there are a lot of fish at one place, they’ll fight each other, resulting in elimination of most individuals in a group but one.
9.	They might even decide to reproduce sexually, transferring their DNA to their child, along with mutations.
10.	Their maximum speed and forces, their affinity or aversion multiplicity, their perceptions, and their luck (black magic) – is all carried in different genes in their DNA.
11.	They carry their dynasty name (id) and their generation number. Upon death, all their information is printed.
12.	Checkbox switches perception visualizer.
13.	Graph Visualizer for population size, max health in population etc.






The Vehicle Object :


DNA with 6 GENES:

    •	Food affinity multiplier
    •	Poison aversion multiplier
    •	Maximum speed
    •	Maximum steering forces 
    •	Black-magic probability (this prob applies every frame)
    •	Perception radius for food
    •	Perception radius for poison


update():

    Simple physics engine, checks whether it touched any food or poison.
    Pushes new food/ poison when eaten with 99% probability.
    Age is advanced and health is decreased every moment.

show():

    draws the vehicle (fish), color scheme is decided and perception radii are drawn if checkbox is clicked.

eat():

    Finds closest food/poison from the list passed and calls seek on it if it is within perception. If food is finished, sweeps off the fish.

seek():

    Returns steering force according to current position and heading. Limits the desired velocity and force according to DNA.


behaviours():

    Calls eat() on both food, poison, retrieves forces and multiplies them with multipliers from DNA. Applies these forces.

clone():

    According to age, it maps probability of cloning. If healthy, pushes new vehicle with its dna, family name, generation, position, and whether it is under black magic.

interact():

    If any other vehicle is found near, it fights and dies , but it may even decide to call crossover with it.

crossover():

    Mixes DNA of both parents with some mutation and pushes new vehicle with multiplied family id.

blackMagic():

    Reverses multiplicities of the affinity/aversion according to the probability carried in DNA and changes state of influence.

boundaries():

  	Steers vehicles towards center if they reach boundaries.


Analysis that can be drawn from results:

    •	Fishes with high perception, high speed and high steering forces tend to survive through thick and thin.
    •	They shouldn’t be coward (high poison multiplier), or else they can’t approach food owing to presence of poison far away. These coward species will also have the highest affinity to poison when under black magic. 
    •	If they have high speeds, they might also end up getting most poisons very quickly.
    •	When bad luck is bestowed upon them, fishes with highest affinity towards food and low poison multiplicity are averted to the whole scene (reversal of multiplicities) and hence they stay safe.
    •	Fishes with less bad luck in dna tend to survive as they had more opportunity to attend to food without influence from magic.
    •	Confused species (with high forces and high multiplicities) also tend to die off. But if luck is on their side, they’ll survive through.
    •	Amount of food is an extreme controlling factor of population.
    •	If there was less fighting and killing, there’ll be extreme overpopulation and nobody gets ample food.
    •	If one fish survives through, it’ll repopulate the whole place eventually.


