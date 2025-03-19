export const formatDate = (dateString:Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'});
}