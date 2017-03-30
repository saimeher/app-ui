export class AppSettings {
    public static uploadUrl = 'http://192.168.0.105:81/upload/upload';
    public static imageUrl = 'http://192.168.0.105:81/uploads/';

    public static newIssueApi = 'http://192.168.0.105:81/api/insert_data';
    public static issuesListApi = 'http://192.168.0.105:81/api/issues_list';
    public static getIssueApi = 'http://192.168.0.105:81/api/get_issue';

    public static registerApi = 'http://192.168.0.105:81/api/register';
    public static loginApi = 'http://192.168.0.105:81/api/login';
    public static deleteApi = 'http://192.168.0.105:81/api/delete_issue';

     public static domains = [
      { title: 'Electrical', value: 'electrical' },
      { title: 'Civil', value: 'civil' },
      { title: 'Water Supply ', value: 'water_supply' },
      { title: 'Sanitation', value: 'sanitation' },
      { title: 'Carpentary', value: 'carpentary' },
      { title: 'AC', value: 'ac' },
      { title: 'Transportation', value: 'transportation' },
      { title: 'Infrastructure', value: 'infrastructure' },
      { title: 'House keeping (Cleaning, Gardening, Cattle Maintenance, Security)', value: 'house_keeping' },
      { title: 'Miscellaneous', value: 'misc' }
    ];

     public static status = [
      { title: 'Pending', value: 'pending' },
      { title: 'Assigned', value: 'assigned' },
      { title: 'Resolution in Progress ', value: 'resolution_in_progress' },
      { title: 'On Hold', value: 'on_hold' },
      { title: 'Verified & Resolved', value: 'verified_resolved' },
      { title: 'Cannot be resolved / repaired', value: 'cannot_be_resolved' },
    ];    
} 