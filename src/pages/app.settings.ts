export class AppSettings {


  public static uploadUrl = 'http://raghuenggcollege.com/issues/server/upload/upload';
  public static imageUrl = 'http://raghuenggcollege.com/issues/server/uploads/';

  public static newIssueApi = 'http://raghuenggcollege.com/issues/server/api/insert_data';
  public static issuesListApi = 'http://raghuenggcollege.com/issues/server/api/issues_list';
  public static getIssueApi = 'http://raghuenggcollege.com/issues/server/api/get_issue';

  public static registerApi = 'http://raghuenggcollege.com/issues/server/api/register';
  public static loginApi = 'http://raghuenggcollege.com/issues/server/api/login';
  public static deleteApi = 'http://raghuenggcollege.com/issues/server/api/delete_issue';
  public static forgetPasswordApi = 'http://raghuenggcollege.com/issues/server/api/forget_password';



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