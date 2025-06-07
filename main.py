import operator

# Operator functions
ops = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv
}

# Define the fixed grid
grid = {
    1: 3,
    2: '+',
    3: 9,
    4: '*',
    5: '-',
    6: '+',
    7: 1,
    8: '*',
    9: 0
}

# Target value to achieve for all equations
target = 12

def evaluate(a, op, b):
    try:
        result = ops[op](a, b)
        print(f"{a} {op} {b} = {result}")
        return result
    except ZeroDivisionError:
        print(f"{a} {op} {b} = Error (division by zero)")
        return None

# Evaluate the 5 equations
eq1 = evaluate(grid[1], grid[2], grid[3])   # top row: 1 op2 3
eq2 = evaluate(grid[1], grid[4], grid[7])   # left col: 1 op4 7
eq3 = evaluate(grid[1], grid[5], grid[9])   # diag: 1 op5 9
eq4 = evaluate(grid[3], grid[6], grid[9])   # right col: 3 op6 9
eq5 = evaluate(grid[7], grid[8], grid[9])   # bottom row: 7 op8 9

# Check if all are equal to target
if all(round(eq, 2) == target for eq in [eq1, eq2, eq3, eq4, eq5]):
    print("\n Puzzle is valid! All expressions equal target =", target)
else:
    print("\n Puzzle is invalid. Not all expressions match the target.")
