/* Fórmula do Valor Futuro: F = P.(1+i)n + M.[(1+i)n - 1]/i
     F = valor futuro (também chamado VF ou FV)
     P = valor presente (também chamado VA ou PV)
     M = mensalidade (ou outro pagamento periódico, também chamado PGTO ou PMT)
     n = número de períodos (em dias, meses, anos, ..., também chamado NPER)
     i = taxa de juros (normalmente na forma percentual, também chamado TAXA ou RATE) */
export const calculateCompoundInterest = (
  initialDeposit,
  monthlyDeposit,
  months,
  interestRate,
  isYearly
) => {
  const P = initialDeposit;
  const M = monthlyDeposit;
  const n = months;
  let i = interestRate / 100;

  if (isYearly) {
    i = Math.pow(1 + i, 1 / 12) - 1;
  }

  return P * Math.pow(1 + i, n) + (M * (Math.pow(1 + i, n) - 1)) / i;
};
