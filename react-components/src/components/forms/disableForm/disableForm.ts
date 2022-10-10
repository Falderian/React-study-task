export const disableForm = (condition: boolean) => {
  const inputs = document.getElementsByTagName('input');
  const select = document.querySelector('select') as HTMLSelectElement;
  select.disabled = condition;
  for (const item of inputs) {
    item.disabled = condition;
  }
};
