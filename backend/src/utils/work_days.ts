// function to get an array of work days between two dates
export function getDatesBetween(startDate: Date, endDate: Date): Date[] {
    let dates: Date[] = [];
    let currentDate: Date = new Date(startDate);
    let finalDate: Date = new Date(endDate);
    while (currentDate <= finalDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }