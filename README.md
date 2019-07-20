# briansBrain

### About
- This is a simulator build to demonstrate the cellular automaton known as "Brian&apos;s Brain". A cellular automaton can be thought of as a simple form of artificial life, in that a new generation of cells is generated or evolved from the states of previous cells.

- This action is accomplished by checking the state of each previous cell. These states are made up of three forms: "on", "dying", and "off". These are indicated by the colors black, grey, and white respectively. As with most cellular automaton these previous cell states are then checked against a set of rules to determine the next generation&apos;s cell state. In this particular automaton there are three rules that are followed.
1. If the previous state of the cell was on (this is indicated by black cells), the cell is switched to dying (this is indicated by grey cells).
2. If the previous state of the cell was dying, the cell is switched to off (this is indicated by a white cell).
3. If the previous state of the cell was off and exactly two of its neighboring cells[1] are on, the cell is switched on.
- With these three rules in place the program starts with a grid of randomly assigned states, and then when the start button is clicked new generations are formed based on the rules listed above. The program can be paused or reset at any time using the applicable buttons. The simulation will run until all the cells in the grid are off. It will then reset the board and run the simulation again with a new randomly generated starting grid. 
- This particular cellular automaton has a tendency to create unique diagonal shapes, some of which will try to replicate all or part of themselves. Some of these replications are identical to each other and are known mathematically as "spaceships". The Brian&apos;s Brain automaton was named after its creator Brian Silverman who created it in the mid 1990&apos;s.

- [1]: A cell has eight neighboring cells. The best way to imagine these cells is to picture a 3x3 square block of cells with the center cell being the cell in question, the remaining eight cells surrounding this center cell are this cells neighboring cells.

### Examples
- Below is an example of some of the unique patterns and constructions that can appear after the automaton is run.

![picture of Brian's Brain](https://github.com/bnray53/briansBrain/blob/master/pictureOfBrainV2.PNG)

### Live Demo
[Brian&apos;s Brain](https://bnray53.github.io/briansBrain "Brian's Brain")