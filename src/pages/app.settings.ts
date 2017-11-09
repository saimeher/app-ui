export class AppSettings {



  // public static uploadUrl = 'http://210.16.79.137/issues/server/upload/upload';
  // public static imageUrl = 'http://210.16.79.137/issues/server/uploads/';
  // public static newIssueApi = 'http://210.16.79.137/issues/server/api/insert_data';
  // public static issuesListApi = 'http://210.16.79.137/issues/server/api/issues_list';
  // public static getIssueApi = 'http://210.16.79.137/issues/server/api/get_issue';
  // public static registerApi = 'http://210.16.79.137/issues/server/api/register';
  // public static loginApi = 'http://210.16.79.137/raghuerp/server/api/validLogin';
  // public static deleteApi = 'http://210.16.79.137/issues/server/api/delete_issue';
  // public static forgetPasswordApi = 'http://210.16.79.137/issues/server/api/forget_password';
  // public static loginApi = 'http://localhost/issueregister-server/api/login';




  // public static loginApi = 'http://localhost/issueregister-server/api/login';
  // public static issuesListApi = 'http://localhost/issueregister-server/api/issues_list';
  Url: string = 'http://192.168.0.109/issue_register/api/';

  public static uploadUrl = 'http://192.168.0.109/issue_register/upload/upload';
  //  public static uploadUrl = 'http://localhost/issue_register/api/insert_docs';
  public static imageUrl = 'http://localhost/issueregister-server/uploads/';
  // public static imageUrl = 'http://localhost/issue_register/uploads';
  // public static newIssueApi = 'http://localhost/issueregister-server/api/insert_data';
  // public static issuesListApi = 'http://localhost/issueregister-server/api/issues_list';
  // public static getIssueApi = 'http://localhost/issueregister-server/api/get_issue';
  public static registerApi = 'http://localhost/issueregister-server/api/register';

  // public static deleteApi = 'http://localhost/issueregister-server/api/delete_issue';
  public static forgetPasswordApi = 'http://localhost/issueregister-srver/api/forget_password';

  // new apis
  public static loginApi: string = 'http://210.16.79.137/raghuerp/server/api/validLogin';
  public static newIssueApi: string = 'http://192.168.0.109/issue_register/api/insert_data';
  public static getIssueApi = 'http://192.168.0.109/issue_register/api/get_issue';
  public static GETROLE_API = 'http://192.168.0.109/issue_register/api/getRole';
  public static issuesListApi = 'http://192.168.0.109/issue_register/api/issues_list';
  public static getissuesforuser = 'http://192.168.0.109/issue_register/api/getissuesforuser';
  public static deleteApi = 'http://192.168.0.109/issue_register/api/DELETEISSUE';
  public static Toresolutionprogress ='http://192.168.0.109/issue_register/api/Toresolutionprogress';

  public static  getStaffData: string = 'http://210.16.79.137/raghuerp/server/api/getStaffData';
  public static INSERTISSUE ='http://192.168.0.109/issue_register/api/INSERTISSUE';
  public static modifyIssue ='http://192.168.0.109/issue_register/api/modifyIssue';
  public static UPDATEISSUE = 'http://192.168.0.109/issue_register/api/UPDATEISSUE';
  public static  resolutioninprogress = 'http://192.168.0.109/issue_register/api/RESOLUTIONINPROGRESS';

  public static getdetails = 'http://192.168.0.109/issue_register/api/GETDETAILS';
  public static getImagesbyId = 'http://192.168.0.109/issue_register/api/getImagesbyId';
  public static deleteimage ='http://192.168.0.109/issue_register/api/deleteimages';
  



  public static domains =
  [
    { title: 'Electrical', info: 'Electrical (Fans / Lights / Power Supply / Motors / Line)', value: 'electrical' },
    { title: 'Civil', info: 'Civil (Building / Walls / Roof / Leakages / Flooring…)', value: 'civil' },
    { title: 'Water Supply', info: 'Water Supply (Drinking Water - Non-availability / Unclean / Leakages / Broken Taps / Broken Pipes...)', value: 'water_supply' },
    { title: 'Sanitation', info: 'Sanitation (Normal Water - Non-availability / Leakages / Broken Taps / Broken Pipes / Smell / Breakage of Washroom Equipment / Doors…)', value: 'sanitation' },
    { title: 'Carpentary', info: 'Carpentry (Tables / Benches / Doors……)', value: 'carpentary' },
    { title: 'AC', info: 'AC (Wherever Available - Leakages / Not working / Tripping / No effect)', value: 'ac' },
    { title: 'Transportation', info: 'Transportation (Bus / Route / Accident….)', value: 'transportation' },
    { title: 'Infrastructure', info: 'Infrastructure (General Infrastructure - Phone, Internet / Intranet …)', value: 'infrastructure' },
    { title: 'House keeping', info: 'House keeping (Cleaning, Security)', value: 'house_keeping' },
    { title: 'Gardening', info: 'Gardening, Cattle Maintenance', value: 'gardening' },
    { title: 'Miscellaneous', info: 'Miscellaneous (any others such as Postal Delivery …that are not covered above)', value: 'misc' }
  ];

  public static status =
  [
    { title: 'Pending', value: 'pending' },
    { title: 'Assigned', value: 'assigned' },
    { title: 'Resolution in Progress ', value: 'resolution_in_progress' },
    { title: 'On Hold', value: 'onhold' },
    { title: 'Verified & Resolved', value: 'verified_resolved' },
    { title: 'Cannot be resolved / repaired', value: 'cannot_be_resolved' },
    { title: 'User Deleted', value: 'user_deleted' },
    { title: 'Closed', value: 'closed' },


  ];




///queries for server 210.16.79.137/

  // public static loginApi: string = 'http://210.16.79.137/raghuerp/server/api/validLogin';
  // public static newIssueApi: string = 'http://210.16.79.137/raghuerp/issueregister/server/api/insert_data';
  // public static getIssueApi = 'http://210.16.79.137/raghuerp/issueregister/server/api/get_issue';
  // public static GETROLE_API = 'http://210.16.79.137/raghuerp/issueregister/server/api/getRole';
  // public static issuesListApi = 'http://210.16.79.137/raghuerp/issueregister/server/api/issues_list';
  // public static getissuesforuser = 'http://210.16.79.137/raghuerp/issueregister/server/api/getissuesforuser';
  // public static deleteApi = 'http://210.16.79.137/raghuerp/issueregister/server/api/DELETEISSUE';
  // public static Toresolutionprogress ='http://210.16.79.137/raghuerp/issueregister/server/api/Toresolutionprogress';

  // public static  getStaffData: string = 'http://210.16.79.137/raghuerp/server/api/getStaffData';
  // public static INSERTISSUE ='http://210.16.79.137/raghuerp/issueregister/server/api/INSERTISSUE';
  // public static modifyIssue ='http://210.16.79.137/raghuerp/issueregister/server/api/modifyIssue';
  // public static UPDATEISSUE = 'http://210.16.79.137/raghuerp/issueregister/server/api/UPDATEISSUE';
  // public static  resolutioninprogress = 'http://210.16.79.137/raghuerp/issueregister/server/api/RESOLUTIONINPROGRESS';

  // public static getdetails = 'http://210.16.79.137/raghuerp/issueregister/server/api/GETDETAILS';
  // public static getImagesbyId = 'http://210.16.79.137/raghuerp/issueregister/server/api/getImagesbyId';
  // public static deleteimage ='http://210.16.79.137/raghuerp/issueregister/server/api/deleteimages';
  // public static uploadUrl = 'http://210.16.79.137/raghuerp/issueregister/server/upload/upload';
} 