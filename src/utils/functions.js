export const getTodaysDate = () => {
    const d = new Date()
    return `${d.getDate()}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
}

export const handleDate = (e) => {
    const d = new Date(e);
    return `${d.getDate()}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()}`;
  };