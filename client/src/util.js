export const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-primary';
      case 'Rejected':
        return 'bg-danger';
      case 'Interviewing':
        return 'bg-warning';
      case 'Offer Received':
        return 'bg-success'; 
      case 'Accepted':
        return 'bg-info';
      default:
        return 'bg-primary';
    }
};