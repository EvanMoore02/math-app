const target = 12;
const ops = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b !== 0 ? a / b : null
};

// Sanitize inputs: Allow only digits 1-9
function sanitizeInput(e) {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (allowedKeys.includes(e.key)) return;
  if (!/[1-9]/.test(e.key)) {
    e.preventDefault();
  }
}

// Block pasting invalid content
function handlePaste(e) {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[1-9]$/.test(paste)) {
    e.preventDefault();
  }
}

function evaluate(a, op, b) {
  return ops[op](a, b);
}

function checkSolution() {
  const cell1 = parseInt(document.getElementById("cell1").value);
  const cell3 = parseInt(document.getElementById("cell3").value);
  const cell7 = parseInt(document.getElementById("cell7").value);
  const cell9 = parseInt(document.getElementById("cell9").value);

  if ([cell1, cell3, cell7, cell9].some(isNaN)) {
    document.getElementById("result").textContent = "Please enter all four numbers (1-9).";
    return;
  }

  const eq1 = evaluate(cell1, '+', cell3);
  const eq2 = evaluate(cell1, '*', cell7);
  const eq3 = evaluate(cell1, '+', cell9);
  const eq4 = evaluate(cell3, '+', cell9);
  const eq5 = evaluate(cell7, '*', cell9);

  if ([eq1, eq2, eq3, eq4, eq5].every(eq => Math.round(eq * 100) / 100 === target)) {
    document.getElementById("result").textContent = "✅ Correct! All equations equal " + target;
  } else {
    document.getElementById("result").textContent = "❌ Try again. Not all equations match the target.";
  }
}

function closeInstructions() {
  document.getElementById("instructions").hidden = true;
}

document.addEventListener("DOMContentLoaded", function () {
  ['cell1', 'cell3', 'cell7', 'cell9'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('keypress', sanitizeInput);
    el.addEventListener('paste', handlePaste);
  });

  document.getElementById("how-to-button").addEventListener("click", () => {
    document.getElementById("instructions").hidden = false;
  });
});
