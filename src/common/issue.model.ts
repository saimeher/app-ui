export interface Issue {
    did?: number;
    domain: string;
    issue_desc: string;
    location: string;
    problem: string;
    raised_by: string;
    mobile: string;
    status?: string;
    priority?: string;
    repaired_on?: string;
    repaired_by?: string;
    date_of_resolution?: string;
    notes?: string;
    role: string;
    image?: string;
    deletedImages?: string;
    // raised_by_phonenumber?: string;
    // raised_by_deviceid?: string;
}