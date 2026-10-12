window.SYSTEM_BLUEPRINT = {
  // 1. Bản đồ liên kết & trình tự thực thi cho TỪNG BÀI HỌC (Bài 01 -> Bài 24)
  lessonConnections: {
    1: {
      stage: "Tầng 1 — Nền móng Định danh & Đường đi Gói tin (Layer 2 / Layer 3)",
      upstream: {
        title: "Điểm khởi đầu của toàn bộ hệ thống mạng",
        detail: "Trước khi cấu hình bất kỳ thiết bị nào (MikroTik, Switch, Windows Server, NAS, Máy in), cậu bắt buộc phải có bảng Quy hoạch IP (IP Subnet, Mask, Gateway, DNS).",
        linkedLessons: []
      },
      downstream: {
        title: "Quyết định trực tiếp đến VLAN, Routing, DHCP và AD DNS",
        detail: "Nếu đặt sai Subnet Mask (VD /24 nhầm thành /16), máy trạm sẽ tưởng mạng khác là cùng mạng và không gọi Default Gateway (lỗi Bài 03). Nếu đặt sai DNS, máy trạm sẽ không thể Join Domain (lỗi Bài 08).",
        linkedLessons: [2, 3, 4, 8]
      },
      executionFlow: [
        "1. Chốt bảng quy hoạch dải IP trên giấy trước (VD: VLAN 10 Server = 192.168.10.0/24, Gateway = .10.1).",
        "2. Đặt IP cho cổng LAN của Router làm Default Gateway (.10.1) trước tiên.",
        "3. Đặt IP tĩnh cho các thiết bị hạ tầng (Server, NAS, Switch quản lý, Máy in) nằm ngoài dải cấp tự động.",
        "4. Kiểm tra bằng bộ 4 lệnh theo đúng thứ tự: ipconfig /all ➔ ping 127.0.0.1 ➔ ping Gateway ➔ ping IP ngoài (8.8.8.8) ➔ nslookup."
      ]
    },
    2: {
      stage: "Tầng 2A — Phân tách Mạng Nội Bộ ở Layer 2 (Switch, Bridge & VLAN)",
      upstream: {
        title: "Nhận bảng Quy hoạch dải mạng (Subnet) từ Bài 01",
        detail: "Mỗi Subnet cậu đã chia ở Bài 01 (192.168.10.0/24, 192.168.30.0/24) sẽ được ánh xạ (mapping) 1-1 với một VLAN ID cụ thể (VLAN 10, VLAN 30).",
        linkedLessons: [1]
      },
      downstream: {
        title: "Làm đường băng Layer 2 cho Gateway, DHCP và Access Point (Wi-Fi)",
        detail: "Phải thông VLAN (Tagged/Untagged/PVID) từ Router MikroTik xuống Switch và xuống Access Point thì ở Bài 03 các VLAN mới định tuyến được, và ở Bài 04 máy trạm mới xin được IP từ đúng DHCP Server của VLAN đó!",
        linkedLessons: [3, 4, 6, 19]
      },
      executionFlow: [
        "1. Tạo Bridge chung trên MikroTik và thêm các cổng vật lý (ether2..ether5) vào Bridge.",
        "2. Xác định rõ từng cổng: Cổng nối sang Switch/AP là Trunk (Tagged VLAN 10, 30); cổng cắm thẳng PC/Server là Access (Untagged + đặt PVID).",
        "3. Tạo các VLAN Interface (vlan10, vlan30) gắn trên Bridge (và nhớ thêm chính 'bridge' vào danh sách Tagged trong bảng Bridge VLANs!).",
        "4. Kiểm tra nghiệm thu L2 trước khi bật L3: Cắm thử máy tính vào cổng Access xem đèn link và bảng Hosts trong Bridge đã nhận đúng VLAN ID chưa."
      ]
    },
    3: {
      stage: "Tầng 2B — Kết nối Liên Mạng & Bảo mật Vòng Ngoài (Routing, NAT, Firewall)",
      upstream: {
        title: "Nhận các VLAN Interface & Cổng WAN từ Bài 01 & Bài 02",
        detail: "Cần có sẵn các interface VLAN 10, VLAN 30 (Bài 02) và quy hoạch IP Gateway (Bài 01) để gắn IP lên Router.",
        linkedLessons: [1, 2]
      },
      downstream: {
        title: "Mở đường cho Client gọi về Domain Controller, File Server, MES và Internet",
        detail: "Khi gắn IP lên các VLAN Interface trên MikroTik, Router tự động tạo Connected Routes (Định tuyến giữa các VLAN mà KHÔNG cần NAT). Sau đó Firewall Filter (chain=forward) sẽ quyết định VLAN nào được phép gọi sang Server ở VLAN 10.",
        linkedLessons: [5, 6, 8, 21]
      },
      executionFlow: [
        "1. Gắn IP Gateway lên từng VLAN Interface (192.168.10.1/24 cho vlan10, 192.168.30.1/24 cho vlan30) ➔ Kiểm tra /ip route print thấy tự sinh route DAC.",
        "2. Cấu hình cổng WAN nhận mạng ISP và tạo Default Route (0.0.0.0/0) đẩy ra Gateway nhà mạng.",
        "3. Tạo duy nhất 1 rule SRCNAT (action=masquerade) có điều kiện BẮT BUỘC: out-interface=WAN (tuyệt đối không để trống out-interface!).",
        "4. Thiết lập Firewall Filter theo thứ tự: (a) Cho phép Established/Related ➔ (b) Drop Invalid ➔ (c) Cho phép LAN cần thiết gọi vào Server (VLAN 30 gọi порт MES/DNS/AD ở VLAN 10) ➔ (d) Chặn các truy cập chéo trái phép."
      ]
    },
    4: {
      stage: "Tầng 2C — Cấp phát Tự động & Phân giải Tên miền (DHCP & DNS)",
      upstream: {
        title: "Nhận VLAN Interface (Bài 02) và IP Gateway (Bài 03)",
        detail: "DHCP Server trên MikroTik phải được gắn vào đúng VLAN Interface (vlan10, vlan30) chứ không gắn nhầm vào cổng vật lý lẻ tẻ.",
        linkedLessons: [1, 2, 3]
      },
      downstream: {
        title: "Cung cấp IP, Gateway và đặc biệt là địa chỉ DNS của Domain Controller cho toàn bộ máy trạm",
        detail: "Khi chưa dựng Domain Controller (Bài 07-08), DHCP tạm cấp DNS của Router/Google. Nhưng ngay khi dựng xong DC ở Bài 08, cậu PHẢI quay lại DHCP Networks sửa DNS Server trỏ về IP của DC!",
        linkedLessons: [6, 8, 17, 19]
      },
      executionFlow: [
        "1. Tạo IP Pool cho từng mạng (chừa lại khoảng 20–50 IP đầu từ .1 đến .50 cho Server, NAS, Switch, Máy in).",
        "2. Chạy DHCP Setup trên từng interface VLAN (vlan10, vlan30): khai báo đúng Network, Gateway (.10.1 / .30.1) và DNS Server.",
        "3. Với các thiết bị cố định (Máy in Zebra, Máy chấm công, NAS): Vào tab Leases bấm 'Make Static' để khóa cứng IP theo MAC.",
        "4. Cắm máy trạm kiểm tra lệnh ipconfig /all: Đảm bảo nhận đúng IP, Subnet Mask, Default Gateway và DNS (không bị rơi vào 169.254.x.x)."
      ]
    },
    5: {
      stage: "Tầng 7B — Cổng Kết Nối Từ Xa An Toàn (VPN & Remote Access)",
      upstream: {
        title: "Phụ thuộc vào WAN IP, Routing, Firewall (Bài 03) và Phân quyền SMB (Bài 09)",
        detail: "VPN không phải là một ốc đảo riêng. Nó tạo ra một dải IP ảo (VD: 10.10.10.0/24) nối vào Router, nên chịu sự chi phối hoàn toàn của Routing, Firewall Forward trên Router và Windows Firewall trên Server đích.",
        linkedLessons: [3, 9]
      },
      downstream: {
        title: "Phục vụ quản trị từ xa và truy cập File Server / ERP khi ở ngoài công ty",
        detail: "Là nền tảng để xử lý ca bệnh kinh điển ở Bài 21: 'VPN Connected nhưng không vào được \\\\Server\\Share'.",
        linkedLessons: [21]
      },
      executionFlow: [
        "1. Tạo IP Pool riêng cho VPN (VD: 10.10.10.10–10.10.10.50, khác hoàn toàn dải LAN văn phòng và tránh trùng dải 192.168.1.0/24 của Wi-Fi nhà).",
        "2. Bật VPN Server (WireGuard / L2TP-IPsec / SSTP) và mở cổng tương ứng trên Firewall chain=input của MikroTik.",
        "3. Khai báo Route đẩy xuống VPN Client (hoặc bật proxy-arp nếu dùng chung dải LAN) và mở Firewall chain=forward từ dải VPN vào IP File Server/MES.",
        "4. Trên Windows Server đích: Kiểm tra Windows Defender Firewall rule 'File and Printer Sharing (SMB-In)' phần Scope phải cho phép dải IP VPN (không để chỉ Local subnet)."
      ]
    },
    6: {
      stage: "Tổng duyệt Thực thi Hạ tầng Mạng (End-to-End Network Lab)",
      upstream: {
        title: "Hội tụ toàn bộ Bài 01, 02, 03, 04, 05",
        detail: "Bài Lab này ghép nối tất cả các mảnh rời rạc của Tuần 1 thành một quy trình dựng mạng hoàn chỉnh từ lúc Router còn trắng cấu hình.",
        linkedLessons: [1, 2, 3, 4, 5]
      },
      downstream: {
        title: "Bàn giao hạ tầng mạng thông suốt để Tuần 2 dựng Windows Server & Active Directory",
        detail: "Có mạng VLAN 10 và VLAN 30 thông định tuyến rồi thì sang Bài 07-12 mới đặt DC ở VLAN 10 và cho Client ở VLAN 30 Join Domain được!",
        linkedLessons: [7, 8, 12, 19]
      },
      executionFlow: [
        "1. Bước 1 (Layer 2): Tạo Bridge + VLAN Filtering (VLAN 10 Server, VLAN 30 Client).",
        "2. Bước 2 (Layer 3): Gắn IP Gateway cho vlan10 (.10.1) và vlan30 (.30.1) + Cấu hình WAN.",
        "3. Bước 3 (Dịch vụ mạng): Bật DHCP Server cho vlan10 & vlan30 + Bật DNS.",
        "4. Bước 4 (NAT & Bảo mật): Thêm SRCNAT Masquerade ra WAN + Viết Firewall Filter kiểm soát luồng giữa VLAN 30 và VLAN 10."
      ]
    },
    7: {
      stage: "Tầng 3A — Kiến trúc Định danh Tập trung (Domain, AD DS, DC & OU)",
      upstream: {
        title: "Nhận hạ tầng mạng & IP tĩnh ở VLAN Server từ Tuần 1 (Bài 01–06)",
        detail: "Máy chủ Windows Server chuẩn bị nâng cấp lên Domain Controller bắt buộc phải được đặt IP tĩnh cố định (VD: 192.168.10.2/24, Gateway 192.168.10.1).",
        linkedLessons: [1, 6]
      },
      downstream: {
        title: "Tạo khung xương sống cho AD DNS (Bài 08), Phân quyền Group/NTFS (Bài 09) và GPO (Bài 10)",
        detail: "Cấu trúc cây OU cậu thiết kế ở Bài 07 sẽ quyết định trực tiếp việc cậu gắn chính sách GPO ở Bài 10 có dễ dàng hay bị rối loạn!",
        linkedLessons: [8, 9, 10, 12]
      },
      executionFlow: [
        "1. Đặt tên máy chủ chuẩn (VD: DC01) và cấu hình IP tĩnh (192.168.10.2/24, DNS trỏ về chính nó 127.0.0.1).",
        "2. Cài đặt Server Role: Active Directory Domain Services (AD DS) kèm DNS Server.",
        "3. Promote máy chủ thành Domain Controller (tạo Forest/Domain mới, VD: corp.local) ➔ Khởi động lại.",
        "4. Mở Active Directory Users and Computers (dsa.msc), tạo ngay cây OU gốc (VD: OU=_CORP) rồi chia theo từng Phòng ban, bên trong mỗi phòng ban tạo sẵn 2 OU con: 'Users' và 'Computers'."
      ]
    },
    8: {
      stage: "Tầng 3B — Mắt xích Sống Còn: AD DNS, Bản ghi SRV & Gia nhập Domain",
      upstream: {
        title: "Nhận Domain Controller từ Bài 07 và DHCP Server từ Bài 04",
        detail: "Đây chính là mắt xích kết nối giữa Mạng (MikroTik DHCP) và Hệ thống (Windows Server AD) mà người tự làm hay bỏ sót nhất!",
        linkedLessons: [4, 7]
      },
      downstream: {
        title: "Điều kiện tiên quyết để Máy trạm Join Domain, Xác thực Kerberos và Nhận GPO",
        detail: "Nếu máy trạm không trỏ DNS duy nhất về IP của DC (192.168.10.2), nó sẽ không tra cứu được bản ghi SRV (_ldap._tcp.dc._msdcs) ➔ Không thể Join Domain, không đăng nhập được và GPO ở Bài 10 hoàn toàn vô tác dụng!",
        linkedLessons: [9, 10, 12, 20]
      },
      executionFlow: [
        "1. Trên DC01: Mở DNS Manager kiểm tra mục _msdcs.<domain> đã có đủ các bản ghi SRV (_ldap, _kerberos) chưa.",
        "2. Trên DC01: Cấu hình DNS Forwarders trỏ ra DNS công cộng (8.8.8.8, 1.1.1.1) để DC phân giải hộ tên miền Internet cho máy trạm.",
        "3. QUAN TRỌNG NHẤT: Mở WinBox MikroTik ➔ IP ➔ DHCP Server ➔ Networks ➔ Sửa mục DNS Servers của tất cả các VLAN nội bộ trỏ về DUY NHẤT IP của DC01 (192.168.10.2). Tuyệt đối không chêm 8.8.8.8 vào Secondary DNS của máy trạm!",
        "4. Trên máy trạm Windows: Chạy ipconfig /renew, kiểm tra nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local thấy trả về DC01 ➔ Thực hiện Join Domain ➔ Khởi động lại và chuyển Computer Object từ thùng 'Computers' mặc định vào đúng OU phòng ban."
      ]
    },
    9: {
      stage: "Tầng 4 — Quản trị Tài khoản, Security Group & Phân quyền File Server (SMB + NTFS)",
      upstream: {
        title: "Nhận Cây OU (Bài 07) và Máy trạm đã Join Domain (Bài 08)",
        detail: "Sau khi đã có Domain và cấu trúc OU, bước tiếp theo là tạo User, gom vào Security Group và xây dựng kho dữ liệu chung (File Server) cho công ty.",
        linkedLessons: [7, 8]
      },
      downstream: {
        title: "Cung cấp đường dẫn Share (\\\\Server\\Share) để Bài 10 dùng GPO tự động Map ổ đĩa mạng",
        detail: "Làm xong phân quyền Share + NTFS ở bài này thì sang Bài 10 cậu mới cấu hình GPO tự động gắn ổ Z:, ổ X: cho từng phòng ban khi nhân viên đăng nhập!",
        linkedLessons: [10, 12, 21]
      },
      executionFlow: [
        "1. Tạo các User trong đúng OU phòng ban (OU=Users) và tạo các Security Group tương ứng (VD: GRP_KeToan_Modify, GRP_KeToan_ReadOnly). Đưa User vào Group.",
        "2. Trên File Server: Tạo thư mục gốc (VD: E:\\Shares\\KeToan).",
        "3. Cấu hình lớp cổng ngoài (SMB Share Permission): Bấm Advanced Sharing ➔ Cấp quyền cho 'Authenticated Users = Change' (hoặc Full Control) và xóa 'Everyone' nếu muốn bảo mật.",
        "4. Cấu hình lớp khóa trong (NTFS Security Permission): Vào tab Security ➔ Advanced ➔ Disable Inheritance (nếu cần tách quyền riêng) ➔ Giữ lại SYSTEM, Administrators ➔ Thêm GRP_KeToan_Modify (quyền Modify) và GRP_KeToan_ReadOnly (quyền Read & Execute).",
        "5. Mở tab 'Effective Access' kiểm tra thử quyền của 1 user, và nhớ nhắc user Logoff/Logon lại để cập nhật vé Kerberos Token mới!"
      ]
    },
    10: {
      stage: "Tầng 5 — Tự động hóa Quản trị Hàng loạt bằng Group Policy (GPO)",
      upstream: {
        title: "Bắt buộc phải có Cây OU (Bài 07), AD DNS chuẩn (Bài 08) và Security Group / File Share (Bài 09)",
        detail: "GPO không thể tự chạy nếu máy trạm chưa Join Domain (Bài 08) hoặc nếu cậu vẫn vứt tất cả User/Computer trong thư mục mặc định 'CN=Users / CN=Computers' mà chưa chuyển vào OU (Bài 07)!",
        linkedLessons: [7, 8, 9]
      },
      downstream: {
        title: "Tự động áp đặt bảo mật (chặn USB, khóa máy) và tiện ích (Map ổ mạng, cài máy in) xuống hàng trăm máy",
        detail: "Giúp cậu quản trị 200 máy chỉ từ 1 màn hình GPMC trên Server thay vì chạy đi từng bàn nhân viên.",
        linkedLessons: [11, 12, 16, 20]
      },
      executionFlow: [
        "1. Kiểm tra lại trong dsa.msc: Đảm bảo đối tượng User đã nằm trong OU=Users và đối tượng Máy tính đã nằm trong OU=Computers của phòng ban.",
        "2. Mở Group Policy Management (gpmc.msc), tạo GPO mới trong mục 'Group Policy Objects' với tên rõ nghĩa (VD: GPO_Comp_SanXuat_BlockUSB hoặc GPO_User_KeToan_MapDrive).",
        "3. Sửa nội dung GPO: Nếu chỉnh Computer Configuration thì lát nữa phải Link vào OU chứa Computers; nếu chỉnh User Configuration thì Link vào OU chứa Users.",
        "4. Chuột phải vào OU đích ➔ Chọn 'Link an Existing GPO...'.",
        "5. Xuống máy trạm chạy lệnh: gpupdate /force ➔ Kiểm tra nghiệm thu bằng lệnh: gpresult /r (hoặc gpresult /h report.html) xem GPO đã nằm trong mục 'Applied Group Policy Objects' chưa."
      ]
    },
    11: {
      stage: "Tầng Giám sát & Bắt bệnh Dịch vụ Windows Server (Services & Event Viewer)",
      upstream: {
        title: "Giám sát toàn bộ chuỗi dịch vụ AD DS, DNS, Kerberos, SMB, GPO (Bài 07–10)",
        detail: "Khi hệ thống ở Tầng 3, 4, 5 gặp trục trặc (user bị khóa tài khoản liên tục, không đăng nhập được), bài này cung cấp công cụ để tìm ra bằng chứng gốc rễ.",
        linkedLessons: [7, 8, 9, 10]
      },
      downstream: {
        title: "Vũ khí cốt lõi để xử lý sự cố Domain ở Bài 20 và bảo mật ở Bài 16",
        detail: "Biết đọc Event ID 4624, 4625, 4740 giúp cậu tìm ra chính xác máy tính nào đang làm khóa tài khoản của sếp chỉ trong 2 phút.",
        linkedLessons: [12, 16, 20]
      },
      executionFlow: [
        "1. Khi có sự cố Domain: Kiểm tra nhanh trạng thái 6 dịch vụ sống còn trên DC (NTDS, DNS, Netlogon, kdc, LanmanServer, W32Time) và chạy lệnh dcdiag.",
        "2. Khi User báo bị khóa tài khoản (Account Locked Out) hoặc sai mật khẩu: Mở Event Viewer (eventvwr.msc) trên DC ➔ Windows Logs ➔ Security.",
        "3. Bấm 'Filter Current Log' ➔ Nhập Event ID: 4740 (Khóa tài khoản) hoặc 4625 (Đăng nhập thất bại).",
        "4. Đọc dòng 'Caller Computer Name' trong Event 4740 để biết chính xác tên máy tính nào đang gửi mật khẩu cũ gây khóa tài khoản ➔ Đến máy đó xóa Credential Manager / ngắt phiên RDP cũ."
      ]
    },
    12: {
      stage: "Tổng duyệt Thực thi Hạ tầng Windows Server (End-to-End AD/File/GPO Lab)",
      upstream: {
        title: "Ghép nối liền mạch Bài 07, 08, 09, 10, 11 trên nền mạng của Bài 06",
        detail: "Bài Lab này giúp cậu tự tay dựng từ một chiếc Windows Server trắng tinh thành hệ thống Domain + File Server + GPO hoàn chỉnh.",
        linkedLessons: [6, 7, 8, 9, 10, 11]
      },
      downstream: {
        title: "Tạo ra hệ thống Server & Dữ liệu thực tế để Tuần 3 thực hiện Giám sát I/O, RAID, Snapshot & Backup",
        detail: "Khi đã có Server chạy AD và File Share chứa dữ liệu các phòng ban, câu hỏi tiếp theo bắt buộc là: Làm sao để Server không bị đơ (Bài 13) và không bao giờ mất dữ liệu (Bài 14–15)?",
        linkedLessons: [13, 14, 15, 20]
      },
      executionFlow: [
        "1. Bước 1: Đặt IP tĩnh cho Server ➔ Cài AD DS + DNS ➔ Promote thành DC01.corp.local.",
        "2. Bước 2: Chỉnh DHCP DNS về IP DC01 ➔ Join máy trạm PC01 vào Domain.",
        "3. Bước 3: Tạo cây OU (OU=PhongKeToan -> Users & Computers), di chuyển User và PC01 vào đúng OU, tạo Security Group.",
        "4. Bước 4: Tạo thư mục Share ẩn (KeToan$), phân quyền SMB Share + NTFS theo Group.",
        "5. Bước 5: Tạo và Link GPO chặn USB & Map ổ đĩa mạng ➔ Nghiệm thu bằng gpresult /r và Event Viewer."
      ]
    },
    13: {
      stage: "Tầng 6A — Giám sát & Tối ưu Hiệu năng Máy chủ (Disk I/O, RAM, CPU)",
      upstream: {
        title: "Giám sát trực tiếp Windows Server / File Server / Database Server đã dựng ở Tuần 2",
        detail: "Khi nhiều người dùng cùng truy cập File Server (Bài 09), chạy MES Database (Bài 17) hoặc chạy tác vụ Backup (Bài 15), ổ cứng và RAM của Server sẽ chịu tải nặng.",
        linkedLessons: [9, 12]
      },
      downstream: {
        title: "Cơ sở để thiết kế RAID (Bài 14), xếp lịch Backup ngoài giờ (Bài 15) và xử lý sự cố Server đơ (Bài 22)",
        detail: "Hiểu rõ Disk Active Time 100% khác với Dung lượng ổ cứng đầy giúp cậu chọn đúng loại RAID (như RAID 10 cho Database cần IOPS cao) và bắt đúng tiến trình gây nghẽn.",
        linkedLessons: [14, 15, 18, 22]
      },
      executionFlow: [
        "1. Khi người dùng báo Server/MES chậm đơ: Mở Task Manager (Ctrl+Shift+Esc) ➔ Tab Performance xem thông số nào đang chạm đỉnh (CPU, Memory, hay Disk Active Time 100%).",
        "2. Nếu Disk Active Time = 100% hoặc RAM > 90%: Bấm nút 'Open Resource Monitor' (hoặc gõ resmon.exe).",
        "3. Sang tab 'Disk' ➔ Mở bảng 'Disk Activity' và 'Storage': Nhìn cột 'Response Time (ms)' và 'Total (B/sec)' để chỉ đích danh PID và tên file nào đang gây nghẽn (VD: sqlservr.exe, pagefile.sys do thiếu RAM, hay tiến trình Antivirus/Backup chạy sai giờ).",
        "4. Ra quyết định xử lý: Dời lịch Backup/Scan về ban đêm, nâng cấp RAM (nếu nghẽn pagefile.sys), hoặc chuyển sang SSD / RAID 10."
      ]
    },
    14: {
      stage: "Tầng 6B — Thiết kế Lưu trữ Chịu lỗi & Phục hồi Nhanh tại chỗ (NAS, RAID/SHR, Btrfs Snapshot)",
      upstream: {
        title: "Nhận bài toán Hiệu năng IOPS từ Bài 13 và nhu cầu Lưu trữ File Share từ Bài 09",
        detail: "Trước khi đổ dữ liệu của công ty lên NAS Synology hoặc File Server, cậu phải khởi tạo tầng đĩa vật lý (RAID/SHR) và hệ thống file (Btrfs/NTFS).",
        linkedLessons: [9, 13]
      },
      downstream: {
        title: "Làm nền tảng cho Chiến lược Backup 3-2-1 ở Bài 15 và Diễn tập Khôi phục ở Bài 18, 22",
        detail: "RAID/SHR giữ cho NAS không sập khi hỏng 1–2 ổ cứng vật lý; Btrfs Snapshot giúp khôi phục file bị xóa nhầm/mã hóa trong 10 giây; nhưng cả hai vẫn phải kết hợp với Offsite Backup ở Bài 15!",
        linkedLessons: [15, 18, 22]
      },
      executionFlow: [
        "1. Lắp ổ cứng vào NAS Synology / Server ➔ Mở Storage Manager tạo Storage Pool: Chọn SHR (hoặc RAID 5/6 cho File Share chung, RAID 10 cho Database/VM cần IOPS cao).",
        "2. Tạo Volume trên Storage Pool đó và BẮT BUỘC chọn hệ thống file là 'Btrfs' (không chọn ext4 cũ vì ext4 không hỗ trợ Snapshot CoW hiệu quả).",
        "3. Mở ứng dụng 'Snapshot Replication' trên DSM ➔ Thiết lập lịch chụp Snapshot tự động cho các Shared Folder quan trọng (VD: chụp mỗi 1 giờ trong giờ hành chính, giữ lại 7–14 ngày với chính sách Immutable / khóa xóa).",
        "4. Bật tùy chọn 'Make snapshot visible' hoặc tích hợp Windows Previous Versions để nhân viên/IT có thể chuột phải khôi phục file cũ ngay lập tức."
      ]
    },
    15: {
      stage: "Tầng 6C — Khiên Bảo Vệ Cuối Cùng: Chiến lược Backup 3-2-1, RPO & RTO",
      upstream: {
        title: "Nhận dữ liệu từ AD/File Server (Bài 12) và NAS RAID/Snapshot (Bài 14)",
        detail: "Sau khi đã có RAID (chống hỏng ổ) và Snapshot (quay lui nhanh tại chỗ), cậu bắt buộc phải thiết lập lớp bảo vệ thứ 3: Sao lưu độc lập ra ngoài thiết bị chính.",
        linkedLessons: [12, 14]
      },
      downstream: {
        title: "Đảm bảo khả năng sống còn của doanh nghiệp trước Ransomware, cháy nổ hoặc hỏng toàn bộ NAS/Server (Bài 16, 18, 22)",
        detail: "Quyết định trực tiếp việc công ty mất tối đa bao nhiêu giờ dữ liệu (RPO) và mất bao lâu để hoạt động trở lại (RTO).",
        linkedLessons: [16, 18, 22]
      },
      executionFlow: [
        "1. Thống nhất RPO (chấp nhận mất bao lâu dữ liệu?) và RTO (chấp nhận ngừng chạy bao lâu?) cho từng hệ thống (MES/ERP vs File Share).",
        "2. Thiết lập quy tắc 3-2-1 bằng Hyper Backup / Veeam: Bản 1 trên Server/NAS chính ➔ Bản 2 sao lưu sang thiết bị lưu trữ thứ hai (NAS phụ / USB HDD rời) ➔ Bản 3 đẩy lên Cloud hoặc lưu Offsite cách ly mạng.",
        "3. Cấu hình lịch chạy: Full Backup cuối tuần + Incremental Backup hàng đêm kèm bật Multi-versioning (giữ nhiều phiên bản để không bị ghi đè bởi file nhiễm mã độc).",
        "4. BƯỚC BẮT BUỘC HÀNG THÁNG: Thực hiện 'Restore Drill' (diễn tập khôi phục thử 1 thư mục/database ra môi trường test) và ghi nhận thời gian RTO thực tế."
      ]
    },
    16: {
      stage: "Tầng Bảo mật Thiết bị đầu cuối & Phản ứng Sự cố Mã độc (Endpoint & Incident Response)",
      upstream: {
        title: "Kết nối kiến thức Firewall/VLAN (Bài 02–03), GPO/Event Log (Bài 10–11) và Snapshot/Backup (Bài 14–15)",
        detail: "Khi 1 máy trạm bị nhiễm Malware/Ransomware, nó sẽ tìm cách lây lan qua mạng LAN (Layer 2/3) vào cổng SMB 445 của File Server/NAS!",
        linkedLessons: [3, 10, 11, 14, 15]
      },
      downstream: {
        title: "Quy trình chuẩn để xử lý khủng hoảng ở Bài 18 và Bài 22 mà không làm lây nhiễm lại",
        detail: "Nếu cậu vội vàng Restore dữ liệu từ Backup khi chưa cô lập và diệt tận gốc máy trạm nhiễm mã độc, Ransomware sẽ lập tức mã hóa lại toàn bộ dữ liệu vừa khôi phục!",
        linkedLessons: [18, 22]
      },
      executionFlow: [
        "1. Bước 1 — Cô lập tức thì (Containment): Rút ngay dây mạng LAN / Tắt Wi-Fi của máy nghi nhiễm; đồng thời trên File Server/NAS đóng ngay phiên kết nối SMB (Close-SmbSession) và khóa tạm thời User AD đó.",
        "2. Bước 2 — Đánh giá phạm vi (Scope Assessment): Kiểm tra trên File Server/NAS xem những thư mục nào bị ảnh hưởng và có máy trạm nào khác cùng VLAN bị lây ngang (Lateral Movement) không.",
        "3. Bước 3 — Khôi phục dữ liệu sạch: Sau khi đã ngắt hết nguồn lây, dùng Btrfs Snapshot (Bài 14) hoặc bản Backup 3-2-1 sạch (Bài 15) để khôi phục lại thư mục trên Server.",
        "4. Bước 4 — Làm sạch & Nghiệm thu trước khi hòa mạng: Cài lại Windows sạch (Wipe & Reload) cho máy nhiễm, cập nhật bản vá, bật Antivirus/EDR, đổi mật khẩu AD rồi mới cắm lại dây mạng."
      ]
    },
    17: {
      stage: "Tầng 7A — Vận hành Hệ thống Sản xuất Trọng yếu: MES, ERP & Máy in Công nghiệp",
      upstream: {
        title: "Chạy trên nền VLAN/Routing (Bài 02–03), DHCP Reservation/DNS (Bài 04) và Hiệu năng Database Server (Bài 13)",
        detail: "Hệ thống MES/ERP và dàn máy in tem nhãn Zebra dưới xưởng sản xuất phụ thuộc trực tiếp vào độ ổn định của mạng LAN/Wi-Fi, IP tĩnh và tốc độ IOPS của Database Server.",
        linkedLessons: [2, 3, 4, 13]
      },
      downstream: {
        title: "Trực tiếp giải quyết các ca cấp cứu dây chuyền sản xuất ở Bài 23 và ghi điểm thực chiến ở Bài 24",
        detail: "Biến kinh nghiệm thực tế tại nhà máy của cậu thành quy trình chuẩn kiến trúc 3-Tier (Client ➔ App Server ➔ Database).",
        linkedLessons: [23, 24]
      },
      executionFlow: [
        "1. Với toàn bộ máy in mạng & máy in tem Zebra: Luôn cấu hình kết nối qua Standard TCP/IP Port (RAW Port 9100), BẮT BUỘC đặt IP tĩnh hoặc gắn DHCP Reservation trên MikroTik, và bỏ tích 'SNMP Status Enabled' trong cấu hình Port để tránh báo Offline giả.",
        "2. Khi máy in Zebra bị lệch tem hoặc nhảy bỏ tem trắng: Thực hiện Media Calibration (hiệu chỉnh cảm biến giấy Gap/Black Mark) và kiểm tra đúng khổ giấy trong Printing Defaults.",
        "3. Khi trạm MES/ERP dưới xưởng báo lỗi kết nối: Khoanh vùng theo 3 tầng: (a) Ping IP App Server (tầng mạng) ➔ (b) Kiểm tra dịch vụ IIS/App trên App Server ➔ (c) Kiểm tra Disk I/O và Database Locking trên DB Server (resmon)."
      ]
    },
    18: {
      stage: "Tổng duyệt Thực thi Lưu trữ, Hiệu năng & Cứu hộ Dữ liệu (Storage & Recovery Lab)",
      upstream: {
        title: "Hội tụ thực hành của Bài 13 (resmon I/O), Bài 14 (Snapshot), Bài 15 (Restore) và Bài 16 (Ransomware Response)",
        detail: "Bài Lab này rèn luyện phản xạ tay chân khi Server bị treo đơ 100% Disk hoặc khi dữ liệu bị xóa/mã hóa.",
        linkedLessons: [13, 14, 15, 16]
      },
      downstream: {
        title: "Chuẩn bị sẵn sàng cho tuần thực chiến xử lý sự cố tổng hợp (Tuần 4: Bài 19–24)",
        detail: "Giúp cậu tự tin trả lời nhà tuyển dụng bằng trải nghiệm đã tự tay test Restore và bắt PID ngốn I/O thực tế.",
        linkedLessons: [22, 24]
      },
      executionFlow: [
        "1. Thực hành 1 (Bắt bệnh I/O): Tạo tải đọc/ghi đĩa ➔ Mở resmon.exe ➔ Tab Disk ➔ Xác định đúng PID và đường dẫn file đang chiếm Response Time cao nhất.",
        "2. Thực hành 2 (Snapshot / Shadow Copy): Bật Volume Shadow Copies trên ổ đĩa File Share ➔ Tạo bản chụp ➔ Giả lập xóa/sửa hỏng file ➔ Khôi phục lại phiên bản cũ trong 30 giây.",
        "3. Thực hành 3 (Phản ứng Ransomware): Chạy lệnh Get-SmbSession / Get-SmbOpenFile phát hiện máy trạm đang sửa hàng loạt file ➔ Ngắt phiên SMB ngay lập tức ➔ Khôi phục dữ liệu từ bản chụp sạch."
      ]
    },
    19: {
      stage: "Chẩn đoán Liên thông #1: Sự cố DHCP + VLAN + Switch + Wi-Fi (APIPA 169.254.x.x)",
      upstream: {
        title: "Kết nối trực tiếp Bài 01 (IP), Bài 02 (VLAN/PVID/Trunk) và Bài 04 (DHCP DORA)",
        detail: "Khi máy trạm nhận IP 169.254.x.x, nguyên nhân nằm ở sự đứt gãy trên đường đi Layer 2 từ Client -> AP -> Switch -> Router DHCP Server.",
        linkedLessons: [1, 2, 4, 6]
      },
      downstream: {
        title: "Hình thành phản xạ Chẩn đoán bằng Bằng chứng (4 bước) cho Bài 24 (Mock Interview)",
        detail: "Thay vì khởi động lại bừa bãi, cậu nhìn phạm vi ảnh hưởng và Log DHCP để chỉ ra chính xác lỗi ở đâu trong 2 phút.",
        linkedLessons: [24]
      },
      executionFlow: [
        "1. Bước 1 (Khoanh vùng Scope): Hỏi ngay 1 máy bị, 1 cục Wi-Fi AP bị, hay cả VLAN bị?",
        "2. Bước 2 (Xem bằng chứng trên MikroTik): Mở /log print where topics~\"dhcp\" và /ip dhcp-server lease print.",
        "3. Bước 3 (Bắt đúng bệnh từ Log): Nếu Log báo 'pool is empty' ➔ Cạn IP Pool. Nếu Log hoàn toàn IM LẶNG không thấy gói Discover ➔ Sai VLAN Tagging / PVID trên cổng Switch nối vào AP hoặc đứt cáp L2. Nếu Log báo 'offering lease without success' ➔ Bị chặn bởi DHCP Snooping hoặc trùng IP.",
        "4. Bước 4 (Sửa & Nghiệm thu): Sửa đúng chỗ hỏng ➔ Chạy ipconfig /renew trên máy trạm ➔ Kiểm tra ping thông Gateway."
      ]
    },
    20: {
      stage: "Chẩn đoán Liên thông #2: Sự cố Domain, AD DNS & GPO (1 User lỗi vs Cả văn phòng lỗi)",
      upstream: {
        title: "Kết nối trực tiếp Bài 07 (AD/OU), Bài 08 (DNS SRV & Kerberos), Bài 10 (GPO) và Bài 11 (Event Viewer)",
        detail: "Mọi sự cố đăng nhập Domain hoặc không nhận GPO đều quay về 3 trụ cột: DNS SRV, Thời gian Kerberos (<5 phút), và Vị trí OU / Quyền GPO.",
        linkedLessons: [7, 8, 10, 11, 12]
      },
      downstream: {
        title: "Chuẩn hóa tư duy phân tách lỗi User Object vs Computer Object khi phỏng vấn Bài 24",
        detail: "Giúp cậu không bao giờ làm thao tác thừa như Rejoin Domain khi lỗi thực chất chỉ là tài khoản User bị khóa (Event 4740).",
        linkedLessons: [24]
      },
      executionFlow: [
        "1. Bước 1 (Phép thử chéo): Lấy User A sang máy khác đăng nhập thử, và lấy User B đăng nhập vào máy đang lỗi để tách bạch lỗi do Tài khoản User hay do Máy tính.",
        "2. Bước 2A (Nếu lỗi tại User): Kiểm tra trạng thái Locked Out trên AD hoặc xem Event ID 4740/4625 trên DC.",
        "3. Bước 2B (Nếu lỗi tại Máy tính / Cả phòng): Kiểm tra ipconfig /all xem có bị chêm DNS 8.8.8.8 không ➔ Test nslookup -type=srv _ldap._tcp.dc._msdcs.<domain> ➔ Kiểm tra lệch giờ w32tm ➔ Sửa kênh bảo mật bằng Test-ComputerSecureChannel -Repair.",
        "4. Bước 3 (Nếu lỗi GPO không áp dụng): Chạy gpresult /r xem máy/user đang nằm ở OU nào, GPO có bị lọc bởi Security Filtering hay đặt nhầm nhánh User/Computer Configuration không."
      ]
    },
    21: {
      stage: "Chẩn đoán Liên thông #3: Sự cố VPN Connected nhưng không vào được File Share SMB",
      upstream: {
        title: "Kết nối xuyên suốt Bài 03 (Routing/Firewall), Bài 05 (VPN), Bài 08 (DNS) và Bài 09 (SMB/NTFS)",
        detail: "Đây là bài kiểm tra tổng hợp nhất vì gói tin từ máy VPN phải đi qua đủ 6 trạm kiểm soát từ mạng đến hệ điều hành.",
        linkedLessons: [3, 5, 8, 9]
      },
      downstream: {
        title: "Xử lý gọn gàng một trong những câu hỏi tình huống hay gặp nhất ở Bài 24",
        detail: "Chứng minh cậu nắm vững mô hình OSI từ Layer 3 (Route) -> Layer 4 (Port 445/Firewall) -> Layer 7 (DNS/SMB/NTFS).",
        linkedLessons: [24]
      },
      executionFlow: [
        "1. Bước 1 (Tách lỗi DNS và Mạng trong 5 giây): Gõ trực tiếp bằng IP \\\\192.168.10.50\\Share. Nếu bằng IP vào được mà bằng tên \\\\FILESERVER\\Share lỗi ➔ Chắc chắn 100% lỗi DNS trên VPN Profile!",
        "2. Bước 2 (Kiểm tra Route & Port 445): Nếu gõ bằng IP cũng không vào được, mở PowerShell chạy: Test-NetConnection 192.168.10.50 -Port 445.",
        "3. Bước 3 (Nếu Ping & Port 445 đều Fail): Kiểm tra route print trên máy trạm (xem Split Tunnel có đẩy route mạng LAN về không, có trùng dải IP Wi-Fi quán cafe không) và kiểm tra Firewall chain=forward trên MikroTik.",
        "4. Bước 4 (Nếu Ping thông nhưng Port 445 Fail): Mở Windows Defender Firewall trên File Server ➔ Rule 'File and Printer Sharing (SMB-In)' ➔ Tab Scope ➔ Thêm dải IP VPN vào Remote IP Address.",
        "5. Bước 5 (Nếu Port 445 True nhưng báo Access Denied): Kiểm tra tài khoản đăng nhập (Credential Manager) và quyền giao thoa SMB Share ∩ NTFS."
      ]
    },
    22: {
      stage: "Chẩn đoán Liên thông #4: Sự cố Disk I/O, NAS RAID Degraded & Malware (Ưu tiên theo Business Impact)",
      upstream: {
        title: "Kết nối Bài 13 (Disk I/O), Bài 14 (RAID/Snapshot), Bài 15 (Backup) và Bài 16 (Incident Response)",
        detail: "Khi nhiều sự cố hệ thống xảy ra, người Admin giỏi phân biệt được việc gì phải Cắt mạng ngay lập tức (Ransomware) và việc gì phải Giữ cho chạy hết ca sản xuất (RAID Degraded).",
        linkedLessons: [13, 14, 15, 16, 18]
      },
      downstream: {
        title: "Đảm bảo tiêu chuẩn 'Không mắc lỗi nghiêm trọng về an toàn vận hành' ở Bài 24",
        detail: "Tránh tuyệt đối các hành động tự sát như rút nhầm ổ cứng đang sống trong mảng RAID Degraded hoặc rút điện NAS khi đang Rebuild.",
        linkedLessons: [24]
      },
      executionFlow: [
        "1. Với dấu hiệu Ransomware (đổi đuôi file hàng loạt): ƯU TIÊN SỐ 1 LÀ CÔ LẬP NGAY TRONG 30 GIÂY (Đóng SMB Session trên Server, ngắt mạng máy nguồn lây). Tuyệt đối không chờ hết ca!",
        "2. Với cảnh báo NAS RAID 5 / SHR Degraded (hỏng 1 ổ cứng): Hệ thống vẫn đang chạy bình thường nhờ ổ Parity ➔ KHÔNG tắt NAS, KHÔNG rút ổ ngay trong giờ cao điểm!",
        "3. Quy trình chuẩn xử lý RAID Degraded: (a) Kiểm tra bản Backup 3-2-1 mới nhất đã an toàn chưa ➔ (b) Ghi chính xác Serial Number của ổ bị lỗi trong Storage Manager ➔ (c) Chờ ngoài giờ cao điểm, đối chiếu đúng Serial Number để thay ổ mới ➔ (d) Bấm Repair/Rebuild."
      ]
    },
    23: {
      stage: "Chẩn đoán Liên thông #5: Sự cố Đứt cáp WAN, Treo trạm MES & Kẹt máy in dây chuyền xuất hàng",
      upstream: {
        title: "Kết nối Bài 01–03 (WAN/NAT/Routing) và Bài 17 (MES/ERP/Printer Operations)",
        detail: "Trong môi trường nhà máy sản xuất, mỗi phút ngừng dây chuyền đóng gói hay xuất kho là thiệt hại tiền tươi thóc thật. Cần có phương án thay thế tạm thời (Workaround) ngay lập tức!",
        linkedLessons: [1, 3, 17]
      },
      downstream: {
        title: "Thể hiện tư duy hướng nghiệp vụ (Business Continuity) trong phỏng vấn Bài 24",
        detail: "Nhà tuyển dụng cực kỳ thích ứng viên biết cứu dây chuyền chạy tiếp trong 5 phút bằng Workaround trước khi ngồi sửa lỗi gốc rễ.",
        linkedLessons: [24]
      },
      executionFlow: [
        "1. Khi mất mạng toàn công ty: Gõ 3 lệnh trong 30 giây (ping Gateway ➔ ping 8.8.8.8 ➔ nslookup google.com) để biết lỗi tại LAN, đứt WAN ISP, hay chỉ chết DNS.",
        "2. Nếu đứt WAN chính: Chuyển sang đường WAN dự phòng (hoặc cắm 4G Router dự phòng vào cổng WAN2 trên MikroTik) để duy trì kết nối ERP/Hải quan/Email.",
        "3. Khi máy in tem Zebra ở chuyền đóng gói bị hỏng phần cứng lúc đang xuất hàng gấp: Áp dụng ngay Workaround 'Printer Port Redirection' — vào Printer Properties trên máy tính trạm in, đổi Standard TCP/IP Port trỏ sang IP của máy in dự phòng bên cạnh để công nhân in tiếp ngay lập tức trong 2 phút, sau đó mới mang máy in hỏng đi sửa!"
      ]
    },
    24: {
      stage: "Đích đến Cuối cùng: Tổng duyệt Mock Interview 2.0 (12 Câu hỏi Lý thuyết + Thực chiến + Phản biện)",
      upstream: {
        title: "Tổng hợp toàn bộ chuỗi kiến thức từ Bài 01 đến Bài 23",
        detail: "12 câu hỏi trong bài này quét qua đầy đủ các mảng P0, P1, P2 để kiểm tra xem cậu đã thực sự kết nối được các thành phần thành một hệ thống thống nhất chưa.",
        linkedLessons: [1, 2, 3, 4, 5, 7, 8, 9, 10, 13, 14, 15, 19, 20, 21, 22, 23]
      },
      downstream: {
        title: "Đạt chuẩn đầu ra 5/5 — Tự tin ứng tuyển vị trí System & Network Administrator",
        detail: "Khi trả lời trôi chảy 12 câu hỏi này với điểm AI Audit >= 8/10 và không phạm 5 lỗi cấm kỵ (Red Flags), cậu đã sẵn sàng 100%.",
        linkedLessons: []
      },
      executionFlow: [
        "1. Luôn trả lời theo công thức 4 bước: (1) Định nghĩa/Kết luận ngắn gọn ➔ (2) Nguyên lý hoạt động bên dưới ➔ (3) Lệnh kiểm tra bằng chứng ➔ (4) Cách xử lý an toàn & Kiểm tra lại.",
        "2. Tuyệt đối tránh 5 'Điểm liệt' (Fatal Red Flags): Không tắt Firewall bừa bãi; Không gán Everyone Full Control ở cả Share và NTFS; Không sửa NAT khi lỗi giữa 2 VLAN nội bộ; Không coi RAID là Backup; Không thao tác rủi ro trên hệ thống Production trong giờ cao điểm mà thiếu Backup."
      ]
    }
  },

  // 2. BẢN ĐỒ XÂY DỰNG HỆ THỐNG TỪ CON SỐ 0 (7 TẦNG THỰC THI A -> Z)
  masterStages: [
    {
      stageNumber: 1,
      title: "Tầng 1: Quy hoạch Địa chỉ IP & Phân chia VLAN (Làm trên giấy trước khi bật máy)",
      badge: "Bài 01 & Bài 02",
      lessonIds: [1, 2],
      whyOrderMatters: "Nếu cậu không chốt dải IP và VLAN trước tiên, xuống Tầng 2 cậu sẽ không biết đặt IP gì cho Router, không biết chừa khoảng IP nào cho Server/Máy in, dẫn đến cảnh vừa làm vừa đập đi sửa lại!",
      inputFromPrev: "Yêu cầu thực tế của công ty (VD: 1 phòng Server, 1 khu Văn phòng, 1 khu Xưởng sản xuất MES/Printer, 1 hệ thống Wi-Fi).",
      outputToNext: "Bảng Quy hoạch Chuẩn: VLAN 10 (Server: 192.168.10.0/24, GW .10.1), VLAN 20 (Văn phòng: 192.168.20.0/24, GW .20.1), VLAN 30 (Sản xuất: 192.168.30.0/24, GW .30.1). Quy ước: IP từ .1 đến .50 dành riêng cho thiết bị tĩnh (Router, Server, NAS, Switch, Printer); từ .51 đến .250 cấp qua DHCP.",
      stepByStepRunbook: `# BẢNG QUY HOẠCH MẪU TRƯỚC KHI BẮT TAY VÀO CẤU HÌNH:
VLAN 10 (Server & IT)   : 192.168.10.0/24 | Gateway: 192.168.10.1 | DC01: 192.168.10.2 | NAS: 192.168.10.10
VLAN 20 (Office Staff)  : 192.168.20.0/24 | Gateway: 192.168.20.1 | DHCP Pool: 192.168.20.51 - 192.168.20.250
VLAN 30 (Factory & MES) : 192.168.30.0/24 | Gateway: 192.168.30.1 | Máy in Zebra: .30.21 -> .30.40 | DHCP: .30.51 - .30.250`,
      gateCheck: "Đã có bảng phân hoạch IP, Subnet Mask (/24), Gateway (.1) và danh sách cổng Switch nào là Trunk (Tagged), cổng nào là Access (Untagged)."
    },
    {
      stageNumber: 2,
      title: "Tầng 2: Dựng Khung xương Mạng trên MikroTik & Switch (Layer 2 ➔ Layer 3 ➔ DHCP ➔ NAT ➔ Firewall)",
      badge: "Bài 02, 03, 04, 06",
      lessonIds: [2, 3, 4, 6],
      whyOrderMatters: "Trong bản thân con Router MikroTik cũng có thứ tự bắt buộc: Phải tạo Bridge & VLAN (Layer 2) trước ➔ Rồi mới gắn IP Gateway (Layer 3) lên các VLAN đó được ➔ Có IP Gateway rồi mới chạy được DHCP Server ➔ Cuối cùng mới bật SRCNAT ra WAN và khóa Firewall!",
      inputFromPrev: "Bảng quy hoạch VLAN ID (10, 20, 30) và dải IP từ Tầng 1.",
      outputToNext: "Mạng LAN các VLAN đã cấp phát được IP tự động, đi ra được Internet, và định tuyến (Route) nhìn thấy VLAN 10 để sẵn sàng đón Windows Server ở Tầng 3.",
      stepByStepRunbook: `# 1. Tạo Bridge & Khai báo VLAN Interface (Layer 2)
/interface bridge add name=BR-LAN vlan-filtering=no
/interface vlan add interface=BR-LAN name=vlan10-server vlan-id=10
/interface vlan add interface=BR-LAN name=vlan20-office vlan-id=20
/interface vlan add interface=BR-LAN name=vlan30-factory vlan-id=30

# 2. Gắn IP làm Default Gateway cho từng VLAN (Layer 3 Routing tự động thông!)
/ip address add address=192.168.10.1/24 interface=vlan10-server
/ip address add address=192.168.20.1/24 interface=vlan20-office
/ip address add address=192.168.30.1/24 interface=vlan30-factory

# 3. Tạo DHCP Server cho từng VLAN (Tạm để DNS là 192.168.10.2 - IP dự kiến của DC01 và 8.8.8.8 lúc đầu)
/ip pool add name=pool-vlan20 ranges=192.168.20.51-192.168.20.250
/ip pool add name=pool-vlan30 ranges=192.168.30.51-192.168.30.250

# 4. Bật SRCNAT (Masquerade) CHỈ cho cổng WAN để ra Internet
/ip firewall nat add chain=srcnat out-interface=ether1-WAN action=masquerade

# 5. Khai báo bảng Bridge VLANs (Nhớ đưa BR-LAN vào tagged!) rồi bật vlan-filtering=yes`,
      gateCheck: "Cắm laptop vào cổng Access VLAN 20 và VLAN 30: Nhận đúng IP .20.x và .30.x, ping thông Gateway (.20.1, .30.1), ping thông sang 192.168.10.1 và ra được Internet (8.8.8.8)."
    },
    {
      stageNumber: 3,
      title: "Tầng 3: Dựng Trái Tim Định Danh (Windows Server AD DS) & Bàn giao DNS",
      badge: "Bài 07 & Bài 08",
      lessonIds: [7, 8],
      whyOrderMatters: "Tại sao phải dựng AD DS + DNS trước khi tạo File Share hay GPO? Vì không có Domain Controller và không sửa DHCP DNS trỏ về DC, máy trạm sẽ không thể tìm thấy bản ghi SRV để Join Domain! Đây chính là chỗ 90% người mới tự làm bị kẹt.",
      inputFromPrev: "Cổng mạng thuộc VLAN 10 (192.168.10.0/24) từ Tầng 2.",
      outputToNext: "Domain Controller (DC01.corp.local - 192.168.10.2) hoạt động, toàn bộ máy trạm trong công ty nhận DNS duy nhất là 192.168.10.2 và Join Domain thành công.",
      stepByStepRunbook: `# BƯỚC A — TRÊN WINDOWS SERVER (DC01):
1. Đặt IP tĩnh: IP = 192.168.10.2 | Mask = 255.255.255.0 | Gateway = 192.168.10.1 | Preferred DNS = 127.0.0.1
2. Cài Role: Active Directory Domain Services + DNS Server ➔ Promote thành Domain Controller (corp.local).
3. Mở DNS Manager (dnsmgmt.msc) ➔ Chuột phải vào DC01 ➔ Properties ➔ Tab Forwarders ➔ Thêm 8.8.8.8 và 1.1.1.1.

# BƯỚC B — MẮT XÍCH QUYẾT ĐỊNH TRÊN MIKROTIK (BÀN GIAO DNS):
# Quay lại MikroTik DHCP Networks, sửa DNS cấp cho mọi VLAN trỏ DUY NHẤT về IP của DC01 (192.168.10.2):
/ip dhcp-server network set [find] dns-server=192.168.10.2

# BƯỚC C — TRÊN MÁY TRẠM (CLIENT):
ipconfig /renew
nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local   # Phải trả về dc01.corp.local (192.168.10.2)`,
      gateCheck: "Trên máy trạm ở VLAN 20 hoặc VLAN 30, gõ nslookup corp.local trả về 192.168.10.2, vừa ping được google.com (nhờ DNS Forwarder trên DC), vừa bấm Join Domain corp.local thành công ngay phát đầu tiên!"
    },
    {
      stageNumber: 4,
      title: "Tầng 4: Quy hoạch Tổ chức (Cây OU, Security Group) & Xây dựng File Server (SMB + NTFS)",
      badge: "Bài 07 & Bài 09",
      lessonIds: [7, 9],
      whyOrderMatters: "Phải tạo cây OU và Security Group TRƯỚC KHI phân quyền File Server và làm GPO! Vì nguyên tắc vàng là: Không bao giờ gán quyền NTFS lẻ tẻ cho từng User (mà phải gán cho Security Group), và không thể gắn GPO vào thùng 'CN=Users / CN=Computers' mặc định (mà phải di chuyển User/Computer vào OU trước)!",
      inputFromPrev: "Domain Controller đã chạy và các máy trạm đã Join Domain từ Tầng 3.",
      outputToNext: "Cây OU gọn gàng theo phòng ban, hệ thống thư mục dùng chung (\\\\FileServer\\Share) đã phân quyền chặt chẽ theo nguyên tắc AGDLP.",
      stepByStepRunbook: `# 1. Tạo Cây OU trong Active Directory Users and Computers (dsa.msc):
corp.local
 └── OU=_CORP
      ├── OU=PhongKeToan
      │    ├── OU=Users       (Chứa tài khoản nhân viên Kế toán)
      │    ├── OU=Computers   (Di chuyển các máy tính PC Kế toán vừa Join Domain vào đây!)
      │    └── OU=Groups      (Chứa GRP_KeToan_Modify, GRP_KeToan_ReadOnly)
      └── OU=XuongSanXuat
           ├── OU=Users
           ├── OU=Computers
           └── OU=Groups

# 2. Thiết lập File Share chuẩn (Kết hợp SMB Share + NTFS):
- Tạo thư mục E:\\Data\\KeToan
- Tab Sharing (Cổng ngoài): Cấp cho "Authenticated Users = Change" (Không dùng Everyone Full Control!)
- Tab Security / NTFS (Khóa trong):
  + Bấm Advanced ➔ Disable Inheritance (nếu cần chặn các phòng khác xem)
  + Giữ lại SYSTEM, Administrators (Full Control)
  + Thêm GRP_KeToan_Modify -> Quyền Modify
  + Thêm GRP_KeToan_ReadOnly -> Quyền Read & Execute`,
      gateCheck: "Đăng nhập vào máy trạm bằng tài khoản nhân viên Kế toán, gõ \\\\192.168.10.2\\KeToan mở và tạo file thành công; lấy tài khoản Xưởng Sản Xuất truy cập thử thấy báo Access Denied đúng thiết kế."
    },
    {
      stageNumber: 5,
      title: "Tầng 5: Tự động hóa Quản trị bằng Group Policy (GPO)",
      badge: "Bài 10, 11, 12",
      lessonIds: [10, 11, 12],
      whyOrderMatters: "Tại sao làm GPO ở Tầng 5 mà không làm ở Tầng 3? Vì phải có Cây OU (Tầng 4) thì mới có chỗ để Link GPO, và phải có sẵn đường dẫn File Share + Security Group (Tầng 4) thì mới cấu hình được GPO tự động Map ổ đĩa mạng!",
      inputFromPrev: "Cây OU đã chứa đúng User & Computer, cùng đường dẫn File Share từ Tầng 4.",
      outputToNext: "Mọi máy trạm khi khởi động và đăng nhập đều tự động nhận ổ đĩa mạng, tự động bị khóa USB (dưới xưởng) và tuân thủ chính sách bảo mật mà IT không cần đụng tay vào từng máy.",
      stepByStepRunbook: `# 1. Mở Group Policy Management (gpmc.msc) trên DC01:
- Tạo GPO 1: "GPO_User_KeToan_MapDrive"
  + Sửa nhánh: User Configuration -> Preferences -> Windows Settings -> Drive Maps
  + Tạo ổ Z: trỏ vào \\\\DC01\\KeToan ➔ Link GPO này vào: OU=Users (bên trong OU=PhongKeToan)

- Tạo GPO 2: "GPO_Comp_SanXuat_BlockUSB"
  + Sửa nhánh: Computer Configuration -> Policies -> Administrative Templates -> System -> Removable Storage Access -> All Removable Storage classes: Deny all access = Enabled
  + Link GPO này vào: OU=Computers (bên trong OU=XuongSanXuat)

# 2. Kiểm tra trên máy trạm:
gpupdate /force
gpresult /r`,
      gateCheck: "Chạy gpresult /r trên máy trạm thấy tên GPO xuất hiện trong 'Applied Group Policy Objects'; nhân viên Kế toán đăng nhập thấy ổ Z: tự động hiện ra trong This PC."
    },
    {
      stageNumber: 6,
      title: "Tầng 6: Thiết lập Khiên Bảo vệ Dữ liệu 3 Lớp (RAID/SHR ➔ Btrfs Snapshot ➔ Backup 3-2-1)",
      badge: "Bài 13, 14, 15, 18",
      lessonIds: [13, 14, 15, 18],
      whyOrderMatters: "Khi người dùng đã bắt đầu lưu dữ liệu công việc lên Server/NAS (từ Tầng 4 & 5), nếu cậu không khóa ngay 3 lớp bảo vệ Lưu trữ này, chỉ cần 1 ổ cứng cơ học chết hoặc 1 nhân viên mở file đính kèm Ransomware là công sức xây dựng mất trắng!",
      inputFromPrev: "Các thư mục dữ liệu chung trên File Server / NAS Synology và Database hệ thống.",
      outputToNext: "Hệ thống lưu trữ chịu được lỗi chết ổ cứng vật lý (nhờ RAID/SHR), khôi phục được file xóa nhầm/mã hóa trong 30 giây (nhờ Snapshot), và chống được thảm họa hỏng cả NAS (nhờ Backup 3-2-1).",
      stepByStepRunbook: `# LỚP 1 — CHỐNG HỎNG Ổ CỨNG VẬT LÝ (TRÊN NAS SYNOLOGY / SERVER):
- Khởi tạo Storage Pool với Synology SHR hoặc RAID 5/6/10.
- Định dạng Volume bằng hệ thống file Btrfs.

# LỚP 2 — QUAY NGƯỢC THỜI GIAN TỨC THÌ TẠI CHỖ (SNAPSHOT / SHADOW COPY):
- Trên Synology: Mở Snapshot Replication ➔ Lập lịch chụp mỗi 1 giờ cho các Shared Folder, giữ 14 ngày (bật Immutable).
- Trên Windows File Server: Chuột phải vào ổ đĩa D:/E: ➔ Configure Shadow Copies ➔ Enable (lịch 7:00, 12:00, 17:00).

# LỚP 3 — SAO LƯU ĐỘC LẬP THEO QUY TẮC 3-2-1 (HYPER BACKUP / VEEAM):
- Tạo tác vụ Backup hàng đêm (01:00 AM) đẩy dữ liệu từ Server/NAS chính sang 1 thiết bị lưu trữ độc lập thứ 2 (NAS phụ / Ổ cứng rời / Cloud) có bật Versioning.
- Thực hiện Test Restore thử 1 file ngay sau khi cấu hình xong!`,
      gateCheck: "Xóa thử 1 file test trong thư mục Share, bấm chuột phải chọn 'Previous Versions' (hoặc vào thư mục #snapshot) khôi phục lại file đó thành công trong vòng 30 giây!"
    },
    {
      stageNumber: 7,
      title: "Tầng 7: Đưa Nghiệp vụ Sản xuất (MES/ERP/Printer) & Kết nối Từ xa (VPN) vào Vận hành",
      badge: "Bài 05, 17, 21, 23",
      lessonIds: [5, 17, 21, 23],
      whyOrderMatters: "Đây là tầng hoàn thiện cuối cùng: Cố định IP cho toàn bộ thiết bị ngoại vi sản xuất (để không bao giờ nhảy IP sau khi cúp điện) và mở đường hầm VPN xuyên qua các lớp Firewall/SMB đã dựng ở Tầng 2 & Tầng 4.",
      inputFromPrev: "Toàn bộ hạ tầng Mạng (Tầng 2), AD/DNS (Tầng 3), File Server (Tầng 4) đã vận hành ổn định.",
      outputToNext: "Hệ thống IT Doanh nghiệp / Nhà máy hoàn chỉnh 100%, sẵn sàng vận hành bền bỉ và dễ dàng khoanh vùng khi có sự cố!",
      stepByStepRunbook: `# 1. Khóa cứng IP (DHCP Reservation) cho toàn bộ Máy in mạng / Máy in tem Zebra / Máy chấm công:
- Trên MikroTik: /ip dhcp-server lease make-static [find mac-address="AA:BB:CC:DD:EE:FF"]
- Trên máy trạm in: Cài driver qua Standard TCP/IP Port (RAW 9100), bỏ tích "SNMP Status Enabled".

# 2. Mở VPN truy cập từ xa vào mạng nội bộ:
- Cấu hình VPN trên MikroTik cấp dải 10.10.10.0/24.
- Đảm bảo Firewall Filter chain=forward trên MikroTik cho phép từ 10.10.10.0/24 vào 192.168.10.0/24 (Server VLAN).
- Trên Windows File Server: Mở Windows Defender Firewall -> Rule "File and Printer Sharing (SMB-In)" -> Tab Scope -> Thêm 10.10.10.0/24 vào Remote IP.`,
      gateCheck: "Bật 4G trên laptop đóng vai người ngoài công ty ➔ Quay VPN báo Connected ➔ Mở \\\\192.168.10.2\\KeToan và truy cập phần mềm nội bộ thông suốt 100%!"
    }
  ]
};
