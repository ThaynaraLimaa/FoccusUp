// Return greatings based on the time of the day 
export function timeBasedGreeting(): string {
    const now = new Date().getHours(); 
    if(now >= 6 && now < 12) {
        return 'Good Morning'
    } 

    if(now >= 12 && now < 18 ) {
        return 'Good Afternoon'
    }

    return 'Good Evening'
}