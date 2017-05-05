import LeadStatus from 'app/leads/status/leadStatus';

export default class LeadStatusPendingChange {
    constructor(
        public waiting,
        public newStatus?: LeadStatus,
        public oldStatus?: LeadStatus
    ) {}
}