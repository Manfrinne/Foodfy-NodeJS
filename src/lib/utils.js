module.exports = {

date(timestamp) {

  const date = new Date(timestamp)

  const year = date.getUTCFullYear()

  // '+ 1' porque o 'getUTCMonth()' retorna um valor de 0 a 11
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)

  const day = `0${date.getUTCDate()}`.slice(-2)

  // return yyyy-mm-dd
  return {
      day,
      month,
      year,
      iso:`${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  }
}
