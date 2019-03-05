// const Widget = require('../models/widget');
const Post = require('../models/post');
const moment = require('moment');


exports.getWidget = (req, res, next) => {
  let testWidget;

  // test - finds all posts and to every date puts the number of posts to this specific date =====================
  // moment().format("MMM Do YY");
  // let postsCount = Post.where({ 'imagePath': 'https://material.angular.io/assets/img/examples/shiba2.jpg' }).countDocuments();
  // console.log('postsCount: ', postsCount);

  // Post.find()
  //   .then(posts => {
  //     // console.log('post: ', post);
  //     if (posts) {
  //       posts.map((post) => {
  //         if(post.createdAt) {

  //         }
  //       });
  //     } else {
        
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       message: "Fetching widget failed!"
  //     });
  //   });

  // const barChartLabels1 = ['2006', '2007'];
  // const barChartData1 = [
  //   {data: [15, 59, 80, 81, 56, 55, 40], label: 'posts'}
  // ];

  // dummy data
  const barChartLabels1 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  const barChartData1 = [
    {data: [15, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [48, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  const lineChartLabels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const lineChartData2 = [
    {data: [95, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  const doughnutChartLabels3 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  const doughnutChartData3 = [350, 450, 100];

  const lineChartLabels4 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const lineChartData4 = [
    {data: [95, 59, 80, 81, 56, 55, 40], label: 'Series C'}
  ];

  if(req.params.id === '1') {
    testWidget = {
      id: '1',
      title: 'testing barchart 1',
      type: 'barchart',
      labels: barChartLabels1,
      data: barChartData1
    };
  } else if (req.params.id === '2') {
    testWidget = {
      id: '2',
      title: 'testing linechart',
      type: 'linechart',
      labels: lineChartLabels2,
      data: lineChartData2
    };
  } else if (req.params.id === '3') {
    testWidget = {
      id: '3',
      title: 'testing doughnutchart 3',
      type: 'doughnutchart',
      labels: doughnutChartLabels3,
      data: doughnutChartData3
    };
  } else if (req.params.id === '4') {
    testWidget = {
      id: '4',
      title: 'testing linechart REAL-TIME 4',
      type: 'linechart',
      labels: lineChartLabels4,
      data: lineChartData4
    };
  }

  res.status(200).json({
    message: "Single Widget fetched successfully!",
    widget: testWidget
  });
};

exports.getWidgets = (req, res, next) => {
  const barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  const barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  fetchedWidgets =[
    {
      title: 'TESTINGG',
      type: 'barchart',
      labels: barChartLabels,
      data: barChartData
    },
    {
      title: 'TESTINGG222',
      type: 'barchart',
      labels: barChartLabels,
      data: barChartData
    },
    {
      title: 'TESTINGG33',
      type: 'barchart',
      labels: barChartLabels,
      data: barChartData
    },
    {
      title: 'TESTINGG44',
      type: 'barchart',
      labels: barChartLabels,
      data: barChartData
    }
  ];
  res.status(200).json({
    message: "Widgets fetched successfully!",
    widgets: fetchedWidgets
  });
};
