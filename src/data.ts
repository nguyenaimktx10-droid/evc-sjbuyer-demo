import { VslChapter, VslSlide, LeadSubmission } from './types';

export const VSL_CHAPTERS: VslChapter[] = [
  { id: 'reason_1', title: 'Case Study 1: 24 Năm Thuê Nhà và Cú Chốt "Price Cut"', timeStart: 0, duration: 90 },
  { id: 'reason_2', title: 'Case Study 2: Mua Căn Nhà Đầu Tiên Thầm Lặng Từ Xa', timeStart: 90, duration: 90 },
  { id: 'reason_3', title: 'Case Study 3: Sở Hữu 2 Căn Nhà >$2M Sau 3 Năm', timeStart: 180, duration: 90 },
];

export const VSL_SLIDES: VslSlide[] = [
  {
    id: 'reason_1',
    timeStart: 0,
    title: 'Case Study 1: 24 Năm Thuê Nhà → Chốt liền Good Deal nhờ “Price Cut”',
    contentLines: [
      'Thuê nhà ở San Jose suốt 24 năm cùng dòng tiền thuê tích lũy $3,000/tháng',
      'Lãng phí hơn $800k trôi thẳng vào túi người khác mà không có một mét vuông đất',
      'Đại diện duyệt Pre-approval ngân sách $1M vô cùng khiêm tốn tại San Jose',
      'Săn lùng deal "Price Cut" giảm từ $1.1M xuống $1M tích hợp sẵn Tesla Solar $40k paid-off'
    ],
    subtitleVietnamese: 'Anh chị thuê nhà ở San Jose suốt 24 năm. Tiền thuê mỗi tháng khoảng $3,000, rẻ hơn nhiều so với mua nhà — đó là lập luận họ thuyết phục bản thân và nó rất hợp lý, nhưng ở bề mặt thôi. Nhưng rồi đến một ngày chủ nhà không còn dễ ưa nữa. Họ dọn nhà rồi lại dọn nhà lần thứ tư. Stress bắt đầu ngấm và khi đó họ gặp Evan để dứt điểm 24 năm đi thuê!',
    graphicType: 'stats',
    graphicData: {
      metrics: [
        { label: 'Chi phí thuê 24 năm', value: 'Hơn $800K lãng phí', status: 'down' },
        { label: 'Giá chốt (Price Cut)', value: '$1.0 triệu (hời $100k)', status: 'up' },
        { label: 'Tesla Solar Tặng', value: 'Paid off $40,000', status: 'up' }
      ]
    }
  },
  {
    id: 'reason_2',
    timeStart: 90,
    title: 'Case Study 2: Mua Căn Nhà Đầu Tiên — Chưa Từng Bước Vào Trong',
    contentLines: [
      'Gia đình trẻ 4 người ở Richmond với ước mơ xây dựng tổ ấm có sân vườn cho 2 con',
      'Richmond xa trung tâm, Evan thiết lập quy trình làm việc chuẩn mực, tinh nhuệ từ xa',
      'Khách thoải mái tự đi xem Open House, Evan lo liệu toàn bộ hồ sơ, disclosures & loan',
      'Quy trình chốt hợp đồng nhanh gọn, tin tưởng tuyệt đối vào năng lực thẩm định của Evan'
    ],
    subtitleVietnamese: 'Nhiều người nghĩ mua nhà ở đâu thì phải tìm Agent ở đó để xem nhà. Nhưng tại thị trường khốc liệt như Bay Area, việc đi xem nhà chỉ chiếm 20% kết quả, 80% còn lại nằm ở năng lực đọc disclosures, thẩm định rủi ro, làm loan và chiến lược đàm phán. Gia đình trẻ tại Richmond đã tin tưởng trao trọn cho Evan chốt deal rực rỡ mà chưa từng bước vào trong!',
    graphicType: 'checklist',
    graphicData: {
      items: [
        { label: 'Richmond: Ước mơ nhà sân rộng cho 2 con nhỏ', done: true },
        { label: 'Evan lo 100% disclosures, inspections & loan', done: true },
        { label: 'Thẩm nghiệm kết cấu móng & chống rung lắc', done: true },
        { label: 'Ký kết hợp đồng an tâm từ xa không tốn giờ đi lại', done: true }
      ]
    }
  },
  {
    id: 'reason_3',
    timeStart: 180,
    title: 'Case Study 3: Cô Y Tá — 2 Căn Nhà Hơn $2M Trong 3 Năm',
    contentLines: [
      'Khách hàng là Y Tá khoa ung thư thu nhập cao đồng hành cùng mức áp lực, stress cực lớn',
      'Nỗ lực học tập thiết kế kế hoạch dòng tiền, tận dụng đồng lương bền bỉ để kiến tạo tài sản',
      'Ứng dụng hoàn hảo phương án "House Hack" cho thuê phòng tối giản hóa tiền trả góp hàng tháng',
      'Tối ưu hóa hồ sơ thuế & thu nhập tài chính, chốt tiếp nhà thứ 2 chỉ sau 3 năm ngắn ngủi'
    ],
    subtitleVietnamese: 'Công việc lương cao — dù là y tá, kỹ sư, dược sĩ, hay bất kỳ ngành nghề nào thì đều có áp lực vì tiền không dễ kiếm. Nhưng khi bạn biết cách tận dụng hồ sơ thuế và income để unlock mortgage — bạn đang chơi một bản đồ hoàn toàn khác. Nhờ chiến thuật House Hack sòng phẳng và tối ưu thuế của Evan, bạn ấy đang lên kế hoạch cho căn thứ ba!',
    graphicType: 'avatar',
    graphicData: {
      name: 'Y Tá Khoa Ung Thư (Silicon Valley)',
      role: 'Tận dụng đồng lương cao để tích sản bất động sản Bay Area',
      stats: 'Tích lũy 2 căn bđs >$2.0M dồi dào nhờ House Hack',
      quote: 'Từ áp lực trực đêm mệt mỏi, việc tối ưu mortgage và house hack giúp tôi giảm gánh nặng thanh toán hàng tháng rõ rệt, an tâm tiến bước tự do tài chính rộng mở.'
    }
  }
];

export const INITIAL_LEADS: LeadSubmission[] = [
  {
    id: 'lead_1',
    fullName: 'Lê Hoàng Nam',
    email: 'nam.le@silicontech.io',
    phone: '408-555-0192',
    targetLocation: 'Berryessa, 95132',
    preApproved: 'yes',
    downPayment: 'above_400',
    timestamp: '2026-05-20T14:22:00Z',
    status: 'vip',
    notes: 'Kỹ sư phần mềm Principal tại Google. Đã có Pre-approval từ Chase $1.8M. Cần tìm khu vực Berryessa.'
  },
  {
    id: 'lead_2',
    fullName: 'Nguyễn Thị Minh An',
    email: 'minhan.realestate@gmail.com',
    phone: '669-223-4903',
    targetLocation: 'Almaden Valley, 95120',
    preApproved: 'no_credit_ok',
    downPayment: '200_400',
    timestamp: '2026-05-21T02:05:00Z',
    status: 'qualified',
    notes: 'Muốn định cư gấp cho con học trung học Almaden Valley. Điểm credit 760, thu nhập vợ chồng $450k/năm.'
  },
  {
    id: 'lead_3',
    fullName: 'Trần Minh Đức',
    email: 'ductran_dentist@yahoo.com',
    phone: '408-883-9912',
    targetLocation: 'Evergreen, 95135',
    preApproved: 'dont_know',
    downPayment: 'under_200',
    timestamp: '2026-05-18T09:12:00Z',
    status: 'pending',
    notes: 'Nha sĩ phòng khám tại San Jose. Muốn tìm hiểu về Pre-approval.'
  }
];
