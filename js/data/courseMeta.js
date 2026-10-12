window.COURSE_META = {
  title: "IT System & Network Administrator",
  badge: "CHƯƠNG TRÌNH CÁ NHÂN HÓA — 4 TUẦN",
  tagline: "Theory Behind Practice — Từ kinh nghiệm thực chiến đến hiểu nguyên lý hệ thống",
  stats: [
    { value: "4", label: "Tuần học", sub: "6 buổi/tuần + 1 ngày ôn tập" },
    { value: "24", label: "Buổi học", sub: "Từ Network, AD đến Storage & Troubleshoot" },
    { value: "30–36h", label: "Dự kiến", sub: "Mỗi buổi 60–90 phút (chuẩn 75p)" },
    { value: "5/5", label: "Chuẩn đầu ra", sub: "Định nghĩa, Nguyên lý, Lab, Xử lý lỗi, Phỏng vấn" }
  ],
  corePhilosophy: {
    highlight: "Ưu tiên lớn nhất của chúng ta là hiểu QUAN HỆ GIỮA CÁC THÀNH PHẦN.",
    detail: "Ví dụ: Thay vì học riêng lẻ NAT và VLAN, cậu phải giải thích được tại sao một thiết bị ở VLAN 30 cần Routing để truy cập một Subnet khác (như VLAN 10), nhưng KHÔNG nhất thiết phải cần NAT. Bắt đầu từ Bài 01 — vì vấn đề của cậu không nằm ở việc không biết thao tác WinBox/MikroTik, mà là đôi khi chưa phân biệt rõ chức năng của từng thành phần trong đường đi của một gói tin."
  },
  sessionStructure: [
    {
      level: "Cấp 1",
      title: "Định nghĩa & Thuật ngữ",
      minutes: 15,
      color: "blue",
      desc: "Định nghĩa sắc gọn trong 15–30 giây, dùng đúng thuật ngữ kỹ thuật thay vì nói vòng vo kiểu 'cái cục phát', 'chỗ chỉnh mạng'. Phân biệt rõ các cặp khái niệm hay nhầm."
    },
    {
      level: "Cấp 2",
      title: "Nguyên lý hoạt động & Sơ đồ",
      minutes: 15,
      color: "purple",
      desc: "Nhìn xuyên qua giao diện GUI để thấy đường đi của gói tin (Src/Dst IP, MAC, VLAN Tag) và mối quan hệ nhân quả giữa các dịch vụ (DNS -> Kerberos -> AD)."
    },
    {
      level: "Cấp 3",
      title: "Thực hành & Tình huống mô phỏng",
      minutes: 30,
      color: "emerald",
      desc: "Thao tác trên MikroTik CLI/WinBox, Windows Server, CMD/PowerShell và đọc thông số bằng chứng (ipconfig, route print, gpresult, resmon, Event Viewer)."
    },
    {
      level: "Cấp 4",
      title: "Hỏi đáp, Phản biện & Chấm điểm",
      minutes: 15,
      color: "amber",
      desc: "Đối mặt với câu hỏi xoáy của người phỏng vấn ('Tại sao không sửa NAT?', 'Tắt Firewall được không?') và làm bài kiểm tra tình huống."
    }
  ],
  diagnostics: [
    {
      group: "Routing, NAT, Bridge, VLAN",
      status: "Có thực chiến nhưng còn nhầm nguyên lý",
      priority: "P0",
      gapAnalysis: "Biết tạo Bridge, gắn cổng trên WinBox nhưng hay nhầm lẫn khi nào gói tin đi Layer 2 (Switch/VLAN), khi nào đi Layer 3 (Routing) và khi nào mới cần dịch địa chỉ (NAT).",
      relatedLessons: [1, 2, 3, 6, 19]
    },
    {
      group: "DNS, DHCP, Gateway",
      status: "Biết xử lý lỗi, thiếu mô hình tổng thể",
      priority: "P0",
      gapAnalysis: "Gặp máy 169.254.x.x hay mất mạng thì biết đặt IP tĩnh hoặc khởi động lại router, nhưng chưa mô tả mạch lạc được tiến trình DORA và vai trò từng thông số trong luồng gói tin.",
      relatedLessons: [1, 4, 8, 19, 20]
    },
    {
      group: "AD DS, Domain Controller",
      status: "Có kinh nghiệm triển khai, thiếu định nghĩa",
      priority: "P0",
      gapAnalysis: "Từng dựng DC, tạo user và join domain thực tế nhưng khi hỏi định nghĩa AD DS khác gì DC, tại sao DNS phải trỏ về DC (bản ghi SRV) thì lúng túng.",
      relatedLessons: [7, 8, 11, 12, 20]
    },
    {
      group: "GPO, OU, Policy",
      status: "Chưa từng thực hiện",
      priority: "P0",
      gapAnalysis: "Mảng trống lớn nhất trong quản trị Windows Server tập trung. Cần nắm từ gốc: tại sao phải chia OU để gắn GPO, thứ tự LSDOU, Computer vs User Config, gpupdate & gpresult.",
      relatedLessons: [7, 10, 12, 20]
    },
    {
      group: "VPN, Firewall Rules",
      status: "Có định hướng xử lý, chưa rõ routing và rule",
      priority: "P1",
      gapAnalysis: "Khi VPN báo Connected nhưng không vào được mạng nội bộ hoặc SMB Share, chưa tách bạch được lỗi do thiếu Route đẩy về client hay bị chặn ở Firewall Forward chain / Windows Firewall.",
      relatedLessons: [3, 5, 6, 21]
    },
    {
      group: "NTFS vs Share Permission",
      status: "Biết phân quyền, thiếu nguyên lý",
      priority: "P1",
      gapAnalysis: "Biết tích chọn Read/Modify nhưng chưa nắm quy tắc vàng: khi truy cập qua mạng (\\\\Server\\Share), quyền hiệu lực là giao điểm KHẮT KHE NHẤT giữa Share Permission và NTFS Permission.",
      relatedLessons: [9, 12, 21]
    },
    {
      group: "RAID, Snapshot, Backup",
      status: "Có kinh nghiệm Synology, thiếu một số khái niệm",
      priority: "P1",
      gapAnalysis: "Quen giao diện DSM Synology nhưng cần phân biệt sắc nét: RAID/SHR chỉ chống hỏng ổ cứng vật lý, Snapshot giúp quay lui nhanh tại chỗ, chỉ Backup 3-2-1 mới cứu được khi hỏng cả NAS. Hiểu rõ RPO & RTO.",
      relatedLessons: [14, 15, 18, 22]
    },
    {
      group: "Windows Server I/O",
      status: "Biết Task Manager, cần mở rộng công cụ",
      priority: "P1",
      gapAnalysis: "Cần phân biệt 'Ổ cứng đầy dung lượng (Capacity)' với 'Ổ cứng nghẽn băng thông đọc/ghi (Disk Active Time 100% / Queue Length)', dùng thành thạo Resource Monitor (resmon).",
      relatedLessons: [13, 18, 22]
    },
    {
      group: "Malware, Endpoint",
      status: "Phản ứng thực chiến khá tốt",
      priority: "P2",
      gapAnalysis: "Đã có phản xạ cô lập máy nhiễm mã độc tốt. Chỉ cần chuẩn hóa thành quy trình Incident Response bài bản để trình bày chuyên nghiệp khi phỏng vấn.",
      relatedLessons: [16, 18, 22]
    },
    {
      group: "MES, ERP, Printer",
      status: "Là thế mạnh tương đối của cậu",
      priority: "P2",
      gapAnalysis: "Kinh nghiệm thực chiến quý giá từ môi trường sản xuất (Rongxin). Cần nâng cấp cách dùng từ: nói về kiến trúc Client-App-DB, Print Spooler, cổng TCP RAW 9100, DHCP Reservation.",
      relatedLessons: [17, 23, 24]
    }
  ],
  weeksOverview: [
    {
      week: 1,
      title: "Tuần 1 — Network Fundamentals & MikroTik",
      subtitle: "Sửa phần kiến thức mất điểm nhiều nhất",
      color: "blue",
      focus: "Nắm chắc đường đi gói tin, phân biệt Layer 2 (Switch/Bridge/VLAN) với Layer 3 (Routing/NAT/Firewall) và làm chủ chẩn đoán DHCP/DNS/VPN trên MikroTik."
    },
    {
      week: 2,
      title: "Tuần 2 — Windows Server & Active Directory",
      subtitle: "Từ thao tác quản trị user đến hiểu AD",
      color: "indigo",
      focus: "Định nghĩa chuẩn xác AD DS, DC, OU, DNS SRV; tính toán quyền NTFS vs SMB Share; tự tay triển khai GPO và đọc Event Viewer."
    },
    {
      week: 3,
      title: "Tuần 3 — Backup, Storage & Security",
      subtitle: "Củng cố năng lực vận hành hệ thống trọng yếu",
      color: "emerald",
      focus: "Chẩn đoán nghẽn cổ chai Disk I/O bằng resmon; phân biệt RAID/SHR, Btrfs Snapshot và Backup 3-2-1 (RPO/RTO); chuẩn hóa quy trình xử lý Malware & MES/ERP/Printer."
    },
    {
      week: 4,
      title: "Tuần 4 — Troubleshooting & Interview",
      subtitle: "Kết nối toàn bộ kiến thức và luyện diễn đạt",
      color: "amber",
      focus: "Rèn tư duy bắt bệnh bằng bằng chứng (Giả thuyết -> Phép thử -> Sửa -> Kiểm tra) qua 5 kịch bản sự cố tổng hợp và vượt qua Mock Interview 2.0 (12 câu hỏi lớn)."
    }
  ],
  labsGuide: [
    {
      id: "lab-network",
      title: "Network Lab (MikroTik CHR)",
      icon: "router",
      summary: "MikroTik CHR hoặc router lab, hai mạng máy trạm ảo, mô phỏng DHCP, Routing, Firewall và VPN.",
      specs: "RAM tiêu thụ: ~256MB cho CHR + 2 máy trạm nhẹ (Windows Tiny / Alpine / VPCS)",
      topology: [
        "ether1 (WAN): Nhận IP từ NAT của VMware/VirtualBox (giả lập đường truyền ISP)",
        "ether2 (LAN - VLAN 10 Nhân sự): 192.168.10.1/24 + DHCP Server",
        "ether3 (LAN - VLAN 30 Sản xuất/MES): 192.168.30.1/24 + DHCP Server",
        "VPN L2TP/PPP hoặc WireGuard: Cấp dải 10.10.10.0/24 truy cập vào LAN"
      ],
      exercises: [
        "Cấu hình 2 subnet giao tiếp qua Routing mà không bật NAT nội bộ.",
        "Bật SRCNAT (Masquerade) chỉ cho phép ra cổng WAN.",
        "Tạo lỗi DHCP (tắt DHCP hoặc sai VLAN PVID) để quan sát IP 169.254.x.x.",
        "Viết Firewall Filter Rule chặn VLAN 10 truy cập VLAN 30 nhưng cho phép chiều ngược lại."
      ]
    },
    {
      id: "lab-windows",
      title: "Windows Server Lab (AD, DNS, File Share, GPO)",
      icon: "server",
      summary: "Một Windows Server evaluation VM, một Windows client phù hợp để join domain, cấu hình DNS, AD, File Share và GPO.",
      specs: "RAM đề xuất: 4GB cho Windows Server 2019/2022 Eval + 2GB cho Windows 10/11 Client (Chạy trong mạng Host-Only / Internal Network)",
      topology: [
        "DC01 (192.168.10.2/24): Chạy AD DS + DNS Server (Domain: rongxinlab.local)",
        "CLIENT01 (192.168.10.50/24): Trỏ Preferred DNS về 192.168.10.2 để Join Domain",
        "Cấu trúc OU: OU=PhongKeToan, OU=PhongSanXuat, OU=MayTram_Kiosk"
      ],
      exercises: [
        "Kiểm tra bản ghi SRV (_ldap._tcp.dc._msdcs) bằng nslookup trước và sau khi Join Domain.",
        "Tạo thư mục Chung, cấu hình Share Permission (Everyone: Full Control hoặc Authenticated Users: Change) kết hợp NTFS Permission chi tiết cho từng Security Group.",
        "Tạo GPO chặn USB Storage link vào OU=PhongSanXuat, chạy gpupdate /force và kiểm chứng bằng gpresult /r.",
        "Tạo tình huống nhập sai mật khẩu 5 lần để xem Event ID 4625 và 4740 trong Event Viewer."
      ]
    },
    {
      id: "lab-storage",
      title: "Storage & Recovery Lab (Disk I/O, Snapshot, Backup)",
      icon: "hard-drive",
      summary: "Dùng ổ đĩa ảo và dữ liệu giả lập để học snapshot, backup, restore. Với các thao tác đặc thù DSM, dùng NAS Synology thử nghiệm nếu có.",
      specs: "Gắn thêm 3 ổ cứng ảo nhỏ (mỗi ổ 5GB–10GB) vào VM Windows Server hoặc môi trường DSM ảo hóa",
      topology: [
        "Ổ đĩa dữ liệu giả lập chứa hồ sơ các phòng ban & database mẫu",
        "Cấu hình Shadow Copies (Previous Versions) trên Windows Server / Snapshot Replication trên Synology",
        "Thư mục Backup đích mô phỏng quy tắc 3-2-1"
      ],
      exercises: [
        "Dùng công cụ tạo tải đọc/ghi đĩa và mở resmon.exe tìm chính xác PID đang gây Disk Active Time 100%.",
        "Xóa nhầm hoặc sửa hỏng 1 file Excel quan trọng, thực hiện khôi phục về bản chụp 15 phút trước bằng Snapshot / Shadow Copy.",
        "Tính toán RPO và RTO thực tế từ lúc giả lập sự cố đến khi dịch vụ chạy lại hoàn toàn."
      ]
    }
  ],
  officialDocs: [
    {
      name: "Microsoft Learn — Active Directory & Group Policy",
      url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview",
      desc: "Tài liệu chuẩn của Microsoft về kiến trúc AD DS, Domain Controller, DNS SRV và quản trị GPO."
    },
    {
      name: "MikroTik Documentation (manual.mikrotik.com)",
      url: "https://help.mikrotik.com/docs/",
      desc: "Cổng tài liệu RouterOS mới nhất về DHCP, Bridge VLAN Filtering, Routing, NAT và Firewall Filter."
    },
    {
      name: "Synology Knowledge Center — RAID & Backup",
      url: "https://kb.synology.com/en-global/DSM/tutorial/What_is_Synology_Hybrid_RAID_SHR",
      desc: "Tài liệu chính thức về Synology Hybrid RAID (SHR), Btrfs Snapshot Replication và chiến lược Hyper Backup 3-2-1."
    }
  ],
  graduationCriteria: [
    {
      id: "crit-def",
      title: "1. Định nghĩa (30 Thuật ngữ / 30 giây)",
      target: "Giải thích 30 thuật ngữ IT cốt lõi trong khoảng 30 giây/thuật ngữ, đạt ít nhất 24/30.",
      checkHint: "Mở tab '30 Thuật Ngữ (30s)' để luyện tập với đồng hồ bấm giờ và tự chấm điểm."
    },
    {
      id: "crit-prin",
      title: "2. Nguyên lý (8 Trụ cột hệ thống)",
      target: "Giải thích đúng bản chất và mối liên hệ của: DHCP, DNS, Routing, NAT, VLAN, VPN, AD và GPO.",
      checkHint: "Hoàn thành Cấp 2 (Nguyên lý) và dùng thành thạo bộ Mô phỏng Gói tin & Quyền NTFS."
    },
    {
      id: "crit-lab",
      title: "3. Thực hành (4 Bài Lab tổng hợp)",
      target: "Hoàn thành 4 bài lab cơ bản (Bài 06, Bài 12, Bài 18 và chuỗi xử lý sự cố Tuần 4), tự xác minh kết quả bằng câu lệnh.",
      checkHint: "Hoàn thành đầy đủ các bài học đánh dấu LAB trong chương trình."
    },
    {
      id: "crit-ts",
      title: "4. Troubleshooting (Tư duy bằng chứng)",
      target: "Với mỗi lỗi, luôn nêu đủ 4 bước: (1) Giả thuyết -> (2) Phép thử -> (3) Cách sửa -> (4) Kiểm tra sau sửa.",
      checkHint: "Luyện tập qua các bài Bài 19 -> Bài 23 và trình giả lập Chẩn đoán lỗi."
    },
    {
      id: "crit-mock",
      title: "5. Phỏng vấn (Mock Interview 2.0 ≥ 8/10)",
      target: "Đạt ít nhất 8/10 tổng thể ở Bài 24, tuyệt đối không có lỗi nghiêm trọng về an toàn vận hành (như tắt Firewall bừa bãi, xóa dữ liệu không backup).",
      checkHint: "Vào Bài 24 hoặc tab 'Luyện Phỏng Vấn' để trả lời 12 câu hỏi phản biện."
    }
  ],
  glossary30: [
    { id: 1, term: "IP Address", category: "Network (P0)", def30s: "Địa chỉ định danh logic ở Layer 3 của một thiết bị trên mạng IP. Gồm 2 phần: Network ID (xác định thiết bị thuộc mạng nào) và Host ID (định danh từng máy cụ thể trong mạng đó).", trap: "Đừng chỉ nói 'IP là địa chỉ máy tính', phải nêu được nó nằm ở Layer 3 và gồm Network ID + Host ID." },
    { id: 2, term: "Subnet Mask", category: "Network (P0)", def30s: "Mặt nạ mạng đi kèm với IP để giúp thiết bị phân biệt đâu là phần Network, đâu là phần Host. Nhờ Subnet Mask, máy tính biết IP đích nằm CÙNG mạng (gửi thẳng qua Switch) hay KHÁC mạng (phải gửi cho Default Gateway).", trap: "Sai lầm phổ biến nhất là không biết máy tính dùng Subnet Mask để quyết định có gọi Default Gateway hay không." },
    { id: 3, term: "Default Gateway", category: "Network (P0)", def30s: "Cổng ra mặc định của một mạng nội bộ (thường là IP cổng LAN của Router/Firewall). Khi máy tính cần gửi gói tin tới một IP khác Subnet mà không có route cụ thể nào khác, nó sẽ đóng gói gửi tới địa chỉ MAC của Default Gateway.", trap: "Hai máy cùng VLAN/Subnet ping nhau thì KHÔNG đi qua Default Gateway." },
    { id: 4, term: "Routing (Định tuyến)", category: "Network (P0)", def30s: "Quá trình thiết bị Layer 3 (Router/L3 Switch) dựa vào địa chỉ IP đích của gói tin và Bảng định tuyến (Routing Table) để chuyển tiếp gói tin từ mạng này sang mạng khác theo đường đi tốt nhất.", trap: "Routing giữ nguyên IP nguồn và IP đích của gói tin, chỉ thay đổi địa chỉ MAC ở từng chặng (hop)." },
    { id: 5, term: "NAT (Network Address Translation)", category: "Network (P0)", def30s: "Kỹ thuật biên dịch (thay đổi) thông tin địa chỉ IP nguồn (SRCNAT) hoặc IP đích/Port (DSTNAT) trong header gói tin khi đi qua Router. Thường dùng nhất là Masquerade để nhiều IP Private nội bộ dùng chung 1 IP Public ra Internet.", trap: "Giữa các VLAN nội bộ trong công ty chỉ cần Routing, KHÔNG cần NAT (trừ các trường hợp đặc biệt chồng chéo IP)." },
    { id: 6, term: "VLAN (Virtual LAN)", category: "Network (P0)", def30s: "Kỹ thuật chia một Switch vật lý thành nhiều mạng LAN ảo tách biệt nhau ở Layer 2 (tách miền quảng bá - Broadcast Domain). Các máy khác VLAN không thể tự nói chuyện trực tiếp mà bắt buộc phải qua thiết bị định tuyến Layer 3.", trap: "Cắm chung 1 Switch nhưng khác VLAN thì giống như đang cắm trên 2 chiếc Switch vật lý hoàn toàn độc lập." },
    { id: 7, term: "Tagged vs Untagged (Trunk vs Access)", category: "Network (P0)", def30s: "Untagged (Access port) là cổng nối tới thiết bị cuối (PC, Printer) nơi khung tin không gắn nhãn VLAN; Switch dùng PVID của cổng để phân loại. Tagged (Trunk port) là cổng nối giữa Switch-Switch, Switch-Router hoặc Switch-AP, gắn nhãn 802.1Q (VLAN ID) để truyền nhiều VLAN qua 1 sợi cáp.", trap: "PC thông thường không hiểu gói tin Tagged; cắm PC vào cổng chỉ có Tagged sẽ không nhận được IP." },
    { id: 8, term: "Bridge (trên MikroTik)", category: "Network (P0)", def30s: "Thành phần phần mềm gộp nhiều cổng vật lý/ảo (ether, wlan, vlan) thành một miền Layer 2 chung (giống như một con Switch ảo bên trong Router). Khi bật Bridge VLAN Filtering, Bridge quản lý việc gắn/gỡ nhãn VLAN cho các cổng thành viên.", trap: "Khi đã đưa cổng ether2 vào Bridge1, phải gắn IP và DHCP Server lên interface Bridge1 (hoặc VLAN interface), không gắn lẻ lên ether2 nữa." },
    { id: 9, term: "DHCP & Quy trình DORA", category: "Network (P0)", def30s: "Giao thức cấp phát cấu hình mạng tự động (IP, Mask, Gateway, DNS) qua 4 bước: Discover (Client tìm server) -> Offer (Server chào IP) -> Request (Client xin nhận IP đó) -> Acknowledge (Server xác nhận và ghi nhận thời gian thuê Lease Time).", trap: "Gói Discover và Request ban đầu là Broadcast Layer 2 nên mặc định không tự đi xuyên qua Router sang VLAN khác nếu không cấu hình DHCP Relay." },
    { id: 10, term: "APIPA (169.254.x.x)", category: "Network (P0)", def30s: "Cơ chế Windows tự sinh địa chỉ IP trong dải 169.254.0.1 – 169.254.255.254 (Mask 255.255.0.0, không có Default Gateway) khi card mạng bật DHCP nhưng gửi bản tin Discover mà không nhận được bất kỳ phản hồi nào từ DHCP Server.", trap: "Thấy 169.254.x.x là bằng chứng 100% của lỗi kết nối tới DHCP Server (đứt cáp, sai VLAN/PVID, cạn Pool, hoặc dịch vụ DHCP chết), không phải lỗi DNS." },
    { id: 11, term: "DNS (Domain Name System)", category: "Network (P0)", def30s: "Hệ thống phân giải tên miền (như google.com hoặc dc01.congty.local) thành địa chỉ IP để máy tính kết nối được, và ngược lại (PTR). Ngoài bản ghi A (tên ra IPv4), trong môi trường Domain còn có bản ghi SRV cực kỳ quan trọng để định vị dịch vụ.", trap: "Mất DNS thì ping 8.8.8.8 vẫn thông nhưng gõ tên miền trên trình duyệt không vào được." },
    { id: 12, term: "Firewall Filter vs NAT", category: "Network (P1)", def30s: "Firewall Filter quyết định CHO PHÉP (Accept) hay CHẶN (Drop/Reject) gói tin dựa trên điều kiện (Chain Input bảo vệ chính Router, Chain Forward kiểm soát luồng đi xuyên qua Router). Còn NAT chỉ làm nhiệm vụ sửa đổi IP/Port chứ không phải công cụ thiết kế chính để chặn lọc bảo mật.", trap: "trên MikroTik, mở Port (DSTNAT) mà bị rule Drop ở Firewall Filter chain Forward chặn thì bên ngoài vẫn không vào được." },
    { id: 13, term: "VPN (Virtual Private Network)", category: "Network (P1)", def30s: "Công nghệ tạo đường hầm ảo (Tunnel) được mã hóa xuyên qua mạng công cộng (Internet), giúp máy trạm hoặc chi nhánh từ xa nhận một IP ảo và định tuyến truy cập vào mạng LAN nội bộ an toàn như đang ngồi tại văn phòng.", trap: "VPN báo Connected mới chỉ xong bước thiết lập đường hầm; muốn vào được File Server nội bộ còn cần đúng Route, Firewall cho phép và phân quyền SMB." },
    { id: 14, term: "Active Directory Domain Services (AD DS)", category: "Windows AD (P0)", def30s: "Dịch vụ thư mục của Microsoft trên Windows Server dùng để lưu trữ tập trung thông tin các đối tượng mạng (User, Computer, Group, OU) trong cơ sở dữ liệu (ntds.dit) và cung cấp cơ chế xác thực, phân quyền tập trung cho toàn bộ doanh nghiệp.", trap: "AD DS là dịch vụ/vai trò phần mềm (Server Role), còn Domain Controller (DC) là máy chủ cài đặt và chạy dịch vụ AD DS đó." },
    { id: 15, term: "Domain Controller (DC)", category: "Windows AD (P0)", def30s: "Máy chủ Windows Server đã được cài đặt role AD DS và nâng cấp (Promote) để nắm giữ cơ sở dữ liệu Active Directory, trực tiếp xử lý yêu cầu đăng nhập (Authentication), kiểm tra quyền hạn và đồng bộ chính sách GPO xuống các máy trạm trong Domain.", trap: "Mất kết nối tới DC (hoặc DNS không phân giải được DC) thì không thể Join Domain hoặc áp dụng GPO mới." },
    { id: 16, term: "Organizational Unit (OU)", category: "Windows AD (P0)", def30s: "Đơn vị tổ chức dạng thư mục chứa (Container) bên trong Active Directory dùng để gom nhóm User, Computer theo phòng ban/vị trí nhằm 2 mục đích chính: Gắn chính sách Group Policy (GPO) và Ủy quyền quản trị (Delegation of Control).", trap: "Phân biệt rõ: OU dùng để áp GPO và quản lý cấu trúc, KHÔNG dùng OU để gán quyền truy cập thư mục Share/NTFS (việc đó là của Security Group)." },
    { id: 17, term: "Security Group", category: "Windows AD (P1)", def30s: "Nhóm bảo mật tập hợp các User hoặc Computer dùng để cấp quyền (Permissions) truy cập tài nguyên như File Share, NTFS Folder, Printer. Thực hành tốt nhất là gán quyền cho Security Group thay vì gán lẻ cho từng User.", trap: "Không thể Link trực tiếp một GPO vào Security Group (GPO phải link vào Site/Domain/OU, sau đó mới dùng Security Filtering nếu cần)." },
    { id: 18, term: "DNS SRV Record (trong AD)", category: "Windows AD (P0)", def30s: "Bản ghi định vị dịch vụ trong DNS (ví dụ _ldap._tcp.dc._msdcs.domain.local) cho máy trạm biết chính xác máy chủ nào đang làm Domain Controller, chạy dịch vụ LDAP/Kerberos ở cổng nào. Đây là lý do máy trạm bắt buộc phải trỏ DNS về DC mới Join Domain được.", trap: "Trỏ DNS máy trạm về 8.8.8.8 thì Google DNS không thể biết DC nội bộ của công ty nằm ở IP nào." },
    { id: 19, term: "Group Policy Object (GPO)", category: "Windows AD (P0)", def30s: "Tập hợp các thiết lập cấu hình và chính sách bảo mật (như chặn USB, khóa Control Panel, tự động map ổ mạng, cài phần mềm) được tạo trên Domain Controller và áp xuống hàng loạt máy tính (Computer Config) hoặc người dùng (User Config) theo thứ tự LSDOU.", trap: "Sửa GPO ở phần Computer Configuration thường cần chạy gpupdate /force và khởi động lại máy trạm (nếu liên quan tới dịch vụ hệ thống/startup), còn User Configuration áp dụng theo phiên đăng nhập." },
    { id: 20, term: "NTFS vs SMB Share Permission", category: "Windows AD (P1)", def30s: "NTFS Permission kiểm soát quyền truy cập ngay trên ổ đĩa cục bộ lẫn qua mạng (chi tiết tới từng file/thư mục con). Share Permission chỉ kiểm soát ở 'cổng vào' khi truy cập qua mạng (\\\\Server\\Share). Khi đi qua mạng, quyền thực tế (Effective Permission) là quyền KHẮT KHE HƠN giữa hai bên.", trap: "Nếu Share chỉ để Read mà NTFS để Full Control, user truy cập qua mạng \\\\Server\\Share vẫn chỉ có quyền Read!" },
    { id: 21, term: "Disk Active Time vs Disk Capacity", category: "Storage & Perf (P1)", def30s: "Disk Capacity là dung lượng lưu trữ còn trống (GB/TB), còn Disk Active Time (%) là tỷ lệ thời gian ổ cứng đang bận xử lý lệnh đọc/ghi (I/O). Một ổ cứng còn trống 80% dung lượng vẫn có thể bị treo đơ 100% Active Time do nghẽn IOPS hoặc tiến trình đọc/ghi liên tục.", trap: "Server chậm đơ do Disk 100% trong Task Manager không giải quyết được bằng cách xóa bớt file rác, mà phải mở resmon xem tiến trình nào đang ngốn I/O." },
    { id: 22, term: "Resource Monitor (resmon)", category: "Storage & Perf (P1)", def30s: "Công cụ chẩn đoán chuyên sâu có sẵn trên Windows/Windows Server, cho phép xem chi tiết từng tiến trình (PID) đang đọc/ghi file đường dẫn nào với tốc độ bao nhiêu KB/s, độ trễ ổ cứng (Disk Latency ms) và kết nối TCP cụ thể — chi tiết hơn rất nhiều so với Task Manager.", trap: "Khi phỏng vấn câu hỏi Windows Server bị chậm I/O, nêu được tên công cụ resmon và chỉ số Disk Queue Length / Latency (ms) sẽ ghi điểm tuyệt đối." },
    { id: 23, term: "RAID & Synology SHR", category: "Storage & Perf (P1)", def30s: "Công nghệ gộp nhiều ổ cứng vật lý thành một khối lưu trữ logic để tăng hiệu năng hoặc chịu lỗi phần cứng (Fault Tolerance). SHR (Synology Hybrid RAID) là cơ chế RAID tự động tối ưu dung lượng của Synology (1-disk hoặc 2-disk redundancy). RAID giúp hệ thống KHÔNG ngừng chạy khi chết ổ cứng.", trap: "RAID KHÔNG PHẢI LÀ BACKUP! Nếu xóa nhầm file hoặc bị Ransomware mã hóa, RAID sẽ ngay lập tức đồng bộ lỗi xóa/mã hóa đó sang tất cả các ổ cứng cùng lúc." },
    { id: 24, term: "Snapshot (Btrfs)", category: "Storage & Perf (P1)", def30s: "Bản chụp trạng thái dữ liệu tại một thời điểm (Point-in-time) theo cơ chế Copy-on-Write (CoW), tốn rất ít dung lượng và thực hiện gần như tức thì. Giúp khôi phục nhanh file bị xóa nhầm hoặc bị sửa đổi/mã hóa về phiên bản vài phút hoặc vài giờ trước ngay trên NAS/Server.", trap: "Snapshot nằm chung trên cùng thiết bị lưu trữ gốc nên nếu cháy hỏng toàn bộ NAS hoặc hỏng cả Volume thì Snapshot cũng mất theo — vẫn cần Backup ra thiết bị khác." },
    { id: 25, term: "Quy tắc Backup 3-2-1", category: "Storage & Perf (P1)", def30s: "Tiêu chuẩn vàng trong sao lưu dữ liệu: Có ít nhất 3 bản dữ liệu (1 bản chính đang chạy + 2 bản sao lưu), lưu trên 2 loại thiết bị/môi trường lưu trữ khác nhau (VD: Server + NAS/Tape), và có ít nhất 1 bản đặt ở ngoài vị trí vật lý (Offsite hoặc Cloud/Immutable).", trap: "Copy dữ liệu từ ổ D sang ổ E trên cùng 1 máy chủ hoàn toàn vi phạm quy tắc 3-2-1." },
    { id: 26, term: "RPO vs RTO", category: "Storage & Perf (P1)", def30s: "RPO (Recovery Point Objective) nhìn về QUÁ KHỨ: lượng dữ liệu tối đa chấp nhận mất tính theo thời gian (quyết định tần suất backup, VD: backup mỗi 4 giờ thì RPO = 4h). RTO (Recovery Time Objective) nhìn về TƯƠNG LAI: thời gian tối đa từ lúc sập đến khi khôi phục hệ thống chạy lại bình thường.", trap: "Rất nhiều ứng viên nói ngược hai khái niệm này: hãy nhớ Point = Điểm dữ liệu quá khứ (Mất bao lâu dữ liệu?), Time = Thời gian sửa chữa (Ngừng chạy bao lâu?)." },
    { id: 27, term: "Full vs Incremental Backup", category: "Storage & Perf (P1)", def30s: "Full Backup sao lưu toàn bộ dữ liệu được chọn (tốn dung lượng và thời gian backup nhưng Restore nhanh nhất). Incremental Backup chỉ sao lưu phần dữ liệu thay đổi kể từ lần backup gần nhất bất kỳ (Backup cực nhanh, nhẹ, nhưng khi Restore phải ghép bản Full gốc + chuỗi các bản Incremental tiếp theo).", trap: "Backup mà chưa từng diễn tập thử Restore (Verify Restore) thì coi như chưa có hệ thống Backup đáng tin cậy." },
    { id: 28, term: "Endpoint Isolation (Cô lập máy trạm)", category: "Security (P2)", def30s: "Hành động ngắt kết nối mạng (rút cáp LAN, ngắt Wi-Fi, khóa port Switch hoặc Isolate trên EDR) của thiết bị nghi nhiễm Malware/Ransomware ngay lập tức để chặn đứng việc lây lan ngang (Lateral Movement) qua SMB/mạng nội bộ trước khi tiến hành điều tra và xử lý.", trap: "Ưu tiên số 1 khi phát hiện dấu hiệu Ransomware là ngắt mạng cô lập ngay lập tức, không phải ngồi cài phần mềm diệt virus trong khi máy vẫn cắm dây LAN." },
    { id: 29, term: "MES / ERP Architecture", category: "Operations (P2)", def30s: "ERP hoạch định tài nguyên doanh nghiệp (mua hàng, kế toán, kho tổng), còn MES điều hành trực tiếp sản xuất dưới xưởng theo thời gian thực (chuyền, công đoạn, barcode). Về kỹ thuật IT, chúng hoạt động theo mô hình Client (PC/PDA) -> Application Server -> Database Server.", trap: "Khi trạm MES dưới xưởng báo lỗi, phải khoanh vùng xem lỗi ở tầng mạng máy trạm, tầng App Server hay tầng Database/Disk I/O." },
    { id: 30, term: "Print Spooler & TCP Port 9100", category: "Operations (P2)", def30s: "Print Spooler (spoolsv.exe) là dịch vụ Windows quản lý hàng đợi lệnh in. Với máy in mạng/máy in tem công nghiệp (Zebra), kết nối trực tiếp qua Standard TCP/IP Port (RAW Port 9100) ổn định hơn chia sẻ qua máy tính trung gian, và bắt buộc phải gắn IP tĩnh hoặc DHCP Reservation cho máy in.", trap: "Để máy in nhận DHCP động không cố định IP thì sau khi mất điện/hết lease, máy in đổi IP sẽ làm toàn bộ dây chuyền mất kết nối in." }
  ],
  simulators: {
    packetScenarios: [
      {
        id: "same-vlan",
        title: "Kịch bản 1: Cùng VLAN / Cùng Subnet (PC1 -> PC2)",
        badge: "Chỉ Layer 2 — Không Gateway, Không Routing, Không NAT",
        topology: "PC1 (192.168.10.10/24, VLAN 10)  ───►  [ Switch / Bridge VLAN 10 ]  ───►  PC2 (192.168.10.20/24, VLAN 10)",
        summary: "Hai máy nằm trong cùng mạng 192.168.10.0/24 và cùng VLAN 10. Gói tin đi thẳng qua Switch ở Layer 2 mà KHÔNG HỀ chạm tới Router hay Default Gateway.",
        needsGateway: false,
        needsRouting: false,
        needsNat: false,
        steps: [
          {
            hop: "1. Kiểm tra Subnet Mask tại PC1",
            action: "PC1 lấy IP của mình (192.168.10.10) và IP đích (192.168.10.20) so với Subnet Mask (255.255.255.0). Kết quả: Cả hai cùng thuộc mạng 192.168.10.0/24!",
            srcIp: "192.168.10.10",
            dstIp: "192.168.10.20",
            srcMac: "AA:AA:AA:11:11:11 (PC1)",
            dstMac: "Đang tìm qua ARP...",
            vlan: "Untagged (PVID = 10)"
          },
          {
            hop: "2. Hỏi ARP tìm MAC của PC2",
            action: "Vì biết PC2 ở ngay cùng phòng (cùng Subnet), PC1 KHÔNG gọi Default Gateway. Nó phát gói ARP Broadcast: 'Ai có IP 192.168.10.20 thì cho xin địa chỉ MAC?'. PC2 trả lời lại MAC của mình.",
            srcIp: "192.168.10.10",
            dstIp: "192.168.10.20",
            srcMac: "AA:AA:AA:11:11:11 (PC1)",
            dstMac: "BB:BB:BB:22:22:22 (PC2)",
            vlan: "VLAN 10"
          },
          {
            hop: "3. Switch chuyển mạch trực tiếp (Layer 2 Switching)",
            action: "Switch nhìn vào bảng MAC Address Table trong VLAN 10, đẩy thẳng khung tin (Frame) ra cổng cắm PC2. Router hoàn toàn đứng ngoài cuộc!",
            srcIp: "192.168.10.10 (Giữ nguyên)",
            dstIp: "192.168.10.20 (Giữ nguyên)",
            srcMac: "AA:AA:AA:11:11:11 (PC1)",
            dstMac: "BB:BB:BB:22:22:22 (PC2)",
            vlan: "Untagged ra cổng PC2"
          }
        ]
      },
      {
        id: "inter-vlan",
        title: "Kịch bản 2: Khác VLAN / Khác Subnet nội bộ (VLAN 10 -> VLAN 30)",
        badge: "Cần Default Gateway & Routing — KHÔNG CẦN NAT!",
        topology: "PC1 (192.168.10.10/24, VLAN 10) ──► [Switch] ──► [Router MikroTik: .10.1 & .30.1] ──► [Switch] ──► Server MES (192.168.30.100/24, VLAN 30)",
        summary: "Đây chính là câu hỏi trọng tâm trong phỏng vấn của cậu! PC1 ở VLAN 10 muốn truy cập Server ở VLAN 30. Cần Default Gateway và Routing ( + Firewall Forward cho phép), nhưng TUYỆT ĐỐI KHÔNG CẦN NAT vì Router biết rõ đường đi của cả 2 mạng nội bộ.",
        needsGateway: true,
        needsRouting: true,
        needsNat: false,
        steps: [
          {
            hop: "1. PC1 phát hiện IP đích khác Subnet",
            action: "PC1 so sánh 192.168.10.10/24 với 192.168.30.100 -> Khác mạng! PC1 hiểu rằng không thể gửi trực tiếp được mà phải nhờ 'cổng bảo vệ' là Default Gateway (192.168.10.1).",
            srcIp: "192.168.10.10",
            dstIp: "192.168.30.100",
            srcMac: "AA:AA:AA:11:11:11 (PC1)",
            dstMac: "RT:RT:RT:00:10:01 (MAC của Gateway VLAN 10)",
            vlan: "VLAN 10"
          },
          {
            hop: "2. Router MikroTik nhận gói tin & Tra bảng Routing",
            action: "Router bóc lớp vỏ MAC cũ ra, nhìn vào Dst IP (192.168.30.100). Nó tra bảng `/ip route print` thấy mạng 192.168.30.0/24 đang nối trực tiếp (Connected) ở cổng VLAN 30. Đồng thời kiểm tra Firewall Filter chain `forward`.",
            srcIp: "192.168.10.10 (KHÔNG ĐỔI - Không NAT!)",
            dstIp: "192.168.30.100 (KHÔNG ĐỔI)",
            srcMac: "Đang đóng gói lại ở chặng mới...",
            dstMac: "Đang đóng gói lại ở chặng mới...",
            vlan: "Định tuyến từ VLAN 10 -> VLAN 30"
          },
          {
            hop: "3. Router đóng gói MAC mới & Đẩy sang VLAN 30",
            action: "Router giữ nguyên IP nguồn 192.168.10.10 để Server MES biết ai đang gọi mình. Router chỉ thay Src MAC thành MAC cổng VLAN 30 của Router, và Dst MAC thành MAC của Server MES. Khi Server MES trả lời về 192.168.10.10, Router lại định tuyến ngược về VLAN 10 ngon lành mà không cần NAT!",
            srcIp: "192.168.10.10 (Giữ nguyên)",
            dstIp: "192.168.30.100 (Giữ nguyên)",
            srcMac: "RT:RT:RT:00:30:01 (MAC Router cổng VLAN 30)",
            dstMac: "SV:SV:SV:30:01:00 (MAC của Server MES)",
            vlan: "VLAN 30"
          }
        ]
      },
      {
        id: "wan-internet",
        title: "Kịch bản 3: Từ mạng LAN truy cập ra Internet (PC1 -> 8.8.8.8)",
        badge: "Cần Gateway + Default Route (0.0.0.0/0) + SRCNAT (Masquerade)",
        topology: "PC1 (192.168.10.10) ──► [Router MikroTik LAN .10.1 | WAN 203.113.10.5] ──► [Internet ISP] ──► Google DNS (8.8.8.8)",
        summary: "Tại sao ra Internet lại bắt buộc cần NAT? Vì 192.168.10.10 là IP Private (RFC 1918) — các Router ngoài Internet không biết 192.168.10.10 của công ty cậu nằm ở đâu để trả lời về! Do đó Router biên phải thực hiện SRCNAT (Masquerade) đổi IP nguồn thành IP Public của nhà mạng.",
        needsGateway: true,
        needsRouting: true,
        needsNat: true,
        steps: [
          {
            hop: "1. PC1 gửi gói tin tới Default Gateway",
            action: "8.8.8.8 khác mạng 192.168.10.0/24 nên PC1 đóng gói gửi tới MAC của Default Gateway (192.168.10.1).",
            srcIp: "192.168.10.10 (IP Private)",
            dstIp: "8.8.8.8",
            srcMac: "AA:AA:AA:11:11:11 (PC1)",
            dstMac: "RT:RT:RT:00:10:01 (MAC Gateway LAN)",
            vlan: "VLAN 10"
          },
          {
            hop: "2. Router tra Default Route (0.0.0.0/0) & Thực hiện SRCNAT",
            action: "Router thấy đích 8.8.8.8 khớp với Default Route `0.0.0.0/0` đi ra cổng WAN. Trước khi đẩy gói tin ra cổng WAN, rule `chain=srcnat out-interface=WAN action=masquerade` sẽ GHI ĐÈ Src IP từ `192.168.10.10` thành IP Public `203.113.10.5` và lưu vào bảng Connection Tracking.",
            srcIp: "203.113.10.5 (ĐÃ ĐƯỢC NAT THÀNH IP PUBLIC!)",
            dstIp: "8.8.8.8",
            srcMac: "RT:RT:RT:WA:NN:01 (MAC cổng WAN Router)",
            dstMac: "IS:PP:GW:00:00:01 (MAC Modem/Gateway nhà mạng)",
            vlan: "WAN"
          },
          {
            hop: "3. Khi 8.8.8.8 phản hồi về 203.113.10.5",
            action: "Google trả gói tin về IP Public `203.113.10.5`. Router MikroTik tra bảng Connection Tracking, tự động dịch ngược (Un-NAT) Dst IP từ `203.113.10.5` về lại `192.168.10.10` rồi trả về cho PC1.",
            srcIp: "8.8.8.8",
            dstIp: "192.168.10.10 (Đã dịch ngược từ 203.113.10.5)",
            srcMac: "RT:RT:RT:00:10:01",
            dstMac: "AA:AA:AA:11:11:11 (PC1)",
            vlan: "VLAN 10"
          }
        ]
      }
    ]
  }
};
