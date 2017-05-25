export class AppSettings {

  public static uploadUrl = 'http://210.16.79.137/issues/server/upload/upload';
  public static imageUrl = 'http://210.16.79.137/issues/server/uploads/';
  public static newIssueApi = 'http://210.16.79.137/issues/server/api/insert_data';
  public static issuesListApi = 'http://210.16.79.137/issues/server/api/issues_list';
  public static getIssueApi = 'http://210.16.79.137/issues/server/api/get_issue';
  public static registerApi = 'http://210.16.79.137/issues/server/api/register';
  public static loginApi = 'http://210.16.79.137/issues/server/api/login';
  public static deleteApi = 'http://210.16.79.137/issues/server/api/delete_issue';
  public static forgetPasswordApi = 'http://210.16.79.137/issues/server/api/forget_password';

  /*
    public static uploadUrl = 'http://localhost/issue_register/server/upload/upload';
    public static imageUrl = 'http://localhost/issue_register/server/uploads/';
    public static newIssueApi = 'http://localhost/issue_register/server/api/insert_data';
    public static issuesListApi = 'http://localhost/issue_register/server/api/issues_list';
    public static getIssueApi = 'http://localhost/issue_register/server/api/get_issue';
    public static registerApi = 'http://localhost/issue_register/server/api/register';
    public static loginApi = 'http://localhost/issue_register/server/api/login';
    public static deleteApi = 'http://localhost/issue_register/server/api/delete_issue';
    public static forgetPasswordApi = 'http://localhost/issue_register/server/api/forget_password';
  */

  public static domains = [
    { title: 'Electrical', info: 'Electrical (Fans / Lights / Power Supply / Motors / Line)', value: 'electrical' },
    { title: 'Civil', info: 'Civil (Building / Walls / Roof / Leakages / Flooring…)', value: 'civil' },
    { title: 'Water Supply', info: 'Water Supply (Drinking Water - Non-availability / Unclean / Leakages / Broken Taps / Broken Pipes...)', value: 'water_supply' },
    { title: 'Sanitation', info: 'Sanitation (Normal Water - Non-availability / Leakages / Broken Taps / Broken Pipes / Smell / Breakage of Washroom Equipment / Doors…)', value: 'sanitation' },
    { title: 'Carpentary', info: 'Carpentry (Tables / Benches / Doors…)', value: 'carpentary' },
    { title: 'AC', info: 'AC (Wherever Available - Leakages / Not working / Tripping / No effect)', value: 'ac' },
    { title: 'Transportation', info: 'Transportation (Bus / Route / Accident….)', value: 'transportation' },
    { title: 'Infrastructure', info: 'Infrastructure (General Infrastructure - Phone, Internet / Intranet …)', value: 'infrastructure' },
    { title: 'House keeping', info: 'House keeping (Cleaning, Security)', value: 'house_keeping' },
    { title: 'Gardening', info: 'Gardening, Cattle Maintenance', value: 'gardening' },
    { title: 'Miscellaneous', info: 'Miscellaneous (any others such as Postal Delivery …that are not covered above)', value: 'misc' }
  ];

  public static status = [
    { title: 'Pending', value: 'pending' },
    { title: 'Assigned', value: 'assigned' },
    { title: 'Resolution in Progress ', value: 'resolution_in_progress' },
    { title: 'On Hold', value: 'on_hold' },
    { title: 'Verified & Resolved', value: 'verified_resolved' },
    { title: 'Cannot be resolved / repaired', value: 'cannot_be_resolved' },
    { title: 'User Resolved', value: 'user_resolved' },
    { title: 'User Deleted', value: 'user_deleted' },


  ];
} 