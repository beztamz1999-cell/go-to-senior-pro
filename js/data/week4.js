window.WEEK4_DATA = [
  // =========================================================================
  // BÀI 19: SỰ CỐ DHCP, VLAN & WI-FI (CHẨN ĐOÁN BẰNG BẰNG CHỨNG)
  // =========================================================================
  {
    id: 19,
    code: "19",
    week: 4,
    title: "Sự cố DHCP, VLAN & Wi-Fi: Chẩn đoán APIPA 169.254.x.x bằng bằng chứng",
    subtitle: "Xóa bỏ thói quen rút dây cắm lại — Khoanh vùng chính xác lỗi do cạn DHCP Pool, sai VLAN Tagging/PVID trên Switch & MikroTik hay bị DHCP Snooping chặn",
    priority: "P0",
    duration: "75 phút",
    whyThisMatters: "Trong buổi phỏng vấn trước, khi được hỏi xử lý thế nào lúc người dùng kết nối Wi-Fi nhưng chấm than vàng (nhận IP 169.254.x.x), ứng viên thường liệt kê cảm tính: 'Em khởi động lại bộ phát Wi-Fi, đặt IP tĩnh xem sao, hoặc khởi động lại router'. Nhà tuyển dụng đánh giá thấp câu trả lời này vì thiếu tư duy hệ thống và dễ làm gián đoạn diện rộng. Bài học này rèn cho bạn phương pháp Chẩn đoán dựa trên bằng chứng (Evidence-based Troubleshooting): nhìn phạm vi lỗi và log trên DHCP Server là biết ngay gói tin DORA đang đứt ở tầng nào.",
    analogy: {
      title: "Gửi thư xin cấp số nhà qua các trạm kiểm soát (Bưu cục VLAN)",
      content: "Hãy tưởng tượng chiếc laptop mới bật Wi-Fi giống như một cư dân mới chuyển đến khu phố, hét to lên: 'Ai là trưởng khu phố cấp cho tôi một số nhà với!' (bản tin DHCP Discover).\n\n1. Nếu tiếng hét của bạn bị dán nhầm nhãn khu phố (sai VLAN Tag/PVID trên cổng Switch nối Access Point), tiếng hét sẽ đi lạc vào một khu đất hoang không có trưởng khu phố nào nghe thấy.\n2. Nếu tiếng hét đến đúng tai trưởng khu phố (Router MikroTik), nhưng sổ cấp số nhà đã hết sạch trang trống (DHCP Pool Exhausted), trưởng khu phố đành lắc đầu từ chối.\n3. Nếu trưởng khu phố đã gửi thư trả lời cấp số nhà (DHCP Offer), nhưng anh bảo vệ cổng làng (Switch bật DHCP Snooping) lại tưởng trưởng khu phố là kẻ giả mạo vì cổng đó chưa được đóng dấu 'Tin cậy' (Untrusted Port), anh bảo vệ sẽ xé luôn bức thư.\n\nKhi chờ mãi không nhận được số nhà hợp lệ, cư dân đành tự bịa ra một cái tên tạm bợ '169.254.x.x' (APIPA) — chỉ nói chuyện được với vài người đứng sát cạnh chứ không thể ra khỏi cổng làng để lên Internet."
    },
    level1_definitions: {
      concepts: [
        {
          term: "APIPA (169.254.0.0/16) — Bằng chứng của sự thất bại DORA",
          shortDef: "Địa chỉ IP tự sinh của hệ điều hành khi DHCP Client gửi bản tin DHCP Discover nhiều lần mà không nhận được DHCP Offer nào.",
          easyExplain: "Khi bạn thấy máy tính mang IP 169.254.x.x với Subnet Mask 255.255.0.0 và không có Default Gateway, đừng vội kết luận 'hỏng card mạng'. Đó là bằng chứng 100% cho thấy tiến trình 4 bước DORA (Discover - Offer - Request - Ack) bị đứt ở ngay bước 1 hoặc bước 2: hoặc gói tin Discover không tới được DHCP Server, hoặc DHCP Server không thể trả lời.",
          realExample: "Nhân viên phòng Kế toán kết nối vào SSID 'Corp-Staff' (VLAN 20) nhưng gõ ipconfig thấy IPv4 Address: 169.254.84.12."
        },
        {
          term: "Quy tắc 4 bước Chẩn đoán bằng bằng chứng (4-Step Evidence Framework)",
          shortDef: "Quy trình chuẩn của System/Network Admin: (1) Khoanh vùng Scope -> (2) Lập giả thuyết -> (3) Kiểm chứng bằng lệnh/log -> (4) Xử lý & Phòng ngừa.",
          easyExplain: "Thay vì sửa mò, người quản trị chuyên nghiệp luôn trả lời câu hỏi 'Bao nhiêu người bị?' trước tiên. 1 người bị khác hoàn toàn với 1 Access Point bị, và càng khác với cả một VLAN bị. Mỗi phạm vi sẽ dẫn thẳng tới một giả thuyết kỹ thuật duy nhất cần kiểm tra.",
          realExample: "Thấy 1 phòng không lấy được IP Wi-Fi trong khi cắm dây mạng LAN cùng phòng vẫn chạy tốt -> Khoanh vùng ngay tại đường Trunk giữa Switch và Access Point (AP), không đụng vào Router tổng."
        },
        {
          term: "DHCP Pool Exhaustion (Cạn kiệt dải IP cấp phát)",
          shortDef: "Tình trạng toàn bộ địa chỉ IP trong dải (Pool) của một VLAN đã ở trạng thái Bound/Active, không còn IP trống cho thiết bị mới.",
          easyExplain: "Thường xảy ra ở mạng Wi-Fi khách (Guest) hoặc văn phòng có nhiều thiết bị di động ra vào liên tục nhưng thời gian giữ IP (Lease Time) lại để quá dài (ví dụ 3 ngày đến 7 ngày). Thiết bị cũ đã rời công ty nhưng IP vẫn bị khóa trong bảng Lease.",
          realExample: "Mạng `/24` có 250 IP trong Pool, Lease Time đặt 7 ngày. Đến chiều thứ Sáu, khách vào họp đông khiến số lượng Lease chạm mốc 250/250, các máy vào sau đều bị APIPA."
        },
        {
          term: "VLAN Tag / PVID Mismatch trên cổng nối Access Point",
          shortDef: "Sự lệch pha giữa cấu hình đóng nhãn VLAN (802.1Q Tagging) trên SSID của Access Point và bảng VLAN trên cổng Switch/Bridge MikroTik.",
          easyExplain: "Một Access Point doanh nghiệp (Unifi, Aruba, Ruijie, MikroTik cAP) thường phát nhiều SSID tương ứng nhiều VLAN. Cổng Switch nối với AP bắt buộc phải là cổng Trunk (hoặc Hybrid): vừa có Native VLAN/PVID cho IP quản trị của AP, vừa phải cho phép (Tagged) các VLAN của người dùng đi qua. Quên Tag VLAN của SSID trên cổng Switch này thì AP vẫn sáng đèn xanh nhưng Client vào SSID đó sẽ bị APIPA.",
          realExample: "Mới lắp thêm AP số 05 ở kho hàng. Cổng Gi0/10 trên Switch chỉ cấu hình `switchport mode access vlan 10` (VLAN quản trị AP) mà quên chuyển sang `mode trunk allowed vlan 10,20,30`. Kết quả: AP báo Online trên Controller, nhưng công nhân bắt Wi-Fi VLAN 20 đều nhận 169.254.x.x."
        },
        {
          term: "DHCP Snooping Untrusted Port Drop",
          shortDef: "Tính năng bảo mật trên Switch chặn mọi gói tin phản hồi DHCP (Offer, ACK) đi vào từ các cổng không được khai báo là Trusted.",
          easyExplain: "DHCP Snooping sinh ra để chống kẻ gian cắm cục phát Wi-Fi giả mạo cấp IP sai cho mạng công ty. Khi bật tính năng này, mặc định TẤT CẢ các cổng Switch đều là Untrusted. Nếu bạn quên cấu hình `ip dhcp snooping trust` trên cổng Uplink nối lên Router MikroTik (hoặc Core Switch), Switch sẽ chặn đứng gói tin DHCP Offer từ Router trả về cho Client.",
          realExample: "Trên Router MikroTik thấy log báo: `dhcp1 offering lease 192.168.20.55 for MAC AA:BB:CC... without success` lặp đi lặp lại. Nguyên nhân là gói Offer rời khỏi MikroTik nhưng bị Switch tầng 2 hủy bỏ vì cổng Uplink đang là Untrusted."
        }
      ],
      comparisonTable: {
        title: "Ma trận Khoanh vùng & Phân biệt 4 nguyên nhân gây lỗi APIPA (169.254.x.x)",
        headers: ["Tiêu chí bằng chứng", "1. Cạn DHCP Pool", "2. Sai VLAN Tag trên cổng AP", "3. DHCP Snooping chặn", "4. Lỗi Client / Driver / 802.1X"],
        rows: [
          ["Phạm vi ảnh hưởng (Scope)", "Mọi thiết bị MỚI kết nối vào VLAN đó (cả LAN & Wi-Fi). Thiết bị cũ đang có IP vẫn dùng bình thường.", "Chỉ những người kết nối vào 1 SSID cụ thể trên 1 (hoặc vài) Access Point mới lắp/mới sửa.", "Toàn bộ Client nằm dưới Switch vừa bật DHCP Snooping (hoặc sau khi đổi cổng Uplink).", "Chỉ 1 máy trạm duy nhất. Các máy khác ngồi cạnh bắt cùng Wi-Fi vẫn vào mạng tốt."],
          ["Log trên DHCP Server (MikroTik)", "Báo lỗi đỏ: `failed to give out IP address: pool <name> is empty`.", "Hoàn toàn IM LẶNG (không nhận được bất kỳ gói DHCP Discover nào từ MAC của Client).", "Báo cảnh báo: `offering lease 192.168.x.y for MAC ... without success` (gửi Offer nhưng Client không trả lời Request).", "Im lặng hoặc có cấp IP nhưng máy trạm từ chối (DHCP Decline do trùng IP tĩnh)."],
          ["Thử đặt IP tĩnh đúng Subnet", "Vào mạng và Ping Gateway THÀNH CÔNG ngay lập tức.", "Ping Gateway THẤT BẠI (Request timed out) vì đang bị kẹt sai VLAN ở tầng 2.", "Vào mạng và Ping Gateway THÀNH CÔNG (vì Snooping chỉ lọc gói DHCP hoặc kiểm tra bảng Binding).", "Thường vẫn lỗi nếu do sai khóa bảo mật Wi-Fi hoặc kẹt dịch vụ DHCP Client trên Windows."],
          ["Hướng xử lý triệt để", "Giảm Lease Time (ví dụ 2h-8h), xóa Lease rác hoặc mở rộng Subnet/Pool.", "Khai báo Tagged VLAN đầy đủ trên cổng Switch nối AP và cổng Uplink.", "Cấu hình `ip dhcp snooping trust` trên cổng Uplink nối về phía DHCP Server.", "Chạy `netsh int ip reset`, `ipconfig /release & /renew`, kiểm tra dịch vụ DHCP Client."]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Nguyên lý vàng khi xử lý sự cố mạng: <b>'Không bao giờ đoán mò khi chưa nhìn thấy gói tin hoặc Log'</b>. Với sự cố DHCP/VLAN/Wi-Fi, điểm chốt chặn quan trọng nhất nằm ở <b>DHCP Server Log</b> trên Router MikroTik (hoặc Windows DHCP Server).<ul><li>Nếu <b>DHCP Server CÓ nhận được Discover</b> (thấy địa chỉ MAC của máy lỗi xuất hiện trong log): Đường truyền tầng 2 (Wi-Fi -> AP -> Switch -> VLAN Tag -> Router) từ Client lên Server đã THÔNG. Lỗi chắc chắn nằm ở việc Server hết IP (Pool Empty) hoặc chiều trả về từ Server xuống Client bị chặn (DHCP Snooping Untrusted Uplink, hoặc trùng Bridge VLAN).</li><li>Nếu <b>DHCP Server KHÔNG nhận được bất kỳ log nào</b> từ MAC của máy lỗi: Gói tin Broadcast DHCP Discover đã bị rơi rụng trên đường đi tầng 2. Hãy kiểm tra ngay cổng Switch cắm Access Point (đã Tagged đúng VLAN của SSID chưa?) và cấu hình Bridge VLAN Filtering trên MikroTik.</li></ul>",
      flowTitle: "Quy trình 4 bước Chẩn đoán sự cố Wi-Fi / DHCP nhận IP 169.254.x.x",
      flowSteps: [
        {
          step: "Bước 1: Scope (Khoanh vùng)",
          title: "Xác định bán kính thiệt hại trong 60 giây đầu tiên",
          detail: "Hỏi và kiểm tra nhanh 3 câu: (1) Một máy bị hay nhiều máy bị? (2) Bị trên cả công ty hay chỉ tại 1 khu vực (1 Access Point)? (3) Bị trên mọi SSID (Staff, Guest) hay chỉ 1 SSID duy nhất?",
          packetOrState: "Bằng chứng Scope: 'Chỉ các máy bắt Wi-Fi ở khu vực Kho hàng (AP-Warehouse-02) vào SSID Corp-Staff (VLAN 20) bị lỗi 169.254.x.x; bắt SSID Guest (VLAN 30) trên cùng AP đó vẫn chạy tốt'."
        },
        {
          step: "Bước 2: Hypothesis (Lập giả thuyết)",
          title: "Loại trừ các thành phần vô tội dựa trên Scope",
          detail: "Vì các khu vực khác vẫn vào được SSID Corp-Staff (VLAN 20), nên DHCP Server của VLAN 20 vẫn sống và chưa cạn Pool. Vì SSID Guest (VLAN 30) trên cùng AP-Warehouse-02 vẫn hoạt động, nên dây cáp mạng và nguồn PoE của AP hoàn toàn tốt. Giả thuyết duy nhất còn lại: Cổng Switch nối với AP-Warehouse-02 đang thiếu Tagged VLAN 20!",
          packetOrState: "Giả thuyết mục tiêu: Lỗi cấu hình 802.1Q VLAN Tagging cho VLAN 20 tại cổng Switch Access nối ra AP-Warehouse-02."
        },
        {
          step: "Bước 3: Verification (Kiểm chứng bằng lệnh)",
          title: "Thu thập bằng chứng kép trên Router và Switch",
          detail: "Mở Log DHCP trên MikroTik khi cho điện thoại kết nối thử vào AP kho hàng -> Xác nhận không có bản tin Discover nào bay về Router. Tiếp theo, SSH vào Switch kho hàng, chạy lệnh xem cấu hình cổng cắm AP-Warehouse-02.",
          packetOrState: "Bằng chứng lệnh: `show running-config interface Gi0/8` chỉ thấy `switchport trunk allowed vlan 10,30` (thiếu VLAN 20)."
        },
        {
          step: "Bước 4: Fix & Prevention (Xử lý & Phòng ngừa)",
          title: "Bổ sung VLAN chuẩn xác và chuẩn hóa quy trình",
          detail: "Dùng lệnh `switchport trunk allowed vlan add 20` (tuyệt đối nhớ chữ `add` để không làm đứt các VLAN đang chạy!). Kiểm tra lại trên máy trạm bằng `ipconfig /renew`, ping Gateway và lưu cấu hình `write memory`.",
          packetOrState: "Kết quả: Máy trạm tại kho nhận ngay IP `192.168.20.145/24`, ping thông suốt. Cập nhật tài liệu Port Map của Switch kho hàng."
        }
      ],
      asciiDiagram: `
                 [ MÁY TRẠM NHẬN IP 169.254.x.x (APIPA) ]
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼ (Chỉ 1 máy duy nhất bị)                             ▼ (Nhiều máy cùng bị)
  [KIỂM TRA CLIENT]                                 [MỞ LOG DHCP TRÊN MIKROTIK]
  - Quên mật khẩu/802.1X?                           (/log print where topics~"dhcp")
  - Dịch vụ DHCP Client treo?                                  │
  - Tắt/bật Wi-Fi, ipconfig /renew        ┌────────────────────┴────────────────────┐
                                          ▼ (CÓ thấy MAC trong Log)                 ▼ (IM LẶNG - Không thấy MAC)
                            ┌─────────────┴─────────────┐                   [ĐỨT ĐƯỜNG TRUYỀN LAYER 2]
                            ▼                           ▼                           │
                 [Log báo: Pool Empty]       [Log báo: Offering...         ┌────────┴────────┐
                            │                 without success]             ▼                 ▼
                  [CẠN Kiệt DHCP POOL]                  │          (Chỉ bị ở 1 AP)   (Bị toàn bộ VLAN)
                  - Xem: /ip pool used print   [TẮC CHIỀU TRẢ VỀ]          │                 │
                  - Giảm Lease Time (8h->2h)   - Switch bật DHCP   [CỔNG SWITCH NỐI AP] [CỔNG TRUNK UPLINK]
                  - Xóa Lease cũ / Mở rộng       Snooping nhưng    - Thiếu Tagged VLAN  - Quên Tag VLAN trên
                    dải IP cấp phát              quên Trust cổng     của SSID trên        Bridge VLAN MikroTik
                                                 Uplink!             cổng Switch!         hoặc Switch tổng!`,
      keyTakeaways: [
        "IP 169.254.x.x (APIPA) là bằng chứng xác nhận máy trạm không nhận được gói DHCP Offer nào sau khi phát Broadcast DHCP Discover.",
        "Luôn nhìn Log trên DHCP Server trước khi đi rút dây mạng: Có log nghĩa là đường truyền lên đã thông; Không có log nghĩa là kẹt VLAN/Layer 2 trên đường đi.",
        "Trên cổng Switch nối với Access Point phát nhiều SSID (Multi-SSID), cổng đó bắt buộc phải ở chế độ Trunk/Hybrid: PVID (Native VLAN) dùng cho IP quản trị AP, và Tagged đầy đủ tất cả các VLAN của các SSID.",
        "Khi thêm VLAN vào cổng Trunk đang hoạt động trên Cisco/Switch quản lý, luôn cẩn thận dùng cú pháp thêm (`allowed vlan add ...`) để tránh vô tình xóa mất các VLAN đang chạy sản xuất."
      ]
    },
    level3_practice: {
      scenario: "Sáng thứ Hai, bộ phận Sản xuất báo cáo không ai kết nối được Wi-Fi 'Prod-Devices' (VLAN 20 - 192.168.20.0/24) tại khu vực Xưởng B (hiển thị 'No Internet, Secured' và nhận IP 169.254.x.x). Trong khi đó, nhân viên Văn phòng ở tầng 2 bắt cùng tên Wi-Fi 'Prod-Devices' vẫn làm việc bình thường. Ngoài ra, khách hàng tại khu Lễ tân cũng phàn nàn không vào được Wi-Fi 'Company-Guest' (VLAN 40 - 172.16.40.0/24). Bạn hãy dùng câu lệnh thực tế để xử lý dứt điểm cả 2 sự cố này.",
      steps: [
        {
          title: "Bước 1: Bật bộ lắng nghe Log DHCP thời gian thực trên Router MikroTik",
          instruction: "Trước khi đi xuống xưởng, hãy SSH vào Router MikroTik trung tâm để xem trạng thái các DHCP Server, kiểm tra dung lượng Pool hiện tại và đọc các dòng log DHCP mới nhất.",
          commandOrConfig: `# 1. Kiểm tra trạng thái các DHCP Server và số lượng IP đang cấp
/ip dhcp-server print detail
/ip dhcp-server lease print count-only where server=dhcp-vlan20-prod
/ip dhcp-server lease print count-only where server=dhcp-vlan40-guest

# 2. Kiểm tra các dòng log liên quan đến DHCP
/log print where topics~"dhcp"`,
          explanation: "Kết quả trả về cho thấy: (1) `dhcp-vlan40-guest` đang có 199/199 leases và trong log xuất hiện liên tục dòng chữ đỏ: `dhcp-vlan40-guest failed to give out IP address: pool pool-guest is empty` -> Đã bắt tận tay nguyên nhân lỗi Wi-Fi Guest tại Lễ tân! (2) Trong khi đó, `dhcp-vlan20-prod` mới dùng 45/200 IP, và hoàn toàn KHÔNG có dòng log nào từ các thiết bị ở Xưởng B gửi lên -> Lỗi ở Xưởng B chắc chắn nằm ở tầng 2 (Switch/AP tại Xưởng B)."
        },
        {
          title: "Bước 2: Xử lý sự cố 1 — Giải cứu DHCP Pool bị cạn cho mạng Wi-Fi Guest (VLAN 40)",
          instruction: "Kiểm tra cấu hình DHCP Server của mạng Guest. Phát hiện người tiền nhiệm đặt `lease-time=3d` (3 ngày) khiến điện thoại của khách ghé thăm từ tuần trước vẫn chiếm giữ IP. Hãy hạ Lease Time xuống 2 giờ và dọn dẹp hoặc mở rộng dải Pool.",
          commandOrConfig: `# 1. Giảm Lease Time của mạng Guest xuống 2 giờ (02:00:00)
/ip dhcp-server set [find name="dhcp-vlan40-guest"] lease-time=2h

# 2. Mở rộng thêm dải IP Pool cho mạng Guest hoặc xóa các Lease đang ở trạng thái waiting
/ip pool print
# Giả sử pool-guest đang chỉ cấp từ 172.16.40.100-172.16.40.200, mở rộng ra từ .20 đến .240:
/ip pool set [find name="pool-guest"] ranges=172.16.40.20-172.16.40.240

# 3. Kiểm tra lại log xem khách ở Lễ tân đã nhận được IP chưa
/log print follow-only where topics~"dhcp" and message~"dhcp-vlan40-guest"`,
          explanation: "Ngay sau khi mở rộng range từ 100 IP lên 220 IP và rút ngắn Lease Time xuống 2 tiếng, log MikroTik lập tức nhảy thông báo `dhcp-vlan40-guest assigned 172.16.40.21 to ...`. Sự cố tại khu Lễ tân được giải quyết trong 2 phút mà không cần khởi động lại bất kỳ thiết bị nào."
        },
        {
          title: "Bước 3: Chẩn đoán sự cố 2 — Kiểm tra cổng Switch nối Access Point tại Xưởng B",
          instruction: "Vì MikroTik không nhận được gói DHCP Discover nào từ Xưởng B cho VLAN 20, ta SSH vào Switch Access tại Xưởng B (`SW-Factory-B`), kiểm tra cổng `Gi0/12` (cổng cắm AP Xưởng B) và cổng Uplink `Gi0/24`.",
          commandOrConfig: `# Trên Switch Access Xưởng B (Cisco IOS / tương đương):
SW-Factory-B# show running-config interface GigabitEthernet0/12
! Kết quả hiển thị:
interface GigabitEthernet0/12
 description AP-Factory-B-01
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk native vlan 10
 switchport trunk allowed vlan 10,30,40
! ---> PHÁT HIỆN: Thiếu VLAN 20 trong danh sách allowed vlan!

# Kiểm tra luôn cổng Uplink Gi0/24 xem đã có VLAN 20 và đã tồn tại VLAN 20 trong database chưa:
SW-Factory-B# show vlan brief
SW-Factory-B# show interfaces trunk`,
          explanation: "Bằng chứng quá rõ ràng: Cổng `Gi0/12` nối ra Access Point tại Xưởng B chỉ mới cho phép VLAN 10 (Management), 30 (Office), 40 (Guest) đi qua mà quên mất VLAN 20 (Prod-Devices). Do đó khi thiết bị ở xưởng kết nối vào SSID Prod-Devices, AP đóng nhãn VLAN 20 đẩy vào cổng Gi0/12 thì bị Switch chặn đứng ngay tại cổng!"
        },
        {
          title: "Bước 4: Sửa lỗi VLAN Tagging an toàn và xác minh từ đầu đến cuối",
          instruction: "Thêm VLAN 20 vào bảng VLAN của Switch (nếu chưa có) và bổ sung vào danh sách `allowed vlan` trên cổng `Gi0/12` mà không làm gián đoạn các VLAN khác đang hoạt động.",
          commandOrConfig: `SW-Factory-B# configure terminal
SW-Factory-B(config)# vlan 20
SW-Factory-B(config-vlan)# name Prod_Devices
SW-Factory-B(config-vlan)# exit

# CỰC KỲ QUAN TRỌNG: Dùng từ khóa 'add' để bổ sung VLAN 20
SW-Factory-B(config)# interface GigabitEthernet0/12
SW-Factory-B(config-if)# switchport trunk allowed vlan add 20
SW-Factory-B(config-if)# end

# Xác minh lại bảng Trunk và lưu cấu hình
SW-Factory-B# show interfaces GigabitEthernet0/12 trunk
SW-Factory-B# write memory`,
          explanation: "Sau khi gõ lệnh `switchport trunk allowed vlan add 20`, các máy kiểm kho PDA và laptop tại Xưởng B lập tức nhận được IP `192.168.20.x/24`. Quay lại màn hình Log của MikroTik thấy các bản tin `assigned 192.168.20.x` xuất hiện đầy đủ."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Tất cả thiết bị mới kết nối vào mạng Wi-Fi Khách đều xoay vòng ở bước 'Obtaining IP address...' rồi báo lỗi, trong khi người vào từ sáng vẫn dùng được.",
          hypothesis: "DHCP Pool của VLAN Guest đã bị cạn kiệt (Exhausted) do số lượng người truy cập vượt quá dải IP hoặc Lease Time đặt quá dài.",
          testCommand: "Trên MikroTik: `/ip dhcp-server lease print count-only where server=<tên_dhcp>` và `/log print where topics~\"dhcp\"`.",
          fix: "Giảm `lease-time` xuống 1h-2h cho mạng Guest, xóa các Lease không còn hoạt động hoặc mở rộng dải `/ip pool`."
        },
        {
          symptom: "Mới thay thế hoặc lắp mới 1 Access Point. Đèn AP sáng bình thường, Controller báo AP 'Connected', nhưng mọi người bắt Wi-Fi tại khu vực đó đều nhận IP 169.254.x.x.",
          hypothesis: "Cổng Switch cắm AP đang để chế độ Access (chỉ có VLAN quản trị AP) thay vì chế độ Trunk/Hybrid có Tagged các VLAN của SSID người dùng.",
          testCommand: "Trên Switch: `show interfaces <port> switchport` hoặc `show running-config interface <port>`. Trên MikroTik Bridge: `/interface bridge vlan print`.",
          fix: "Chuyển cổng Switch sang Trunk, đặt `native vlan` (PVID) là VLAN quản trị AP, và `allowed vlan add` toàn bộ các VLAN tương ứng với các SSID."
        },
        {
          symptom: "Trên MikroTik Log báo liên tục `dhcp1 offering lease 192.168.10.50 for MAC ... without success`, còn máy trạm dưới Switch vẫn bị APIPA 169.254.x.x.",
          hypothesis: "Gói DHCP Discover lên được Router nhưng gói DHCP Offer trả về bị chặn bởi tính năng DHCP Snooping trên Switch (quên cấu hình Trust trên cổng Uplink).",
          testCommand: "Trên Switch: `show ip dhcp snooping` để kiểm tra danh sách các cổng có cột `Trusted = yes`.",
          fix: "Vào cổng Uplink nối lên Router/Core Switch và gõ lệnh `ip dhcp snooping trust`."
        },
        {
          symptom: "Chỉ duy nhất 1 laptop của nhân viên nhận IP 169.254.x.x, tất cả đồng nghiệp ngồi cùng bàn bắt cùng Wi-Fi đó đều vào mạng bình thường.",
          hypothesis: "Lỗi cục bộ tại máy trạm: kẹt tiến trình DHCP Client trên Windows, phần mềm VPN/Firewall ảo khóa Adapter, hoặc MAC của máy bị đưa vào danh sách chặn (Blocklist/Static Lease sai).",
          testCommand: "Trên máy trạm: `ipconfig /all`, `ipconfig /release && ipconfig /renew`. Trên DHCP Server: `/ip dhcp-server lease print where mac-address=\"XX:XX...\"`.",
          fix: "Xóa Static Lease bị kẹt (nếu có), khởi động lại dịch vụ DHCP Client hoặc chạy `netsh winsock reset` & `netsh int ip reset` trên máy trạm."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Giám đốc gọi điện báo toàn bộ phòng họp tầng 3 đang kết nối được Wi-Fi (sóng căng đét) nhưng không ai vào được mạng, kiểm tra thấy IP là 169.254.x.x. Em xử lý theo trình tự nào?",
          wrongAnswer: "Dạ em sẽ lên phòng họp khởi động lại cục phát Wi-Fi trước ạ. Nếu vẫn không được thì em đặt IP tĩnh cho máy của Giám đốc để họp tạm rồi lát em khởi động lại con Router tổng xem có bị treo DHCP không.",
          rightAnswer: "Thưa anh/chị, em tuyệt đối không khởi động lại Router tổng hay đặt IP tĩnh mò mẫm khi chưa xác định nguyên nhân. Em sẽ áp dụng quy trình 4 bước chẩn đoán bằng bằng chứng trong vòng 2-3 phút:\n1. **Khoanh vùng (Scope)**: Em hỏi nhanh hoặc nhìn trên Controller xem chỉ riêng phòng họp tầng 3 (1 AP) bị, hay toàn bộ nhân viên cùng SSID đó ở các tầng khác cũng bị.\n2. **Kiểm chứng trên DHCP Server**: Em mở ngay Log DHCP trên Router MikroTik:\n   - Nếu thấy báo `pool is empty` (và các tầng khác cũng bị với thiết bị mới): Em mở rộng ngay IP Pool hoặc rút ngắn Lease Time để giải phóng IP.\n   - Nếu Log DHCP hoàn toàn không thấy bản tin Discover nào từ phòng họp tầng 3 gửi về (trong khi tầng 1, tầng 2 vẫn nhận IP bình thường): Em kết luận lỗi nằm ở đường Trunk tầng 2 từ Switch tầng 3 ra Access Point phòng họp.\n3. **Xử lý tận gốc**: Em kiểm tra cổng Switch nối với AP phòng họp xem có ai vừa cắm nhầm sang cổng Access hoặc thiếu Tagged VLAN của SSID đó không, sau đó bổ sung VLAN Tagging chuẩn xác để cả phòng họp có mạng lại đồng loạt.",
          keyPoints: [
            "Không bao giờ khởi động lại Router tổng khi lỗi chỉ xảy ra cục bộ ở một khu vực",
            "Dùng Log của DHCP Server làm điểm chốt chặn để phân tách lỗi do Server/Pool hay lỗi do đường truyền Layer 2 (VLAN/Switch)",
            "Giải thích rõ mối liên hệ giữa Multi-SSID trên Access Point và cổng Trunk (PVID + Tagged VLANs) trên Switch"
          ]
        },
        {
          question: "Tại sao Access Point vẫn báo 'Online / Connected' xanh mượt trên bộ điều khiển (Controller), mà người dùng kết nối vào Wi-Fi trên AP đó lại bị nhận IP 169.254.x.x?",
          wrongAnswer: "Dạ chắc do cục AP đó bị lỗi phần mềm (firmware) hoặc bị treo chip phát sóng Wi-Fi nên nó vẫn kết nối được dây LAN nhưng không cấp IP cho Wi-Fi được ạ.",
          rightAnswer: "Hiện tượng này là kinh điển của lỗi **lệch cấu hình VLAN giữa bản thân Access Point và SSID người dùng** trên cổng Switch:\n- Bản thân chiếc Access Point chỉ là một thiết bị quản trị, nó thường nhận IP qua **Native VLAN / Untagged (PVID)** trên cổng Switch (ví dụ VLAN 10 - Management). Vì PVID VLAN 10 đúng nên AP vẫn nhận được IP quản trị và báo Online xanh mượt về Controller.\n- Tuy nhiên, khi người dùng kết nối vào SSID (ví dụ 'Staff' gắn VLAN 20), AP sẽ đóng nhãn **802.1Q Tag ID = 20** vào gói tin DHCP Discover của người dùng rồi đẩy vào cổng Switch. Nếu cổng Switch đó đang cấu hình là `access` hoặc là `trunk` nhưng quên cho phép (Tagged) VLAN 20 đi qua, Switch sẽ vứt bỏ toàn bộ gói tin của VLAN 20. Kết quả là AP vẫn Online nhưng mọi Client trên SSID đó đều bị APIPA 169.254.x.x.",
          keyPoints: [
            "Phân biệt rõ lưu lượng Quản trị AP (thường đi qua Untagged / Native VLAN / PVID) và lưu lượng Người dùng theo từng SSID (đi qua Tagged VLAN 802.1Q)",
            "Chứng minh hiểu sâu về hoạt động của cổng Trunk/Hybrid nối giữa Switch và Access Point"
          ]
        },
        {
          question: "Khi anh bật tính năng DHCP Snooping trên Switch mới mua để chống nhân viên cắm cục роuter Wi-Fi lạ vào mạng, tự nhiên cả tầng đó rớt mạng sạch và nhận IP 169.254.x.x. Em giải thích tại sao và sửa bằng đúng 1 câu lệnh nào?",
          wrongAnswer: "Dạ do tính năng DHCP Snooping xung đột với Router MikroTik nên em sẽ tắt tính năng DHCP Snooping đi bằng lệnh `no ip dhcp snooping` để mạng chạy lại ạ.",
          rightAnswer: "Nguyên nhân không phải do xung đột thiết bị, mà do cơ chế mặc định của **DHCP Snooping**: Ngay khi bật tính năng này lên, Switch sẽ coi **tất cả các cổng là Untrusted (Không tin cậy)** và chặn toàn bộ gói tin phản hồi từ phía Server là `DHCP Offer` và `DHCP ACK`.\nDo đó, gói `DHCP Discover` từ máy trạm vẫn đi lên được Router MikroTik, Router vẫn trả gói `DHCP Offer` về, nhưng khi gói Offer đi vào cổng Uplink của Switch thì bị Switch chặn đứng vì cổng Uplink đang là Untrusted.\nCách sửa chuẩn xác mà vẫn giữ nguyên lớp bảo mật là vào đúng cổng Uplink (cổng nối về phía DHCP Server/Router) và cấu hình tin cậy cho cổng đó:\n`interface Gi0/24` -> `ip dhcp snooping trust`.",
          keyPoints: [
            "Hiểu rõ bản chất DHCP Snooping chặn gói Offer/ACK trên các cổng Untrusted",
            "Không tắt bừa tính năng bảo mật, mà sửa đúng bằng cách khai báo `ip dhcp snooping trust` trên cổng Uplink"
          ]
        }
      ],
      quizzes: [
        {
          question: "Một nhân viên báo cáo máy tính kết nối Wi-Fi nhận địa chỉ IP là 169.254.110.25, Subnet Mask 255.255.0.0. Điều này chứng tỏ điều gì về tiến trình DHCP DORA?",
          options: [
            "Máy tính đã nhận được IP từ một DHCP Server dự phòng của nhà mạng ISP.",
            "Máy tính đã gửi bản tin DHCP Discover nhưng không nhận được bản tin DHCP Offer nào phản hồi.",
            "Máy tính đã nhận được IP hợp lệ nhưng bị trùng cổng Default Gateway.",
            "Card mạng Wi-Fi của máy tính đã bị hỏng phần cứng hoàn toàn nên không thể phát sóng."
          ],
          correctIndex: 1,
          explanation: "Địa chỉ thuộc dải 169.254.0.0/16 là địa chỉ APIPA (Automatic Private IP Addressing) do hệ điều hành tự sinh ra khi DHCP Client phát Broadcast bản tin DHCP Discover nhiều lần mà không nhận được bất kỳ phản hồi DHCP Offer nào từ DHCP Server."
        },
        {
          question: "Khi kiểm tra lỗi nhiều máy trạm tại Tầng 2 bị nhận IP 169.254.x.x, bạn mở Log trên Router MikroTik và thấy thông báo lặp lại: `dhcp-vlan20 offering lease 192.168.20.88 for D4:6A:6A:11:22:33 without success`. Nguyên nhân nào dưới đây là hợp lý nhất?",
          options: [
            "DHCP Pool trên Router MikroTik đã hết sạch địa chỉ IP trống.",
            "Dịch vụ DHCP Server trên Router MikroTik đang bị tắt (Disabled).",
            "Gói tin DHCP Discover đã lên tới Router, nhưng gói tin DHCP Offer từ Router trả về cho máy trạm bị chặn ở tầng 2 (ví dụ: cổng Uplink trên Switch tầng 2 bị DHCP Snooping coi là Untrusted).",
            "Máy trạm chưa bật công tắc Wi-Fi."
          ],
          correctIndex: 2,
          explanation: "Log `offering lease ... without success` chứng tỏ MikroTik ĐÃ nhận được gói Discover từ MAC của máy trạm và ĐÃ chọn được một IP trống (192.168.20.88) để gửi gói Offer đi, nhưng không nhận lại được gói DHCP Request từ máy trạm. Điều này xảy ra khi gói Offer bị rơi trên đường trả về (phổ biến nhất là bị chặn bởi DHCP Snooping trên cổng Uplink chưa Trust hoặc sai cấu hình Egress VLAN)."
        },
        {
          question: "Trên một cổng Switch Cisco đang chạy Trunk cho các VLAN 10, 20, 30, bạn muốn cho phép thêm VLAN 40 đi qua cổng này mà KHÔNG làm gián đoạn kết nối của các VLAN hiện tại. Câu lệnh nào sau đây là AN TOÀN NHẤT?",
          options: [
            "`switchport trunk allowed vlan 40`",
            "`switchport trunk allowed vlan add 40`",
            "`switchport mode access vlan 40`",
            "`switchport trunk native vlan 40`"
          ],
          correctIndex: 1,
          explanation: "Nếu gõ `switchport trunk allowed vlan 40` (thiếu từ khóa `add`), Switch sẽ GHI ĐÈ danh sách, xóa sạch VLAN 10, 20, 30 và chỉ giữ lại mỗi VLAN 40, gây sập mạng ngay lập tức cho các VLAN đang chạy. Bắt buộc phải dùng `switchport trunk allowed vlan add 40`."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 20: SỰ CỐ DOMAIN, DNS & GPO (MỘT USER VS CẢ VĂN PHÒNG)
  // =========================================================================
  {
    id: 20,
    code: "20",
    week: 4,
    title: "Sự cố Domain, DNS & GPO: Tư duy khoanh vùng 'Một User vs Cả Văn Phòng'",
    subtitle: "Giải mã gốc rễ lỗi không đăng nhập được Domain, mất kết nối Domain Controller và GPO không áp dụng xuống máy trạm",
    priority: "P0",
    duration: "75 phút",
    whyThisMatters: "Trong môi trường Windows Server Active Directory, 90% sự cố 'Active Directory bị lỗi' thực chất là lỗi DNS hoặc lỗi phạm vi áp dụng (OU/Scope). Ở buổi phỏng vấn trước, ứng viên dễ rơi vào bẫy khi nhà tuyển dụng hỏi: 'User không đăng nhập được Domain hay GPO không chạy thì làm sao?' — nếu trả lời ngay 'Em gõ gpupdate /force' hoặc 'Em disjoin rồi join domain lại', nhà tuyển dụng sẽ đánh trượt vì thiếu phương pháp khoanh vùng. Bài này trang bị cho bạn vũ khí sắc bén nhất của System Admin: Phân tích tương quan Một User vs Một Máy vs Một OU vs Cả Công Ty.",
    analogy: {
      title: "Danh bạ nội bộ (DNS), Thẻ căn cước của Tòa nhà (Machine Account) và Sổ tay Nội quy (GPO)",
      content: "Hãy hình dung hệ thống Active Directory của công ty giống như một Tòa nhà Thông minh:\n\n1. **DNS nội bộ** là cuốn Danh bạ chỉ đường duy nhất trong tòa nhà. Nếu nhân viên lại đi hỏi ông Google (`8.8.8.8`) rằng: 'Phòng Nhân sự của công ty tôi nằm ở tầng mấy?', ông Google tất nhiên trả lời 'Không biết!' -> Máy trạm không bao giờ tìm thấy Domain Controller.\n2. **Trust Relationship (Mối quan hệ tin cậy của Máy trạm)** giống như chiếc Thẻ từ của chính cái bàn làm việc đó (cứ 30 ngày tự động đổi mã bảo mật một lần với Ban quản lý). Nếu cái bàn đó bị cất vào kho 3 tháng mới đem ra dùng hoặc bị Ghost lại về bản cũ, mã thẻ từ của bàn sẽ lệch với sổ của Ban quản lý -> Bất kỳ nhân viên nào ngồi vào bàn đó cũng bị báo lỗi 'The trust relationship between this workstation and the primary domain failed'.\n3. **GPO (Group Policy)** là Nội quy dán theo từng Phòng ban (OU): Có nội quy quy định cho **Cái Bàn (Computer Configuration)** và nội quy quy định cho **Con Người (User Configuration)**. Nếu bạn dán quy định dành cho Con Người lên bức tường chỉ chứa toàn Bàn ghế (OU Computers), thì chẳng có ai thực thi cả!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Quy tắc Khoanh vùng 2 Chiều (User vs Computer Matrix)",
          shortDef: "Kỹ thuật lấy User A đăng nhập thử sang Máy B, và lấy User B đăng nhập thử vào Máy A để tách biệt lỗi thuộc về Tài khoản (User Object) hay Thiết bị (Computer Object).",
          easyExplain: "Đừng bao giờ ngồi loay hoay 30 phút trên một chiếc máy tính khi chưa làm phép thử chéo 1 phút này. Nếu User A sang máy khác vẫn lỗi -> Lỗi đi theo người (Account Locked, Password Expired, Logon Workstation Restriction, User Profile lỗi). Nếu bất kỳ ai ngồi vào Máy A cũng lỗi -> Lỗi nằm tại chiếc Máy A (DNS sai, đứt Trust Relationship, lệch giờ Kerberos, đứt mạng tới DC).",
          realExample: "Chị Lan phòng Kế toán báo không đăng nhập được máy tính. Cho chị Lan ngồi thử sang máy đồng nghiệp cạnh bên thì đăng nhập vào ngay -> Xác định 100% tài khoản chị Lan bình thường, chỉ cần tập trung kiểm tra chiếc máy tính của chị Lan."
        },
        {
          term: "DNS SRV Records (_ldap._tcp.dc._msdcs.<Domain>)",
          shortDef: "Bản ghi dịch vụ trên DNS Server giúp máy trạm tìm ra địa chỉ IP của Domain Controller đang cung cấp dịch vụ xác thực Kerberos và LDAP.",
          easyExplain: "Máy tính Windows không tìm Domain Controller bằng cách đoán mò IP, mà nó hỏi DNS Server rằng: 'Ai đang giữ vai trò `_ldap._tcp.dc._msdcs.corp.local`?'. Nếu bạn cấu hình Preferred DNS hoặc Alternate DNS trên máy trạm là `8.8.8.8` hoặc `1.1.1.1`, khi máy trạm hỏi nhầm ra DNS ngoài Internet, nó sẽ nhận câu trả lời `Non-existent domain (NXDOMAIN)` và lập tức báo lỗi không tìm thấy Domain hoặc GPO áp dụng chậm hàng chục phút.",
          realExample: "Sau khi đổi cấu hình DHCP, kỹ thuật viên điền DNS Server là `8.8.8.8, 192.168.10.10`. Sáng hôm sau hàng loạt máy trạm khởi động mất 15 phút ở màn hình 'Applying computer settings' và không nhận được ổ đĩa mạng Map Drive."
        },
        {
          term: "Kerberos Time Skew (Độ lệch thời gian tối đa 5 phút)",
          shortDef: "Giao thức xác thực Kerberos của Active Directory yêu cầu đồng hồ giữa Máy trạm và Domain Controller không được lệch nhau quá 5 phút.",
          easyExplain: "Để chống lại kẻ tấn công bắt gói tin đăng nhập cũ rồi phát lại (Replay Attack), mọi vé xác thực Kerberos đều đóng dấu thời gian (Timestamp). Nếu máy tính để bàn bị hết pin CMOS trên mainboard hoặc đồng bộ sai múi giờ/NTP khiến giờ hệ thống lệch quá 5 phút so với Domain Controller, DC sẽ từ chối thẳng thừng việc đăng nhập và từ chối cho truy cập File Server.",
          realExample: "Một máy tính ở xưởng sản xuất bị rút điện cuối tuần, pin CMOS yếu làm giờ nhảy về năm 2020. Sáng thứ Hai bật máy lên không thể đăng nhập tài khoản Domain mới và không vào được `\\\\DC01\\SYSVOL`."
        },
        {
          term: "Broken Trust Relationship (Đứt kênh bảo mật Secure Channel)",
          shortDef: "Lỗi xảy ra khi mật khẩu ẩn của tài khoản máy tính (Machine Account Password) lưu trên máy trạm không còn khớp với mật khẩu lưu trong cơ sở dữ liệu Active Directory.",
          easyExplain: "Không chỉ con người mới có tài khoản và mật khẩu trong AD, mà mỗi chiếc máy tính khi Join Domain cũng có một Computer Account riêng và tự động đổi mật khẩu ngầm mỗi 30 ngày. Nếu bạn bung file Ghost/Snapshot cũ của máy trạm, hoặc máy trạm tắt nguồn nằm kho quá lâu bị xóa/reset trên AD, mật khẩu của máy trạm sẽ bị lệch với DC. Khi đó màn hình đăng nhập sẽ chặn lại với thông báo kinh điển: 'The trust relationship between this workstation and the primary domain failed'.",
          realExample: "Kỹ thuật viên bung lại bản Ghost Windows 10 chụp từ 4 tháng trước cho máy nhân viên. Mở máy lên gõ tài khoản Domain thì bị chặn bởi lỗi Trust Relationship."
        },
        {
          term: "Thứ tự áp dụng GPO (LSDOU) & Bộ lọc (Security Filtering / WMI)",
          shortDef: "GPO được áp dụng theo thứ tự Local -> Site -> Domain -> OU (cha rồi đến con), và chỉ có hiệu lực khi đối tượng nằm đúng OU kiêm thỏa mãn quyền Read + Apply Group Policy.",
          easyExplain: "Khi một GPO không có tác dụng trên máy trạm, 95% nguyên nhân nằm ở 4 chỗ: (1) Cấu hình phần User Configuration nhưng lại Link GPO vào OU chỉ chứa Computer (hoặc ngược lại); (2) Di chuyển nhầm User/Computer sang OU khác; (3) Sửa mục Security Filtering xóa mất `Authenticated Users` mà quên giữ quyền Read cho Computer; (4) Đường truyền tới thư mục `\\\\domain.local\\SYSVOL` bị lỗi DNS/Firewall.",
          realExample: "Tạo GPO Map Network Drive (nằm trong nhánh User Configuration) nhưng lại gắn (Link) GPO đó vào `OU=Desktops` (chỉ chứa các đối tượng Máy tính). Dù gõ `gpupdate /force` 100 lần thì ổ đĩa mạng vẫn không hiện ra."
        }
      ],
      comparisonTable: {
        title: "Bảng phân tích khoanh vùng: Sự cố 1 User/Máy đơn lẻ vs Sự cố cả Phòng ban / Toàn Văn phòng",
        headers: ["Triệu chứng thực tế", "Trường hợp A: Chỉ 1 User hoặc 1 Máy bị", "Trường hợp B: Cả 1 Phòng ban (VLAN/OU) hoặc Cả Công ty bị"],
        rows: [
          ["Không đăng nhập được vào Domain", "1 User bị ở mọi máy -> Tài khoản bị khóa (Locked out), hết hạn mật khẩu, hoặc giới hạn Logon To. 1 Máy bị với mọi User -> Lệch giờ CMOS > 5 phút, mất cáp mạng, hoặc đứt Trust Relationship.", "DHCP cấp sai DNS (trỏ ra 8.8.8.8), dịch vụ DNS/AD DS trên Domain Controller bị dừng, hoặc Firewall chặn cổng Kerberos (88), LDAP (389), DNS (53) từ VLAN đó về DC."],
          ["GPO không áp dụng xuống máy trạm", "Máy tính hoặc User đó vừa tạo mới nhưng còn nằm ở thư mục mặc định `CN=Computers` hoặc `CN=Users` (chưa được Move vào đúng OU được gắn GPO).", "GPO bị cấu hình sai nhánh (User vs Computer), sai Security Filtering, hoặc thư mục `\\\\domain\\SYSVOL` trên DC bị lỗi đồng bộ DFSR / không truy cập được qua SMB (Port 445)."],
          ["Đăng nhập cực kỳ chậm (kẹt 10-15 phút ở màn hình Welcome)", "User Profile trên máy đó bị hỏng hoặc chứa hàng chục GB rác trong Roaming Profile.", "Máy trạm đang cấu hình DNS phụ là `8.8.8.8` gây Timeout khi phân giải SRV record, hoặc một GPO Startup Script/Map Drive đang trỏ tới một IP Server cũ đã tắt máy."],
          ["Công cụ kiểm tra quyết định", "`net user <username> /domain`, `Test-ComputerSecureChannel`, `w32tm /stripchart`, `gpresult /r`.", "`nslookup _ldap._tcp.dc._msdcs.<domain>`, `dcdiag /v`, kiểm tra DHCP Option 006 (DNS Servers) và Firewall." ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Trong quản trị Active Directory, có 3 định luật bất biến bạn phải thuộc nằm lòng:<ul><li><b>Định luật 1 (AD sống bằng DNS)</b>: Mọi máy trạm trong Domain chỉ được phép trỏ DNS duy nhất về IP của các Domain Controller nội bộ. Tuyệt đối KHÔNG điền <code>8.8.8.8</code> hay <code>1.1.1.1</code> vào Secondary DNS trên card mạng máy trạm hay trong DHCP Server, vì Windows có thể chuyển sang hỏi luôn `8.8.8.8` và giữ nguyên ở đó, làm gãy hoàn toàn khả năng phân giải tên miền nội bộ. Muốn ra Internet, hãy cấu hình <b>DNS Forwarders</b> trên chính DNS Server của Domain Controller.</li><li><b>Định luật 2 (GPO = AD Metadata + SYSVOL File Share)</b>: Để máy trạm nhận được GPO, nó phải đọc được thông tin phiên bản từ LDAP (cổng 389) VÀ tải được file cấu hình `gpt.ini` từ thư mục chia sẻ `\\\\domain.local\\SYSVOL` (cổng SMB 445). Nếu chặn SMB 445 hoặc lỗi DNS, GPO sẽ chết cứng.</li><li><b>Định luật 3 (Không Disjoin/Rejoin mù quáng)</b>: Khi gặp lỗi Trust Relationship, dùng lệnh <code>Test-ComputerSecureChannel -Repair</code> sẽ sửa xong trong 5 giây mà không làm mất SID hay cấu hình gắn với đối tượng máy tính đó.</li></ul>",
      flowTitle: "Quy trình 4 bước Chẩn đoán sự cố AD, DNS & GPO không áp dụng",
      flowSteps: [
        {
          step: "Bước 1: Scope (Tách lỗi Người vs Máy vs Hệ thống)",
          title: "Xác định đối tượng bị lỗi thuộc phạm vi nào",
          detail: "Kiểm tra xem sự cố xảy ra cho 1 người dùng cụ thể, 1 máy trạm cụ thể, 1 phòng ban (OU/VLAN) hay toàn bộ công ty. Nếu là lỗi GPO, xác định xem GPO đó là Computer Policy hay User Policy.",
          packetOrState: "Bằng chứng: 'Cả phòng Nhân sự (5 người mới tuyển) đăng nhập vào máy bình thường nhưng không ai tự động nhận được ổ đĩa chung Z: (GPO Map Drive HR)'."
        },
        {
          step: "Bước 2: Kiểm chứng tầng nền tảng (DNS, Time, SYSVOL)",
          title: "Xác minh máy trạm có nhìn thấy Domain Controller chuẩn xác không",
          detail: "Trên máy bị lỗi, kiểm tra DNS đang trỏ đi đâu (`ipconfig /all`), phân giải thử bản ghi SRV của DC (`nslookup`), kiểm tra độ lệch thời gian và mở thử đường dẫn `\\\\domain.local\\SYSVOL` trong Run.",
          packetOrState: "Bằng chứng: DNS trỏ đúng về DC `192.168.10.10`, mở được `\\\\corp.local\\SYSVOL` -> Tầng mạng và DNS hoàn toàn khỏe mạnh."
        },
        {
          step: "Bước 3: Chẩn đoán kết quả GPO bằng gpresult",
          title: "Đọc bằng chứng từ báo cáo Resultant Set of Policy (RSoP)",
          detail: "Chạy lệnh `gpresult /r` (hoặc xuất file chi tiết `gpresult /h gpreport.html`) trên máy của nhân viên bị lỗi. Quan sát mục: (1) User/Computer đang nằm ở OU nào (Distinguished Name)? (2) GPO có nằm trong mục 'Applied Group Policy Objects' hay bị đẩy xuống mục 'Filtered Out' (bị loại bỏ)?",
          packetOrState: "Bằng chứng từ `gpresult /r`: Tài khoản của 5 nhân viên mới đang nằm ở `CN=Users,DC=corp,DC=local` (Container mặc định khi mới tạo user), chưa được chuyển vào `OU=HR,DC=corp,DC=local`!"
        },
        {
          step: "Bước 4: Xử lý, Cập nhật & Xác minh lại",
          title: "Đưa đối tượng về đúng OU / Sửa Scope và chạy gpupdate",
          detail: "Trên Active Directory Users and Computers (ADUC), di chuyển 5 tài khoản nhân viên mới vào đúng `OU=HR`. Trên máy trạm chạy `gpupdate /force` (hoặc đăng xuất/đăng nhập lại đối với GPO Map Drive) rồi kiểm tra lại bằng `gpresult /r`.",
          packetOrState: "Kết quả: `GPO_HR_MapDrive` xuất hiện trong danh sách Applied GPOs, ổ đĩa Z: hiện ra đầy đủ trong File Explorer."
        }
      ],
      asciiDiagram: `
               [ SỰ CỐ ACTIVE DIRECTORY / LOGIN / GPO ]
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       ▼                          ▼                          ▼
[1 USER KHÔNG LOGIN ĐƯỢC]  [1 MÁY BÁO LỖI TRUST /     [GPO KHÔNG ÁP DỤNG XUỐNG]
 (Thử sang máy khác         MỌI USER ĐỀU LỖI]                │
  cũng không vào được)            │                  1. Chạy: gpresult /r
       │                   1. Kiểm tra DNS:             (hoặc gpresult /h report.html)
1. Kiểm tra trên DC:          ipconfig /all                  │
   net user <ten> /domain     (Chỉ trỏ về IP DC,     ┌───────┴───────┐
       │                       CẤM điền 8.8.8.8!)    ▼               ▼
 - Account active: Locked? 2. Kiểm tra giờ hệ thống: [Không thấy     [Thấy tên GPO nhưng
 - Password expired?          Lệch quá 5 phút với DC  tên GPO đâu]    bị Denied / Filtered]
 - Logon Workstations:        sẽ lỗi Kerberos!       │               │
   Có bị giới hạn chỉ      3. Nếu báo lỗi Trust      - Đặt nhầm OU?  - Lỗi Security Filtering
   được ngồi máy cũ?          Relationship:          - Cấu hình User   (Thiếu quyền Read/Apply
       │                      Chạy PowerShell Admin:   Policy nhưng    hoặc thiếu Domain Computers)
2. Unlock / Reset Pass        Test-ComputerSecure      gắn vào OU    - WMI Filter đánh trượt
   trong ADUC hoặc            Channel -Repair          chứa Computer? - Lỗi không đọc được
   Unlock-ADAccount           -Credential (Get-Cred) - Chưa Link?      \\\\domain\\SYSVOL`,
      keyTakeaways: [
        "Tuyệt đối không cấu hình 8.8.8.8 làm Secondary DNS trên máy trạm Domain; mọi máy trạm chỉ trỏ DNS về Domain Controller, còn DC sẽ dùng DNS Forwarder để hỏi ra Internet.",
        "Khi 1 User lỗi: dùng `net user <username> /domain` để xem trạng thái Locked, Expired hoặc giới hạn máy đăng nhập. Khi 1 Máy lỗi: kiểm tra DNS, giờ hệ thống (< 5 phút) và kênh Trust Relationship.",
        "Để sửa lỗi 'The trust relationship between this workstation and the primary domain failed' chuẩn Senior, dùng lệnh PowerShell `Test-ComputerSecureChannel -Repair -Credential (Get-Credential)` thay vì tháo máy ra khỏi Domain.",
        "Trước khi phán đoán tại sao GPO không chạy, bắt buộc phải gõ `gpresult /r` hoặc `gpresult /h report.html` để xem đối tượng đang đứng ở OU nào và GPO bị chặn vì lý do gì."
      ]
    },
    level3_practice: {
      scenario: "Trong ca trực sáng nay, bạn nhận được 3 phiếu yêu cầu (Tickets) liên quan đến hệ thống Domain `corp.local` (DC01 có IP `192.168.10.10`):\n- Ticket 1: Máy tính `PC-KETOAN-02` vừa được kỹ thuật viên bung lại bản Ghost cũ nên khi nhân viên đăng nhập thì bị chặn bởi thông báo: `The trust relationship between this workstation and the primary domain failed`.\n- Ticket 2: Anh Minh (`minh.nguyen`) báo không đăng nhập được vào máy, màn hình báo lỗi tài khoản.\n- Ticket 3: Bạn vừa tạo một GPO tên `GPO_Disable_USB` (cấu hình trong nhánh Computer Configuration) và gắn vào `OU=Accounting_Users`, nhưng nhân viên kế toán cắm USB vào máy vẫn đọc ghi bình thường. Hãy xử lý tuần tự bằng câu lệnh và công cụ chuẩn.",
      steps: [
        {
          title: "Bước 1: Xử lý Ticket 1 — Khôi phục Trust Relationship cho PC-KETOAN-02 không cần Join lại Domain",
          instruction: "Đăng nhập vào máy `PC-KETOAN-02` bằng tài khoản Local Administrator của máy (ví dụ `.\\Administrator`), mở PowerShell quyền Admin để kiểm tra DNS, thời gian và sửa lại kênh bảo mật (Secure Channel) với Domain Controller.",
          commandOrConfig: `# 1. Kiểm tra DNS đã trỏ đúng về DC01 (192.168.10.10) và giờ có khớp với DC không
ipconfig /all
w32tm /stripchart /computer:dc01.corp.local /samples:1 /dataonly

# 2. Kiểm tra trạng thái kênh bảo mật hiện tại (sẽ trả về False)
Test-ComputerSecureChannel -Verbose

# 3. Khôi phục (Repair) mật khẩu Machine Account trực tiếp với Domain Admin
Test-ComputerSecureChannel -Repair -Credential (Get-Credential)
# (Nhập tài khoản CORP\\Administrator khi hộp thoại hiện lên -> Kết quả trả về: True)`,
          explanation: "Lệnh `Test-ComputerSecureChannel -Repair` tự động đồng bộ lại mật khẩu của đối tượng máy tính `PC-KETOAN-02$` giữa máy trạm và Domain Controller. Nhân viên có thể đăng nhập lại ngay lập tức mà không cần khởi động lại máy2 lần như cách Disjoin/Rejoin truyền thống."
        },
        {
          title: "Bước 2: Xử lý Ticket 2 — Kiểm tra trạng thái tài khoản `minh.nguyen` bằng lệnh",
          instruction: "Từ máy quản trị (hoặc trên DC01), kiểm tra chi tiết trạng thái tài khoản của anh Minh để xem bị khóa (Locked), hết hạn mật khẩu hay bị giới hạn giờ/máy đăng nhập.",
          commandOrConfig: `# Cách 1: Dùng lệnh net user nhanh gọn từ bất kỳ máy nào trong Domain
net user minh.nguyen /domain

# Cách 2: Dùng PowerShell trên Domain Controller để xem chi tiết và mở khóa
Get-ADUser -Identity minh.nguyen -Properties LockedOut, PasswordExpired, BadPwdCount, LastBadPasswordAttempt, LogonWorkstations

# Mở khóa tài khoản ngay lập tức nếu thấy LockedOut = True:
Unlock-ADAccount -Identity minh.nguyen`,
          explanation: "Kết quả lệnh hiển thị `Account active: Locked` và `BadPwdCount: 5` do anh Minh vừa đổi mật khẩu trên máy tính nhưng điện thoại của anh vẫn lưu mật khẩu cũ trong ứng dụng Mail/Wi-Fi, khiến điện thoại tự động thử đăng nhập sai liên tục làm khóa tài khoản. Sau khi `Unlock-ADAccount`, hướng dẫn anh Minh cập nhật lại mật khẩu trên điện thoại để không bị khóa lặp lại."
        },
        {
          title: "Bước 3: Xử lý Ticket 3 — Chẩn đoán tại sao `GPO_Disable_USB` không có hiệu lực",
          instruction: "Trên máy tính của nhân viên kế toán, mở Command Prompt với quyền Administrator để xuất báo cáo GPO và kiểm tra vị trí OU của máy tính.",
          commandOrConfig: `# 1. Xem nhanh kết quả áp dụng GPO trên màn hình
gpresult /r

# 2. Hoặc xuất báo cáo HTML chi tiết để đọc cả nhánh Computer và User
gpresult /h C:\\Temp\\gpreport.html`,
          explanation: "Đọc kết quả `gpresult /r` phần `COMPUTER SETTINGS` thấy: Máy tính `PC-KETOAN-02` đang nằm ở `CN=Computers,DC=corp,DC=local` và hoàn toàn không nhận được `GPO_Disable_USB`. Hơn nữa, chính sách chặn USB được bạn cấu hình ở nhánh **Computer Configuration**, nhưng bạn lại gắn (Link) GPO đó vào `OU=Accounting_Users` (nơi chỉ chứa các tài khoản con người User, không chứa đối tượng Computer nào!)."
        },
        {
          title: "Bước 4: Sửa lại cấu trúc OU / GPO Link và ép cập nhật chính sách",
          instruction: "Đưa các đối tượng máy tính của phòng Kế toán vào đúng `OU=Accounting_Computers`, gắn (Link) `GPO_Disable_USB` vào OU đó, sau đó chạy lệnh cập nhật trên máy trạm.",
          commandOrConfig: `# Trên máy trạm PC-KETOAN-02 sau khi đã chuyển máy vào OU=Accounting_Computers và Link GPO:
gpupdate /force

# Kiểm tra lại bằng chứng đã nhận GPO thành công:
gpresult /Scope Computer /r`,
          explanation: "Trong mục `Applied Group Policy Objects` của phần `COMPUTER SETTINGS` lúc này đã xuất hiện dòng `GPO_Disable_USB`. Cắm thử USB vào máy trạm thấy hệ thống lập tức chặn quyền truy cập đúng theo yêu cầu bảo mật."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Khi bấm Join Domain cho một máy tính mới (nhập `corp.local`), Windows báo lỗi ngay: 'An Active Directory Domain Controller (AD DC) for the domain corp.local could not be contacted'.",
          hypothesis: "Card mạng của máy tính đang nhận DNS của nhà mạng hoặc Google (8.8.8.8) thay vì trỏ về địa chỉ IP của Domain Controller nội bộ.",
          testCommand: "Chạy `ipconfig /all` xem dòng `DNS Servers` và gõ `nslookup _ldap._tcp.dc._msdcs.corp.local`.",
          fix: "Đổi Preferred DNS trên card mạng (hoặc trong DHCP Option 006) về đúng IP của Domain Controller nội bộ, xóa DNS 8.8.8.8 khỏi máy trạm, rồi gõ `ipconfig /flushdns`."
        },
        {
          symptom: "Màn hình đăng nhập báo lỗi: 'The trust relationship between this workstation and the primary domain failed' đối với mọi tài khoản Domain.",
          hypothesis: "Mật khẩu Machine Account của máy trạm bị lệch so với Active Directory (do bung Ghost cũ,还原 Snapshot VM, hoặc máy để tắt quá lâu).",
          testCommand: "Đăng nhập bằng Local Admin, mở PowerShell chạy `Test-ComputerSecureChannel`.",
          fix: "Chạy lệnh `Test-ComputerSecureChannel -Repair -Credential (Get-Credential)` và nhập tài khoản có quyền Domain Admin."
        },
        {
          symptom: "User báo tài khoản cứ mở khóa (Unlock) xong được 5-10 phút là lại tự động bị khóa (Locked out) dù user không hề gõ sai mật khẩu trên bàn phím.",
          hypothesis: "Có một phiên đăng nhập cũ hoặc dịch vụ ngầm đang lưu mật khẩu cũ (Credential Manager, ổ đĩa Map Drive lưu pass cũ, kết nối Wi-Fi/Email trên điện thoại, hoặc phiên Remote Desktop bị treo trên một Server khác).",
          testCommand: "Mở Event Viewer trên Domain Controller -> Security Log -> Lọc **Event ID 4740** (A user account was locked out) và xem trường `Caller Computer Name`.",
          fix: "Dựa vào `Caller Computer Name` trong Event ID 4740 để biết chính xác thiết bị nào đang gửi mật khẩu sai, sau đó xóa Credential cũ trong Windows Credential Manager hoặc đăng xuất phiên RDP bị treo trên thiết bị đó."
        },
        {
          symptom: "Đã tạo GPO, đã Link vào đúng OU, nhưng chạy `gpresult /r` thấy GPO nằm trong mục 'The following GPOs were not applied because they were filtered out (Denied - Security)'.",
          hypothesis: "Bạn đã xóa nhóm `Authenticated Users` trong tab Security Filtering để chỉ định riêng một nhóm User, khiến đối tượng **Computer** mất quyền `Read` đối với GPO đó.",
          testCommand: "Mở Group Policy Management Console (GPMC) -> chọn GPO -> kiểm tra tab **Scope (Security Filtering)** và tab **Delegation**.",
          fix: "Vào tab Delegation của GPO, bấm Add thêm nhóm `Authenticated Users` hoặc `Domain Computers` với quyền tối thiểu là **Read** (để máy trạm đọc được gói GPO về cho User)."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Trên DHCP Server cấp IP cho mạng LAN nội bộ, để phòng trường hợp máy chủ Domain Controller (192.168.10.10) bị sập mà nhân viên vẫn lướt web được, anh cấu hình Primary DNS là `192.168.10.10` và Secondary DNS là `8.8.8.8`. Theo em cách cấu hình này có tốt không?",
          wrongAnswer: "Dạ cách này rất hay ạ! Vì bình thường máy trạm sẽ dùng DNS chính là 192.168.10.10 để vào Domain, còn khi nào Server bảo trì hoặc sập thì nó tự nhảy sang 8.8.8.8 để nhân viên vẫn có Internet làm việc bình thường.",
          rightAnswer: "Thưa anh, đây là một **cấu hình sai lầm rất phổ biến** trong môi trường Active Directory và sẽ gây ra lỗi chập chờn cực kỳ khó chịu:\n1. Cơ chế DNS Client của Windows không phải lúc nào cũng ưu tiên tuyệt đối Primary DNS. Chỉ cần một tích tắc DC phản hồi chậm vài mili-giây, Windows sẽ chuyển sang dùng Secondary DNS (`8.8.8.8`) và **giữ nguyên việc hỏi 8.8.8.8** cho các truy vấn tiếp theo.\n2. Khi máy trạm hỏi `8.8.8.8` về tên miền nội bộ (ví dụ `corp.local` hoặc `\\\\fileserver\\share`), Google DNS sẽ trả lời ngay lập tức là **NXDOMAIN (Tên miền không tồn tại)**. Khi nhận được câu trả lời khẳng định 'Không tồn tại', Windows sẽ **không quay lại hỏi Primary DNS nữa** mà báo lỗi ngay! Hệ quả là nhân viên lúc vào được File Server lúc không, GPO lúc nhận lúc mất, đăng nhập máy mất 10-15 phút.\n3. **Giải pháp chuẩn**: Máy trạm trong Domain **chỉ được phép trỏ DNS về các Domain Controller nội bộ** (DC01 và DC02 dự phòng). Còn trên DNS Server của DC01 và DC02, ta mới cấu hình **DNS Forwarders** trỏ ra `8.8.8.8` / `1.1.1.1` để phân giải Internet.",
          keyPoints: [
            "Giải thích được cơ chế trả về NXDOMAIN của Public DNS khiến Windows không hỏi lại Primary DNS",
            "Nêu rõ hậu quả thực tế: đăng nhập chậm, mất kết nối SYSVOL/GPO, không truy cập được File Share theo tên",
            "Đưa ra kiến trúc chuẩn: Client chỉ trỏ DNS về DC1 + DC2; trên DC cấu hình DNS Forwarders ra ngoài"
          ]
        },
        {
          question: "Một nhân viên báo không đăng nhập được vào máy tính bằng tài khoản Domain. Em hãy trình bày cách khoanh vùng để biết đây là lỗi của User đó, lỗi của chiếc máy tính đó, hay lỗi của cả hệ thống Domain?",
          wrongAnswer: "Dạ em sẽ xuống máy của bạn đó, vào tài khoản Admin cục bộ rồi cho máy rời khỏi Domain (Disjoin) sau đó Join lại. Nếu vẫn không được thì em lên Server reset lại mật khẩu cho bạn đó ạ.",
          rightAnswer: "Em sẽ thực hiện **phép thử chéo 2 chiều (Matrix Scope)** cùng việc đọc đúng thông báo lỗi trên màn hình trong vòng 2 phút trước khi can thiệp:\n1. **Quan sát thông báo lỗi & Thử chéo**:\n   - Nếu báo *'The referenced account is currently locked out'* hoặc *'Your password has expired'*: Lỗi thuộc về **User Object**. Em kiểm tra trên AD bằng `net user <username> /domain` hoặc xem **Event ID 4740** trên DC để mở khóa.\n   - Nếu cho User đó đăng nhập thử sang máy bên cạnh thì vào được ngay, còn đồng nghiệp khác đăng nhập vào máy của bạn đó cũng bị lỗi: Lỗi thuộc về **Chiếc máy tính đó (Computer Object)**.\n2. **Nếu lỗi tại chiếc máy tính đó**, em kiểm tra 3 điểm theo thứ tự:\n   - **Kết nối mạng & DNS**: Đã cắm đúng VLAN chưa, `ipconfig /all` có trỏ DNS về đúng IP của DC không?\n   - **Thời gian hệ thống**: Giờ trên máy có bị lệch quá 5 phút so với DC gây lỗi Kerberos không?\n   - **Kênh bảo mật Trust Relationship**: Nếu báo lỗi *'trust relationship failed'*, em đăng nhập Local Admin và chạy lệnh PowerShell `Test-ComputerSecureChannel -Repair` để khôi phục ngay trong 10 giây mà không cần Disjoin/Rejoin.",
          keyPoints: [
            "Dùng phép thử chéo (User A sang Máy B, User B vào Máy A) để tách bạch lỗi User vs lỗi Máy",
            "Phân biệt rõ các thông báo lỗi đặc trưng (Locked out vs Domain not available vs Trust relationship failed)",
            "Kiểm tra đủ bộ 3 sống còn của máy trạm AD: DNS nội bộ, Đồng bộ giờ Kerberos (< 5 phút), và Secure Channel"
          ]
        },
        {
          question: "Em tạo một GPO mới để tự động gắn ổ đĩa mạng (Map Network Drive) cho phòng Kinh doanh, đã gắn (Link) GPO đó vào OU của phòng Kinh doanh và gõ `gpupdate /force` trên máy nhân viên nhưng ổ đĩa vẫn không xuất hiện. Những nguyên nhân nào có thể xảy ra và em dùng lệnh gì để tìm ra ngay?",
          wrongAnswer: "Dạ chắc do Windows bị lỗi cache nên em sẽ khởi động lại máy tính của nhân viên mấy lần, hoặc em xóa GPO đó đi tạo lại từ đầu và gắn thẳng vào cấp cao nhất là Domain luôn cho chắc ăn ạ.",
          rightAnswer: "Tuyệt đối không gắn bừa GPO của một phòng ban lên cấp Domain. Để tìm nguyên nhân bằng bằng chứng, em mở CMD trên máy nhân viên đó và chạy lệnh **`gpresult /r`** (hoặc **`gpresult /h report.html`**) để kiểm tra 4 nguyên nhân phổ biến nhất:\n1. **Lệch loại đối tượng trong OU (User vs Computer)**: Cấu hình Map Network Drive nằm trong nhánh **User Configuration**. Nếu `OU=Sales` chỉ chứa các đối tượng Máy tính (`Computers`) mà tài khoản con người (`Users`) của nhân viên lại đang nằm ở `CN=Users` hoặc một OU khác, thì User Configuration sẽ không bao giờ chạy.\n2. **Lỗi Security Filtering (Mất quyền Read của Computer)**: Nếu trong mục Security Filtering em xóa `Authenticated Users` để chỉ thêm `Group_Sales`, thì bản thân chiếc máy tính (`Domain Computers`) mất quyền đọc GPO đó về, dẫn đến GPO bị báo *Denied (Security)*.\n3. **Đặc thù của Drive Maps (Synchronous Processing)**: Từ Windows 8.1/10 trở đi, các GPO yêu cầu xử lý đồng bộ như Folder Redirection hoặc Drive Maps đôi khi cần người dùng **Logoff rồi Logon lại** sau khi chạy `gpupdate /force` mới thực thi phiên gắn ổ đĩa.\n4. **Lỗi đường dẫn đích hoặc quyền chia sẻ**: Đường dẫn UNC khai báo trong GPO (ví dụ `\\\\FileServer\\Sales`) bị gõ sai hoặc User chưa có quyền Read trên thư mục đó (kiểm tra trong Event Viewer -> GroupPolicy Operational log).",
          keyPoints: [
            "Luôn bắt đầu bằng lệnh `gpresult /r` hoặc `gpresult /h` để lấy bằng chứng",
            "Chỉ ra được lỗi kinh điển: Cấu hình User Policy nhưng lại Link vào OU chỉ chứa Computer (hoặc User đang nằm ở OU khác)",
            "Nhắc tới bẫy Security Filtering (thiếu quyền Read cho Domain Computers / Authenticated Users) và yêu cầu Logoff/Logon lại"
          ]
        }
      ],
      quizzes: [
        {
          question: "Giao thức xác thực Kerberos trong Active Directory quy định độ lệch thời gian tối đa mặc định giữa máy trạm (Client) và máy chủ Domain Controller là bao nhiêu?",
          options: [
            "30 giây",
            "5 phút",
            "60 phút",
            "24 giờ"
          ],
          correctIndex: 1,
          explanation: "Mặc định Kerberos cho phép độ lệch thời gian tối đa (Maximum tolerance for computer clock synchronization) là 5 phút để chống lại tấn công phát lại (Replay Attack). Nếu đồng hồ máy trạm lệch quá 5 phút so với DC, quá trình xác thực Kerberos sẽ thất bại."
        },
        {
          question: "Khi một nhân viên liên tục bị khóa tài khoản Active Directory (Account Locked Out) sau mỗi vài phút dù đã được mở khóa, bạn nên kiểm tra Event ID nào trong Security Log của Domain Controller để tìm ra tên chiếc máy tính đang gây khóa tài khoản?",
          options: [
            "Event ID 4624",
            "Event ID 4740",
            "Event ID 1001",
            "Event ID 6008"
          ],
          correctIndex: 1,
          explanation: "Event ID 4740 ('A user account was locked out') trên Domain Controller ghi nhận chính xác thời điểm tài khoản bị khóa và trường `Caller Computer Name` cho biết thiết bị nào vừa gửi các lần đăng nhập sai mật khẩu cuối cùng."
        },
        {
          question: "Một GPO được cấu hình các thiết lập nằm trong nhánh `Computer Configuration`. Bạn gắn (Link) GPO này vào `OU=Marketing_Staff` (một OU chỉ chứa các tài khoản User của nhân viên Marketing, còn các đối tượng Computer của họ nằm ở `OU=Workstations`). Điều gì sẽ xảy ra?",
          options: [
            "GPO vẫn áp dụng bình thường khi nhân viên Marketing đăng nhập vào máy tính.",
            "GPO hoàn toàn KHÔNG có tác dụng vì các thiết lập Computer Configuration chỉ áp dụng lên đối tượng Computer nằm trong OU đó.",
            "GPO sẽ tự động chuyển đổi sang User Configuration để chạy.",
            "Domain Controller sẽ tự động di chuyển máy tính vào OU Marketing_Staff."
          ],
          correctIndex: 1,
          explanation: "Các thiết lập trong nhánh `Computer Configuration` chỉ có hiệu lực lên các đối tượng **Computer** nằm trong phạm vi OU được gắn GPO. Nếu OU đó chỉ chứa đối tượng **User**, các thiết lập Computer Configuration sẽ bị bỏ qua hoàn toàn."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 21: SỰ CỐ VPN, FIREWALL & FILE SHARE (VPN CONNECTED NHƯNG MẤT SMB)
  // =========================================================================
  {
    id: 21,
    code: "21",
    week: 4,
    title: "Sự cố VPN, Firewall & File Share: Giải phẫu ca 'VPN Connected nhưng không vào được \\\\Server\\Share'",
    subtitle: "Đi theo đường đi gói tin qua 6 tầng kiểm chứng: Từ IP VPN Pool -> Routing -> Router Firewall Forward -> Windows Firewall -> DNS -> Quyền SMB & NTFS",
    priority: "P1",
    duration: "75 phút",
    whyThisMatters: "Đây là câu hỏi tình huống xuất hiện trong gần như 100% các buổi phỏng vấn System & Network Admin thực chiến: 'Nhân viên làm việc tại nhà báo đã kết nối VPN thành công (báo Connected xanh lét), nhưng bấm vào ổ đĩa chung \\\\Server\\Share thì báo lỗi không truy cập được. Em kiểm tra những gì?'. Rất nhiều ứng viên trả lời lộn xộn hoặc đề xuất 'Em tắt Firewall đi thử' / 'Em cấp quyền Everyone Full Control xem sao'. Trong mắt nhà tuyển dụng Senior, tắt Firewall hay mở quyền Everyone trên môi trường thật là điểm liệt về an toàn thông tin. Bài học này giúp bạn bóc tách từng lớp từ Layer 3 đến Layer 7 một cách khoa học và an toàn tuyệt đối.",
    analogy: {
      title: "Qua được Cổng bảo vệ Khu công nghiệp (VPN) chưa chắc đã vào được Phòng Tài liệu Mật (File Server)",
      content: "Hãy tưởng tượng việc nhân viên ở nhà kết nối VPN thành công giống như việc họ vừa xuất trình thẻ nhân viên và đi qua được **Cổng chính của Khu công nghiệp (VPN Gateway)**:\n\n1. **VPN IP Pool**: Bảo vệ cổng chính phát cho bạn một chiếc áo vest khách thăm mang số hiệu khu vực `10.10.99.50`.\n2. **Routing (Bản đồ chỉ đường)**: Nếu trên tay bạn không có bản đồ chỉ rằng 'Tòa nhà File Server `192.168.10.20` phải rẽ vào cổng VPN' (thiếu Route đẩy xuống Client), bạn lại đi thẳng ra ngoài đường cái (Internet nhà mạng của bạn) để tìm tòa nhà công ty -> Tất nhiên không thấy!\n3. **Router Firewall (Trạm kiểm soát nội khu)**: Có bản đồ đi đúng đường rồi, nhưng trạm gác giữa Khu vực VPN (`10.10.99.0/24`) và Khu vực Server (`192.168.10.0/24`) lại có lệnh chặn không cho người mặc áo `10.10.99.x` đi qua (Filter Forward Drop).\n4. **Windows Firewall trên File Server (Vệ sĩ đứng trước cửa phòng Server)**: Vệ sĩ này được dặn: 'Chỉ cho người trong cùng tầng `192.168.10.x` (Local Subnet) vào cửa 445 thôi, người từ khu khác như `10.10.99.x` đến là đóng cửa!'.\n5. **DNS vs IP (Gọi tên hay đọc số phòng)**: Bạn hỏi tìm phòng tên `\\\\FILESERVER` nhưng ở nhà đang dùng danh bạ của nhà mạng FPT/Viettel nên không ai biết `FILESERVER` là số phòng bao nhiêu (nhưng gõ thẳng số phòng `\\\\192.168.10.20` thì lại tới được cửa!).\n6. **SMB & NTFS Permission (Khóa cửa ngoài và Khóa tủ hồ sơ)**: Tới đúng phòng, đúng tên, nhưng tài khoản của bạn chưa được cấp chìa khóa mở tủ!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Split Tunneling vs Full Tunneling (Định tuyến VPN trên máy trạm)",
          shortDef: "Cơ chế quyết định những dải mạng nào sẽ đi qua đường hầm VPN và những dải mạng nào đi thẳng ra Internet tại nhà của người dùng.",
          easyExplain: "Nếu dùng Full Tunnel (tích chọn 'Use default gateway on remote network'), mọi lưu lượng của máy trạm đều chui vào VPN (rất tốn băng thông công ty). Do đó thực tế thường dùng Split Tunnel: chỉ đẩy các dải mạng nội bộ (ví dụ `192.168.10.0/24`) đi qua VPN. Nhưng nếu quên khai báo tĩnh hoặc đẩy thiếu Route của dải VLAN Server xuống máy trạm, gói tin hỏi `192.168.10.20` sẽ đi nhầm ra modem Wi-Fi ở nhà người dùng và mất hút.",
          realExample: "Máy nhân viên nhận IP VPN `10.10.99.15`, ping `10.10.99.1` (IP đầu hầm của Router) thì thông, nhưng `tracert 192.168.10.20` lại thấy nhảy qua `192.168.1.1` (modem Viettel ở nhà) do thiếu Route."
        },
        {
          term: "MikroTik Firewall Filter — Forward Chain vs Input Chain",
          shortDef: "Input Chain kiểm soát lưu lượng đi vào chính con Router (như bắt tay VPN), còn Forward Chain kiểm soát lưu lượng đi XUYÊN QUA Router (từ dải VPN vào dải LAN Server).",
          easyExplain: "Tại sao VPN báo 'Connected' nhưng không vào được LAN? Vì quá trình xác thực VPN (L2TP/IPsec, WireGuard, OpenVPN, SSTP) là giao tiếp giữa Client và chính con Router -> Nó đi qua **Input Chain**. Khi đã Connected, gói tin từ IP VPN (`10.10.99.x`) đi sang IP File Server (`192.168.10.20`) là đi xuyên qua Router -> Nó chịu sự phán xét của **Forward Chain**. Nếu cuối bảng Forward có rule `Drop All` mà phía trên bạn quên tạo rule `Accept src=10.10.99.0/24 dst=192.168.10.20`, gói tin sẽ bị chặn đứng.",
          realExample: "Admin mới cấu hình xong VPN Pool `10.10.99.0/24`, kết nối thành công nhưng quên thêm Rule cho phép `10.10.99.0/24` truy cập `192.168.10.20` port 445 nằm TRƯỚC rule Drop cuối cùng của Forward chain."
        },
        {
          term: "Windows Defender Firewall Scope (Local Subnet Trap)",
          shortDef: "Bẫy kinh điển trên Windows Server khi Rule mở cổng File and Printer Sharing (SMB-In TCP 445) chỉ cho phép 'Local Subnet' hoặc đang áp dụng sai Network Profile (Public vs Domain).",
          easyExplain: "Rất nhiều bạn kiểm tra thấy các máy trong mạng LAN (`192.168.10.x`) vẫn vào File Server (`192.168.10.20`) ầm ầm nên khẳng định 'File Server không chặn gì cả'. Nhưng khi đi qua VPN, gói tin mang Source IP là `10.10.99.x` (khác Subnet với File Server). Nếu rule SMB-In trên Windows Firewall của Server đang giới hạn Scope = `LocalSubnet`, hoặc thậm chí cả khi Ping (ICMP) thông nhưng TCP 445 bị chặn cho dải mạng ngoài, kết nối SMB sẽ thất bại.",
          realExample: "Ping `192.168.10.20` qua VPN trả về `Reply from 192.168.10.20: time=15ms`, nhưng chạy `Test-NetConnection 192.168.10.20 -Port 445` lại báo `TcpTestSucceeded : False` do Windows Firewall trên Server chặn port 445 từ dải ngoài Subnet."
        },
        {
          term: "Truy cập bằng Tên (`\\\\Server`) vs Truy cập bằng IP (`\\\\192.168.10.20`)",
          shortDef: "Phép thử vàng giúp tách biệt ngay lập tức lỗi Phân giải tên (DNS) và lỗi Kết nối mạng/Firewall.",
          easyExplain: "Khi nhân viên ở nhà kết nối VPN dạng Split Tunnel, máy tính của họ thường vẫn ưu tiên hỏi DNS của modem Wi-Fi ở nhà. Do đó khi bấm vào Shortcut cũ `\\\\FILESERVER\\Data`, máy tính không biết `FILESERVER` có IP là gì. Nếu bạn bảo họ gõ thử `\\\\192.168.10.20\\Data` mà vào được ngay -> Chứng tỏ VPN, Route, Firewall và Permission đều ĐÚNG 100%, lỗi chỉ nằm ở chỗ cấu hình VPN Profile chưa đẩy DNS nội bộ xuống hoặc người dùng chưa dùng tên FQDN (`\\\\fileserver.corp.local\\Data`).",
          realExample: "Mở `\\\\FILESERVER\\KeToan` báo lỗi `0x80070035 The network path was not found`, nhưng mở `\\\\192.168.10.20\\KeToan` thì hiện ra toàn bộ thư mục ngay lập tức."
        },
        {
          term: "Quy tắc Giao thoa SMB Share Permission & NTFS Security Permission",
          shortDef: "Khi truy cập qua mạng (`\\\\Server\\Share`), quyền thực tế của người dùng là quyền HẸP NHẤT (Most Restrictive) giữa tab Sharing (SMB) và tab Security (NTFS).",
          easyExplain: "Một điểm mù nữa của người dùng làm việc từ xa qua VPN: Máy tính cá nhân ở nhà của họ không Join Domain (đang đăng nhập bằng tài khoản Microsoft cá nhân hoặc Local `Admin-PC`). Khi họ bấm vào `\\\\192.168.10.20\\Data`, Windows tự động gửi tài khoản `Admin-PC` của máy ở nhà sang hỏi File Server Domain -> Tất nhiên bị báo `Access is Denied`! Họ cần nhập đúng định dạng `CORP\\username` và tài khoản đó phải có quyền trên cả Share lẫn NTFS.",
          realExample: "Kết nối TCP 445 thành công, nhưng hiện bảng báo `Access is denied` hoặc hỏi mật khẩu liên tục do người dùng nhập `minh.nguyen` thay vì `CORP\\minh.nguyen` trên máy tính cá nhân ở nhà."
        }
      ],
      comparisonTable: {
        title: "Bảng giải mã 6 tầng triệu chứng trong ca 'VPN Connected nhưng không vào được File Share'",
        headers: ["Tầng kiểm tra", "Phép thử kiểm chứng (Verification)", "Kết quả khi bị lỗi tại tầng này", "Cách xử lý an toàn (Chuẩn Senior)"],
        rows: [
          ["1. IP VPN & Routing trên Client", "`ipconfig /all` và `route print` (hoặc `tracert 192.168.10.20`)", "Không có dòng route `192.168.10.0 mask 255.255.255.0` đi qua IP VPN; `tracert` đi nhầm ra modem nhà mạng.", "Đẩy Route xuống Client (Classless Static Route / VPN Config) hoặc chạy `Add-VpnConnectionRoute` trên Windows."],
          ["2. Firewall trên Router (Forward Chain)", "`tracert 192.168.10.20` dừng ngay tại Hop 1 (IP VPN Gateway `10.10.99.1`), trên MikroTik thấy bộ đếm gói Drop tăng.", "`Request timed out` sau Hop 1; cả Ping lẫn Port 445 đều không đi qua được Router.", "Tạo Rule `chain=forward src-address=10.10.99.0/24 dst-address=192.168.10.20 protocol=tcp dst-port=445 action=accept` đặt TRƯỚC rule Drop."],
          ["3. Windows Firewall trên File Server", "`Test-NetConnection 192.168.10.20 -Port 445` từ máy VPN Client.", "`PingSucceeded: True` (hoặc False) nhưng **`TcpTestSucceeded: False`** (cổng 445 bị đóng với dải VPN).", "Mở Windows Defender Firewall trên File Server -> Rule `File and Printer Sharing (SMB-In)` -> Tab Scope -> Thêm dải `10.10.99.0/24` vào Remote IP."],
          ["4. Phân giải tên DNS", "So sánh mở `\\\\FILESERVER\\Share` với mở bằng IP `\\\\192.168.10.20\\Share`.", "Mở bằng tên `\\\\FILESERVER` báo lỗi *Network path not found*, nhưng mở bằng IP `\\\\192.168.10.20` vào được ngay!", "Cấu hình `dns-server=192.168.10.10` trong `/ppp profile` trên MikroTik và hướng dẫn dùng FQDN hoặc gán DNS Suffix `corp.local`."],
          ["5. Định danh xác thực (Credentials)", "Mở `\\\\192.168.10.20\\Share` trên máy cá nhân (Non-domain) ở nhà.", "Bật bảng hỏi Username/Password liên tục hoặc báo lỗi đăng nhập.", "Nhập tên đăng nhập có kèm tiền tố Domain: `CORP\\username` và lưu vào Windows Credential Manager."],
          ["6. Quyền SMB Share & NTFS", "Đã xác thực đúng tài khoản `CORP\\username` nhưng mở thư mục con bị chặn.", "Báo lỗi `You do not have permission to access \\\\192.168.10.20\\Share` (`Access is denied`).", "Kiểm tra tab **Effective Access** trên File Server; cấp quyền cho Security Group của phòng ban đó (Tuyệt đối KHÔNG dùng Everyone Full Control!)."]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Khi chẩn đoán sự cố kết nối dịch vụ qua mạng (như VPN vào SMB File Share), nguyên tắc cốt lõi là <b>'Kiểm tra từ tầng thấp lên tầng cao (Bottom-Up: L3 IP/Route -> L4 TCP Port 445 -> L7 DNS & Auth/Permission)'</b> và <b>'Dùng phép thử so sánh (Ping vs Port 445, Tên vs IP)'</b>.<ul><li>Đừng bao giờ chỉ dùng lệnh <code>ping</code> để kết luận mạng thông hay đứt! <code>ping</code> dùng giao thức ICMP (Layer 3), trong khi File Share dùng giao thức SMB chạy trên <b>TCP Port 445</b> (Layer 4/7). Có những trường hợp chặn ICMP nhưng mở TCP 445, hoặc ngược lại cho phép Ping nhưng chặn TCP 445. Công cụ chuẩn xác nhất trên Windows là <code>Test-NetConnection &lt;IP_Server&gt; -Port 445</code>.</li><li>Tuyệt đối tuân thủ nguyên tắc <b>Zero-Trust / Least Privilege</b>: Khi phát hiện lỗi do Firewall chặn hoặc thiếu quyền File Share, bạn chỉ mở đúng dải IP nguồn, đúng IP đích, đúng cổng `TCP 445` và cấp quyền đúng `Security Group`. Việc tắt hẳn Firewall hoặc cấp quyền `Everyone Full Control` để 'chữa cháy' là hành vi tự sát trước Ransomware.</li></ul>",
      flowTitle: "Quy trình 6 bước Chẩn đoán 'VPN Connected nhưng không vào được File Share'",
      flowSteps: [
        {
          step: "Bước 1: Kiểm tra IP VPN & Bảng định tuyến (Layer 3 Client)",
          title: "Xác nhận máy trạm đã có IP VPN và biết đường đi tới dải LAN Server",
          detail: "Chạy `ipconfig` xem PPP/VPN Adapter đã nhận đúng IP trong dải VPN Pool (ví dụ `10.10.99.x`) chưa. Chạy `route print` hoặc `tracert -d 192.168.10.20` xem gói tin đầu tiên có đi vào cổng VPN (`10.10.99.1`) hay đi nhầm ra modem Internet ở nhà (`192.168.1.1`).",
          packetOrState: "Bằng chứng: Hop 1 của `tracert -d 192.168.10.20` là `10.10.99.1` -> Định tuyến trên máy trạm đã ĐÚNG."
        },
        {
          step: "Bước 2: Kiểm tra cổng TCP 445 xuyên qua Firewall (Layer 4)",
          title: "Dùng Test-NetConnection kiểm tra thông mạch tới cổng SMB 445 của File Server",
          detail: "Trên máy VPN Client, mở PowerShell chạy lệnh: `Test-NetConnection -ComputerName 192.168.10.20 -Port 445`. Lệnh này kiểm tra đồng thời cả Routing, Router Firewall Forward Chain và Windows Firewall trên File Server.",
          packetOrState: "Bằng chứng: Nếu `TcpTestSucceeded : False`, lỗi nằm ở Firewall trên Router MikroTik (Forward chain) hoặc Windows Firewall trên File Server."
        },
        {
          step: "Bước 3: Tách lỗi Router Firewall vs Windows Server Firewall",
          title: "Xem gói tin TCP SYN 445 bị chặn ở Router hay ở chính File Server",
          detail: "Kiểm tra bảng `/ip firewall filter` trên MikroTik xem có rule cho phép `10.10.99.0/24` tới `192.168.10.20` port `445` nằm trên các rule Drop không. Nếu trên Router đã Accept (bộ đếm Packets tăng), thì thủ phạm chính là Windows Defender Firewall trên File Server đang để Scope = LocalSubnet.",
          packetOrState: "Bằng chứng: Sau khi mở đúng rule TCP 445 cho dải `10.10.99.0/24`, chạy lại `Test-NetConnection` trả về `TcpTestSucceeded : True`."
        },
        {
          step: "Bước 4: Tách lỗi DNS và Quyền truy cập (Layer 7)",
          title: "Thử truy cập bằng IP so với bằng Tên và kiểm tra quyền SMB/NTFS",
          detail: "Trong hộp thoại Run (`Win + R`), gõ `\\\\192.168.10.20\\Share`. Nếu vào được bằng IP mà không vào được bằng `\\\\FILESERVER\\Share` -> Sửa cấu hình DNS đẩy qua VPN. Nếu báo `Access is denied` -> Kiểm tra định dạng đăng nhập `CORP\\username` và quyền Effective Access trên Server.",
          packetOrState: "Kết quả: Người dùng truy cập mượt mà cả bằng IP lẫn tên miền nội bộ với đúng quyền hạn của phòng ban."
        }
      ],
      asciiDiagram: `
        [ VPN BÁO "CONNECTED" NHƯNG KHÔNG VÀO ĐƯỢC \\\\FILESERVER\\DATA ]
                                       │
          BƯỚC 1: Mở Run (Win+R) gõ thử bằng IP: \\\\192.168.10.20\\Data
                                       │
         ┌─────────────────────────────┴─────────────────────────────┐
         ▼ (VÀO ĐƯỢC BẰNG IP!)                                       ▼ (BẰNG IP CŨNG KHÔNG VÀO ĐƯỢC)
  [100% LỖI DO DNS!]                                     BƯỚC 2: Mở PowerShell trên máy Client:
  - VPN Split Tunnel chưa đẩy                            Test-NetConnection 192.168.10.20 -Port 445
    DNS nội bộ xuống Client                                          │
  - Chưa có DNS Suffix (corp.local)            ┌─────────────────────┴─────────────────────┐
  -> Sửa: Thêm dns-server trong                ▼ (TcpTestSucceeded: TRUE)                  ▼ (TcpTestSucceeded: FALSE)
     /ppp profile trên MikroTik       [THÔNG MẠNG! LỖI XÁC THỰC / QUYỀN]        [TẮC ĐƯỜNG MẠNG / FIREWALL PORT 445]
                                      - Máy ở nhà chưa nhập CORP\\user                     │
                                      - Thiếu quyền SMB Share hoặc NTFS          BƯỚC 3: tracert -d 192.168.10.20
                                      -> Sửa Credential & Effective Access                 │
                                                                             ┌─────────────┼─────────────┐
                                                                             ▼             ▼             ▼
                                                                       [Đi ra Modem  [Dừng ở Hop 1 [Qua Hop 1 nhưng
                                                                        nhà 192.168   10.10.99.1]   Port 445 đóng]
                                                                        .1.1]              │             │
                                                                          │          [Router FW    [Windows Firewall
                                                                       [Thiếu Route   Forward       trên File Server
                                                                        VPN Client]   đang Drop!]   chặn khác Subnet]`,
      keyTakeaways: [
        "Phép thử nhanh nhất mất 5 giây: Thử truy cập bằng địa chỉ IP (`\\\\192.168.10.20\\Share`) thay vì bằng tên (`\\\\Server\\Share`). Nếu bằng IP vào được thì 100% là lỗi phân giải tên DNS qua VPN.",
        "Lệnh `Test-NetConnection <IP_Server> -Port 445` là tiêu chuẩn vàng để kiểm chứng kết nối SMB (vượt trội hoàn toàn so với lệnh `ping` thông thường).",
        "VPN Connected chỉ chứng minh gói tin đi vào được `Input chain` của Router; còn để truy cập vào mạng LAN phía sau Router thì bắt buộc phải được cho phép ở `Forward chain`.",
        "Đừng quên kiểm tra Windows Defender Firewall trên chính máy chủ File Server: mặc định nhiều rule SMB-In chỉ cho phép `LocalSubnet` nên sẽ chặn các IP đến từ dải VPN khác lớp mạng."
      ]
    },
    level3_practice: {
      scenario: "Tối thứ Năm, Trưởng phòng Kế toán (`CORP\\lan.tran`) làm việc tại nhà kết nối VPN L2TP/IPsec về công ty để duyệt báo cáo tài chính. Chị Lan gửi ảnh chụp màn hình: Biểu tượng VPN đã báo **Connected** (nhận IP VPN `10.10.99.12`), chị vẫn lướt web bình thường (do dùng Split Tunnel), nhưng khi bấm vào ổ đĩa kế toán `\\\\FILESERVER\\KeToan` (IP của FILESERVER là `192.168.10.20`) thì quay tròn rất lâu rồi báo lỗi `Windows cannot access \\\\FILESERVER\\KeToan (0x80070035)`. Hãy chẩn đoán và xử lý từng bước.",
      steps: [
        {
          title: "Bước 1: Kiểm tra Routing và Test Port 445 từ máy trạm của chị Lan",
          instruction: "Hỗ trợ từ xa (UltraViewer/AnyDesk) vào máy chị Lan, mở PowerShell kiểm tra đường đi tới IP `192.168.10.20` và kiểm tra cổng TCP 445.",
          commandOrConfig: `# 1. Kiểm tra bảng định tuyến xem đã có đường tới mạng 192.168.10.0/24 qua VPN chưa
Get-NetRoute -DestinationPrefix "192.168.10.0/24"
# Hoặc kiểm tra bằng tracert:
tracert -d 192.168.10.20

# 2. Kiểm tra kết nối thẳng tới cổng SMB 445 của File Server (192.168.10.20)
Test-NetConnection -ComputerName 192.168.10.20 -Port 445`,
          explanation: "Kết quả cho thấy: `tracert -d 192.168.10.20` đi qua Hop 1 là `10.10.99.1` (cổng VPN trên Router MikroTik), nghĩa là trên máy chị Lan đã có Route đúng vào hầm VPN! Tuy nhiên, ngay sau Hop 1 là dấu `* * * Request timed out`, và lệnh `Test-NetConnection` trả về `TcpTestSucceeded : False`. Như vậy gói tin đang bị chặn tại Router MikroTik hoặc tại chính File Server."
        },
        {
          title: "Bước 2: Kiểm tra và mở Rule Forward Chain an toàn trên Router MikroTik",
          instruction: "SSH vào Router MikroTik trung tâm, kiểm tra các Rule trong `/ip firewall filter` thuộc `chain=forward`. Phát hiện có một Rule `Drop all from VPN to LAN` ở cuối bảng mà chưa có Rule ngoại lệ cho phép chị Lan (hoặc dải VPN Kế toán) truy cập vào File Server.",
          commandOrConfig: `# 1. Xem danh sách các rule trong chuỗi forward kèm số thứ tự
/ip firewall filter print where chain=forward

# 2. Thêm Rule cho phép dải VPN (10.10.99.0/24) truy cập ĐÚNG IP File Server (192.168.10.20) trên cổng SMB (TCP 445) và ICMP (để ping kiểm tra)
/ip firewall filter add chain=forward src-address=10.10.99.0/24 dst-address=192.168.10.20 protocol=tcp dst-port=445 action=accept comment="Allow VPN to FileServer SMB 445" place-before=[find comment="Drop all other forward"]
/ip firewall filter add chain=forward src-address=10.10.99.0/24 dst-address=192.168.10.20 protocol=icmp action=accept comment="Allow VPN Ping FileServer" place-before=[find comment="Drop all other forward"]`,
          explanation: "Chú ý nguyên tắc an toàn vận hành: Ta chỉ mở đúng `dst-address=192.168.10.20` và `dst-port=445` (Principle of Least Privilege) và đặt `place-before` lên trên rule Drop cuối bảng. Quay lại máy chị Lan chạy thử `ping 192.168.10.20` thấy đã thông (`Reply from 192.168.10.20: time=14ms`), NHƯNG `Test-NetConnection 192.168.10.20 -Port 445` vẫn báo `False`!"
        },
        {
          title: "Bước 3: Xử lý bẫy Scope 'LocalSubnet' trên Windows Defender Firewall của File Server",
          instruction: "Vì Ping đã tới được `192.168.10.20` nhưng cổng 445 vẫn đóng đối với IP nguồn `10.10.99.12`, ta đăng nhập vào máy chủ `FILESERVER` (`192.168.10.20`) và kiểm tra Rule SMB-In trên Windows Firewall bằng PowerShell.",
          commandOrConfig: `# 1. Trên FILESERVER, kiểm tra cấu hình RemoteAddress (Scope) của Rule SMB-In
Get-NetFirewallRule -DisplayGroup "File and Printer Sharing" | Where-Object {$_.Name -like "*SMB-In*" -and $_.Enabled -eq "True"} | Get-NetFirewallAddressFilter

# Phát hiện RemoteAddress đang giới hạn ở "LocalSubnet" (chỉ cho phép 192.168.10.0/24)!
# 2. Cập nhật Scope cho phép cả LocalSubnet lẫn dải VPN 10.10.99.0/24 (Không tắt Firewall!):
Set-NetFirewallRule -Name "FPS-SMB-In-TCP" -RemoteAddress @("LocalSubnet", "10.10.99.0/24")`,
          explanation: "Sau khi thêm `10.10.99.0/24` vào `RemoteAddress` của rule `FPS-SMB-In-TCP`, chạy lại `Test-NetConnection 192.168.10.20 -Port 445` trên máy chị Lan trả về **`TcpTestSucceeded : True`** ngay lập tức!"
        },
        {
          title: "Bước 4: Xử lý lỗi DNS qua VPN và Lưu thông tin xác thực Domain",
          instruction: "Lúc này chị Lan mở bằng IP `\\\\192.168.10.20\\KeToan` đã hiện ra bảng đăng nhập và vào được dữ liệu, nhưng bấm vào Shortcut cũ `\\\\FILESERVER\\KeToan` vẫn lỗi tên. Hãy bổ sung DNS Server nội bộ vào PPP Profile trên MikroTik và lưu Credential trên máy chị Lan.",
          commandOrConfig: `# 1. Trên MikroTik, cấu hình đẩy DNS Server nội bộ (DC01: 192.168.10.10) xuống cho VPN Client
/ppp profile set [find name="profile-vpn-l2tp"] dns-server=192.168.10.10

# 2. Trên máy chị Lan, lưu thông tin đăng nhập Domain cho cả tên và IP của File Server để không bị hỏi lại mật khẩu:
cmdkey /add:FILESERVER /user:CORP\\lan.tran /pass:*
cmdkey /add:192.168.10.20 /user:CORP\\lan.tran /pass:*`,
          explanation: "Khi kết nối lại VPN, máy chị Lan nhận được DNS nội bộ `192.168.10.10`, phân giải được tên `FILESERVER` ra `192.168.10.20` và tự động dùng tài khoản `CORP\\lan.tran` đã lưu trong Credential Manager để mở thẳng thư mục `\\\\FILESERVER\\KeToan`."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Kết nối VPN dạng Split Tunnel (bỏ tích 'Use default gateway on remote network') thành công, nhưng không thể ping hay kết nối tới bất kỳ IP nào trong mạng LAN công ty.",
          hypothesis: "Máy trạm bị thiếu dòng định tuyến (Static Route) chỉ đường cho dải LAN công ty (`192.168.10.0/24`) đi qua giao diện VPN.",
          testCommand: "Trên máy trạm Windows: `route print -4` hoặc `Get-NetRoute`.",
          fix: "Sử dụng lệnh PowerShell `Add-VpnConnectionRoute -ConnectionName \"Ten_VPN\" -DestinationPrefix \"192.168.10.0/24\"` trên máy trạm (có thể đóng gói đẩy qua GPO/Script)."
        },
        {
          symptom: "Mở `\\\\192.168.10.20\\Share` bằng địa chỉ IP thì vào đọc ghi file bình thường, nhưng mở bằng tên `\\\\FILESERVER\\Share` thì báo lỗi `0x80070035 The network path was not found`.",
          hypothesis: "Kết nối mạng, Firewall và Permission đều đã thông suốt; lỗi 100% nằm ở việc máy trạm VPN không phân giải được tên NetBIOS/DNS `FILESERVER` sang IP `192.168.10.20`.",
          testCommand: "Chạy `nslookup FILESERVER` và `nslookup FILESERVER.corp.local` trên máy VPN Client.",
          fix: "Cấu hình VPN Server cấp IP của DNS nội bộ (`dns-server=192.168.10.10`), thiết lập DNS Suffix `corp.local` cho card VPN hoặc đổi Shortcut sang dùng tên FQDN `\\\\fileserver.corp.local\\Share`."
        },
        {
          symptom: "Chạy `ping 192.168.10.20` qua VPN thấy Reply 15ms rất mượt, nhưng chạy `Test-NetConnection 192.168.10.20 -Port 445` lại báo `TcpTestSucceeded: False`.",
          hypothesis: "Firewall trên Router mới chỉ mở ICMP mà chặn TCP 445, HOẶC Windows Defender Firewall trên máy chủ File Server đang chặn kết nối SMB-In từ các dải IP ngoài `LocalSubnet`.",
          testCommand: "Kiểm tra `/ip firewall filter print where chain=forward` trên Router và kiểm tra Scope của rule `File and Printer Sharing (SMB-In)` trên File Server.",
          fix: "Mở đúng cổng TCP 445 trên Forward Chain của Router và thêm dải IP VPN (`10.10.99.0/24`) vào danh sách Remote IP trong Scope của Windows Firewall trên File Server."
        },
        {
          symptom: "`Test-NetConnection -Port 445` đã báo `True`, nhưng khi mở thư mục `\\\\192.168.10.20\\KeToan` lại báo `Access is denied`.",
          hypothesis: "Máy tính cá nhân ở nhà đang gửi tài khoản Local của máy cá nhân để xác thực, hoặc tài khoản Domain của người dùng bị thiếu quyền trên một trong hai lớp (SMB Share Permission hoặc NTFS Permission).",
          testCommand: "Trên máy trạm: `klist` / `cmdkey /list`. Trên File Server: Chuột phải vào thư mục -> Properties -> Security -> Advanced -> **Effective Access**.",
          fix: "Lưu tài khoản chuẩn `CORP\\username` vào Windows Credential Manager trên máy trạm; trên Server kiểm tra và cấp quyền cho đúng Security Group ở cả Share và NTFS."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Nhân viên làm việc từ xa báo đã kết nối VPN thành công (Connected), vẫn ping được IP đầu hầm của Router, nhưng không truy cập được vào File Server `\\\\FILESERVER\\Data` trong công ty. Em hãy trình bày trình tự các bước kiểm tra của em?",
          wrongAnswer: "Dạ em sẽ vào máy chủ File Server tắt tạm Windows Firewall đi và vào mục Sharing cấp thêm quyền Everyone Full Control để xem bạn đó vào được chưa. Nếu vẫn chưa được thì em tạo lại tài khoản VPN mới cho bạn đó ạ.",
          rightAnswer: "Thưa anh/chị, em tuyệt đối không tắt Firewall hay gán quyền Everyone Full Control vì rất nguy hiểm cho dữ liệu công ty. Em sẽ khoanh vùng từ nhanh đến chi tiết qua 5 phép thử có bằng chứng:\n1. **Phép thử 5 giây (Thử bằng IP vs Tên)**: Em bảo người dùng mở Run gõ trực tiếp IP của File Server: `\\\\192.168.10.20\\Data`. Nếu vào được bằng IP mà không vào được bằng tên `\\\\FILESERVER`, em kết luận ngay 100% là **lỗi DNS qua VPN** (chỉ cần đẩy DNS nội bộ xuống VPN Profile hoặc dùng FQDN).\n2. **Kiểm tra cổng SMB 445 (`Test-NetConnection`)**: Nếu gõ bằng IP cũng không vào được, em mở PowerShell trên máy người dùng chạy lệnh `Test-NetConnection 192.168.10.20 -Port 445`.\n3. **Nếu `TcpTestSucceeded : False` (Tắc đường mạng/Firewall)**:\n   - Em kiểm tra **Bảng định tuyến (Route)** trên máy trạm (`route print` / `tracert -d 192.168.10.20`) xem mạng `192.168.10.0/24` đã đi qua cổng VPN chưa (rất hay gặp khi dùng Split Tunnel).\n   - Nếu đã đi vào VPN mà bị rớt tại Router, em kiểm tra **Firewall Filter (Forward chain)** trên Router MikroTik xem đã có rule `Accept` cho phép dải VPN truy cập IP File Server port `TCP 445` nằm trước rule `Drop` chưa.\n   - Nếu Router đã cho qua, em kiểm tra **Windows Defender Firewall trên chính File Server**: mở mục Scope của rule *File and Printer Sharing (SMB-In)* và bổ sung dải IP VPN vào (vì mặc định nó hay giới hạn ở `LocalSubnet`).\n4. **Nếu `TcpTestSucceeded : True` (Thông mạng nhưng bị chặn quyền)**:\n   - Em kiểm tra xem máy cá nhân ở nhà đã đăng nhập đúng định dạng `DOMAIN\\username` chưa (lưu trong Credential Manager), và kiểm tra quyền giao thoa **SMB Share + NTFS Security** trên File Server.",
          keyPoints: [
            "Trình bày mạch lạc, có thứ tự lớp lang: Thử IP vs Tên -> Test-NetConnection Port 445 -> Route -> Router Forward Firewall -> Windows Server Firewall Scope -> Credentials & SMB/NTFS Permission",
            "Nêu bật được lệnh `Test-NetConnection -Port 445` thay vì chỉ biết dùng `ping`",
            "Khẳng định nguyên tắc an toàn: Chỉ mở đúng IP, đúng Port 445, đúng Group — không bao giờ tắt Firewall hay mở Everyone Full Control"
          ]
        },
        {
          question: "Nhà tuyển dụng hỏi xoáy tiếp: 'Tại sao các máy tính ngồi trong mạng LAN văn phòng (`192.168.10.x`) vẫn vào được File Server (`192.168.10.20`) bình thường, на Router MikroTik anh cũng đã mở rule Forward cho phép tất cả (Accept All) từ VPN sang LAN rồi, mà máy VPN (`10.10.99.x`) vẫn báo lỗi không kết nối được cổng 445 của File Server?'",
          wrongAnswer: "Dạ nếu Router đã Accept All và mạng LAN vẫn vào được thì chắc chắn do phần mềm VPN trên máy khách bị lỗi hoặc giao thức SMB không chạy qua đường VPN được ạ.",
          rightAnswer: "Có 2 nguyên nhân kỹ thuật rất thực tế giải thích cho hiện tượng này:\n1. **Windows Defender Firewall trên File Server chặn IP khác Subnet (LocalSubnet Scope)**: Các máy trong văn phòng có IP `192.168.10.x` nằm cùng Subnet `/24` với File Server (`192.168.10.20`) nên thỏa mãn điều kiện `Remote IP = LocalSubnet` trên Windows Firewall của Server. Trong khi đó, máy VPN đi vào mang Source IP là `10.10.99.x` (khác Subnet). Nếu Rule `File and Printer Sharing (SMB-In)` trên Windows Server chỉ cho phép `LocalSubnet` (thường gặp ở Public/Private Profile hoặc cấu hình bảo mật chặt), Windows Server sẽ âm thầm Drop gói TCP SYN 445 từ `10.10.99.x`.\n2. **File Server bị thiếu Default Gateway hoặc sai đường về (Asymmetric/Missing Return Route)**: Các máy trong cùng mạng LAN `192.168.10.0/24` nói chuyện trực tiếp với File Server qua Layer 2 (ARP/Switch) nên dù File Server đặt sai Default Gateway thì mạng LAN vẫn vào được! Nhưng khi gói tin từ mạng VPN `10.10.99.x` đi tới, File Server bắt buộc phải gửi gói trả lời qua Default Gateway (IP của Router MikroTik). Nếu File Server đặt sai Gateway, gói tin trả về sẽ bị mất.",
          keyPoints: [
            "Chỉ ra được điểm khác biệt cốt lõi: Mạng LAN là cùng Subnet (Layer 2), còn VPN là khác Subnet (Layer 3)",
            "Nêu trúng 2 thủ phạm ẩn: (1) Scope `LocalSubnet` trên Windows Firewall của File Server, và (2) Sai/thiếu Default Gateway trên chính File Server"
          ]
        },
        {
          question: "Trên Router MikroTik, tại sao khi em tạo một Firewall Filter Rule trong `chain=input` để cho phép dải VPN `10.10.99.0/24` thì kết nối VPN báo Connected, nhưng người dùng vẫn không đi sang được mạng LAN `192.168.10.0/24`?",
          wrongAnswer: "Dạ vì trên MikroTik phải cấu hình thêm NAT Masquerade cho tất cả các cổng LAN thì các mạng mới nhìn thấy nhau được ạ.",
          rightAnswer: "Bởi vì trong kiến trúc Packet Flow của MikroTik RouterOS (cũng như Linux Netfilter/iptables), hai chuỗi **`input`** và **`forward`** có nhiệm vụ hoàn toàn tách biệt:\n- **`chain=input`**: Chỉ xử lý các gói tin có **địa chỉ IP đích là chính con Router MikroTik** (ví dụ: người dùng bên ngoài kết nối VPN vào IP WAN của Router, hoặc Admin mở Winbox tới IP của Router).\n- **`chain=forward`**: Xử lý các gói tin **đi xuyên qua Router** từ giao diện mạng này sang giao diện mạng khác (ví dụ: từ giao diện ảo VPN `10.10.99.x` đi sang giao diện Bridge/VLAN LAN `192.168.10.20`).\nDo đó, để người dùng VPN truy cập được các máy chủ trong mạng LAN, Rule cho phép bắt buộc phải được đặt ở **`chain=forward`** và phải nằm phía trên (trước) Rule `action=drop` cuối bảng của chuỗi `forward`.",
          keyPoints: [
            "Phân biệt chuẩn xác `chain=input` (đích là chính Router) và `chain=forward` (đi xuyên qua Router sang mạng khác)",
            "Nhấn mạnh thứ tự xử lý từ trên xuống dưới (Top-down) trong bảng Firewall Filter"
          ]
        }
      ],
      quizzes: [
        {
          question: "Khi nhân viên kết nối VPN về công ty, họ gõ vào hộp thoại Run đường dẫn `\\\\192.168.10.20\\Data` thì mở được thư mục ngay lập tức, nhưng khi gõ `\\\\FILESERVER\\Data` thì lại báo lỗi không tìm thấy đường dẫn. Nguyên nhân chính xác là gì?",
          options: [
            "Cổng TCP 445 trên Firewall đang bị chặn.",
            "Tài khoản của nhân viên chưa được cấp quyền NTFS Read trên thư mục Data.",
            "Máy tính của nhân viên qua VPN chưa phân giải được tên `FILESERVER` sang địa chỉ IP `192.168.10.20` (lỗi DNS / thiếu DNS Suffix).",
            "Dịch vụ Server (LanmanServer) trên máy chủ File Server đang bị dừng."
          ],
          correctIndex: 2,
          explanation: "Việc truy cập thành công bằng địa chỉ IP (`\\\\192.168.10.20\\Data`) chứng minh đường truyền VPN, Routing, Firewall cổng 445, dịch vụ SMB và quyền hạn của User đều hoàn toàn bình thường. Việc thất bại khi dùng tên `\\\\FILESERVER` khẳng định 100% lỗi nằm ở khâu phân giải tên (DNS)."
        },
        {
          question: "Câu lệnh PowerShell nào trên Windows giúp bạn kiểm tra chính xác xem máy trạm có kết nối thông suốt tới cổng dịch vụ File Share (SMB) của máy chủ `192.168.10.20` hay không?",
          options: [
            "`ping 192.168.10.20 -t`",
            "`Test-NetConnection -ComputerName 192.168.10.20 -Port 445`",
            "`ipconfig /registerdns`",
            "`gpupdate /force`"
          ],
          correctIndex: 1,
          explanation: "Giao thức chia sẻ file SMB hiện đại hoạt động trực tiếp trên cổng TCP 445. Lệnh `Test-NetConnection -ComputerName 192.168.10.20 -Port 445` thực hiện bắt tay TCP 3 bước tới đúng cổng 445 để kiểm chứng cả Routing lẫn Firewall."
        },
        {
          question: "Một thư mục trên File Server được cấu hình quyền SMB Share là `Group_HR: Read` và quyền NTFS Security là `Group_HR: Modify (Read, Write, Delete)`. Khi một nhân viên thuộc nhóm `Group_HR` truy cập thư mục này từ xa qua mạng (`\\\\Server\\HR`), quyền thực tế họ thực hiện được là gì?",
          options: [
            "Chỉ có quyền Read (Đọc), không thể tạo mới hay xóa file.",
            "Có đầy đủ quyền Modify (Đọc, Ghi, Xóa).",
            "Có quyền Full Control.",
            "Không thể mở được thư mục (Access Denied)."
          ],
          correctIndex: 0,
          explanation: "Khi truy cập qua mạng (SMB), quyền hiệu lực cuối cùng giữa SMB Share Permission và NTFS Permission là quyền **hẹp nhất (Most Restrictive)** giữa hai bên. Vì SMB Share chỉ cho phép `Read`, nên dù NTFS có cho `Modify` thì người dùng đi qua mạng cũng chỉ có quyền `Read`."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 22: SỰ CỐ DISK, NAS & MALWARE (RA QUYẾT ĐỊNH THEO BUSINESS IMPACT)
  // =========================================================================
  {
    id: 22,
    code: "22",
    week: 4,
    title: "Sự cố Disk, NAS & Malware: Ra quyết định theo Mức độ ảnh hưởng (Business Impact)",
    subtitle: "Khi nào phải rút dây mạng cô lập ngay lập tức (Ransomware), khi nào phải giữ hệ thống chạy cầm chừng chờ hết ca sản xuất (RAID Degraded / High Disk I/O)",
    priority: "P1",
    duration: "75 phút",
    whyThisMatters: "Sự khác biệt lớn nhất giữa một kỹ thuật viên mới vào nghề và một System Administrator giàu kinh nghiệm nằm ở khả năng **Đánh giá rủi ro và Mức độ ảnh hưởng tới hoạt động kinh doanh (Business Impact Assessment)**. Nếu một máy trạm có dấu hiệu mã hóa dữ liệu (Ransomware) mà bạn còn chần chừ ngồi quét virus thử xem sao -> Cả NAS công ty sẽ bị mã hóa sạch sau 15 phút. Ngược lại, nếu NAS đang giữa ca xuất hàng cao điểm chỉ báo lỗi '1 ổ cứng hỏng - RAID 5 Degraded' hoặc 'Disk I/O 95%' mà bạn lại vội vàng tắt NAS hay bấm Rebuild ngay giữa giờ hành chính -> Bạn sẽ làm treo toàn bộ dây chuyền sản xuất hoặc làm chết nốt ổ cứng thứ 2! Bài này dạy bạn bản lĩnh ra quyết định đúng thời điểm.",
    analogy: {
      title: "Phân loại cấp cứu Y khoa: Bệnh truyền nhiễm nguy hiểm vs Xe tải bị xẹp 1 bánh kép trên cao tốc",
      content: "Hãy so sánh 2 tình huống khẩn cấp hoàn toàn trái ngược nhau về cách phản ứng:\n\n1. **Tình huống Malware / Ransomware (Căn bệnh truyền nhiễm tối nguy hiểm)**: Khi phát hiện một người trong tòa nhà đang phát tán virus lây qua đường hô hấp cực nhanh sang tất cả các phòng, ưu tiên số 1 KHÔNG PHẢI là ngồi hỏi xem họ ăn gì sáng nay hay chờ hết giờ làm việc, mà là **CÁCH LY NGAY LẬP TỨC (rút dây mạng, tắt Wi-Fi, khóa cổng Switch)** trong từng giây để cứu 200 người còn lại và cứu kho tài liệu trung tâm (NAS/File Server).\n2. **Tình huống RAID 5/SHR báo Degraded 1 ổ hoặc Disk I/O cao (Xe tải 18 bánh bị nổ 1 lốp trong cụm bánh kép khi đang chở hàng gấp)**: Nhờ thiết kế bánh kép dự phòng (RAID Parity), chiếc xe vẫn đang chạy được để kịp giao chuyến hàng quan trọng lúc 17h00. Nếu bạn phanh gấp tắt máy ngay giữa cầu hoặc bắt xe tăng tốc hết cỡ để vừa chạy vừa ép lại lốp (Rebuild RAID ngay giờ cao điểm), sức nặng dồn lên các lốp cũ còn lại sẽ làm **nổ tiếp lốp thứ 2** -> Xe lật nhào (Mất toàn bộ dữ liệu mảng RAID)! Quyết định khôn ngoan là: Giảm tải cho xe chạy êm qua hết ca giao hàng, kiểm tra xem hàng dự phòng (Backup) đã an toàn chưa, rồi tối muộn mới thay lốp mới và Rebuild."
    },
    level1_definitions: {
      concepts: [
        {
          term: "Nguyên tắc 'Contain First, Investigate Later' đối với Ransomware",
          shortDef: "Khi phát hiện dấu hiệu mã hóa file hàng loạt (đổi đuôi file lạ, xuất hiện file README đòi tiền chuộc), hành động đầu tiên trong 30 giây là CÔ LẬP MẠNG ngay lập tức.",
          easyExplain: "Ransomware hiện đại không chỉ mã hóa ổ C:, D: của chiếc máy bị nhiễm, mà nó lập tức quét toàn bộ các ổ đĩa mạng Map Drive (`Z:`, `\\\\NAS\\Share`) và dùng lỗ hổng SMB để lây lan sang các máy chủ khác. Mỗi giây chiếc máy đó còn cắm dây LAN hoặc còn bật Wi-Fi là hàng ngàn file trên File Server/NAS đang bị phá hủy. Vì vậy: Rút dây mạng / Disable cổng Switch ngay -> Vô hiệu hóa tài khoản AD của máy đó -> Tuyệt đối KHÔNG tắt nguồn đột ngột nếu cần giữ RAM để điều tra hoặc tránh kích hoạt cơ chế khóa Boot, chỉ ngắt kết nối mạng tuyệt đối.",
          realExample: "Nhân viên kế toán báo các file Excel trên ổ chung Z: tự nhiên biến thành đuôi `.locked` kèm file `HOW_TO_DECRYPT.txt`. Admin lập tức hô rút cáp mạng máy kế toán đó và vào NAS Synology ngắt kết nối phiên SMB của IP/User đó trong vòng 30 giây."
        },
        {
          term: "RAID 5 / Synology SHR Degraded State (Trạng thái suy giảm 1 ổ cứng)",
          shortDef: "Trạng thái mảng RAID mất đi 1 ổ cứng vật lý: Hệ thống VẪN ĐỌC GHI HOẠT ĐỘNG ĐƯỢC nhờ thuật toán Parity, nhưng không còn khả năng chịu lỗi nếu chết thêm ổ thứ 2.",
          easyExplain: "Nhiều bạn nghe tiếng bíp (Beep) báo động màu cam trên NAS Synology kèm chữ 'Storage Pool Degraded' là hoảng hốt tắt NAS ngay lập tức, làm cả công ty ngừng việc. Hãy bình tĩnh: RAID 5 / SHR-1 sinh ra chính là để hệ thống **tiếp tục chạy không gián đoạn (High Availability)** khi chết 1 ổ! Nhưng lúc này mảng RAID rất mong manh: nếu chết thêm 1 ổ nữa trong lúc chưa kịp xử lý thì toàn bộ Volume sẽ biến thành `Crashed` (mất sạch dữ liệu).",
          realExample: "NAS Synology 4 khay chạy SHR-1 (tương đương RAID 5) kêu bíp báo ổ Disk 2 bị `Crashed/Removed` lúc 10h00 sáng trong khi xưởng đang xuất hàng. Hệ thống File Share vẫn hoạt động bình thường nhưng hiệu năng đọc bị chậm hơn do phải tính toán lại từ Parity."
        },
        {
          term: "Rủi ro URE / Double-Fault khi Rebuild RAID giờ cao điểm",
          shortDef: "Quá trình Rebuild (Repair) RAID 5 bắt tất cả các ổ cứng còn lại phải đọc 100% từng Sector từ đầu đến cuối, tạo áp lực I/O cực đại có thể làm chết nốt ổ cứng thứ 2.",
          easyExplain: "Các ổ cứng trong cùng một NAS thường được mua cùng ngày, cùng lô sản xuất và đã chạy cùng số giờ như nhau. Khi ổ số 1 vừa chết vì già cỗi, các ổ số 2, 3, 4 cũng đã rất yếu. Nếu bạn cắm ổ mới vào bấm `Repair` ngay lúc 10h sáng (vừa phải đọc 100% mặt đĩa để tính XOR Parity tái tạo ổ mới, vừa phải phục vụ hàng trăm nhân viên đọc ghi file), đầu đọc sẽ hoạt động 100% công suất liên tục nhiều giờ. Nếu một ổ còn lại vấp phải Bad Sector hoặc quá nhiệt mà gục ngã -> Cả mảng RAID 5 sập hoàn toàn!",
          realExample: "Trước khi bấm Repair mảng RAID Degraded, Admin chuyên nghiệp luôn kiểm tra bản Backup mới nhất (hoặc copy ngay các thư mục quan trọng nhất sang thiết bị khác) và chỉ chạy Repair vào ban đêm khi tải I/O thấp."
        },
        {
          term: "Chẩn đoán High Disk I/O & Gần đầy ổ hệ thống (C: / Volume Full)",
          shortDef: "Sử dụng Resource Monitor, Task Manager hoặc `Get-Process` để tìm chính xác tiến trình (PID) và đường dẫn file nào đang chiếm dụng IOPS / dung lượng.",
          easyExplain: "Khi máy chủ Windows hoặc NAS bị đơ chậm vì Disk Active Time 100% hoặc ổ C: báo đỏ (còn dưới 1GB), tuyệt đối không xóa bừa các thư mục trong `C:\\Windows` và không khởi động lại máy chủ khi chưa biết nguyên nhân (khởi động lại lúc ổ C: còn 0MB có thể khiến Windows Server không khởi động lên được nữa hoặc làm lỗi Database!). Hãy dọn các file Log an toàn (`C:\\inetpub\\logs`, Temp) và giới hạn tác vụ ngầm (Antivirus Scan, Backup chạy nhầm giờ hành chính).",
          realExample: "File Server bị đơ lúc 14h00 chiều. Mở Resource Monitor -> tab Disk thấy tiến trình `MsMpEng.exe` (Windows Defender) và tác vụ Hyper Backup đang đồng thời quét toàn bộ 4TB dữ liệu do ai đó đặt nhầm lịch chạy ban ngày."
        }
      ],
      comparisonTable: {
        title: "Ma trận Ra quyết định (Decision Matrix) theo Mức độ ảnh hưởng Kinh doanh & An toàn Dữ liệu",
        headers: ["Tình huống sự cố", "Mức độ nguy hiểm dữ liệu", "Quyết định NGAY TRONG GIỜ HÀNH CHÍNH", "Hành động TUYỆT ĐỐI CẤM (Fatal Mistakes)"],
        rows: [
          ["1. Phát hiện file bị đổi đuôi lạ hàng loạt + đòi tiền chuộc (Ransomware)", "CỰC NGUY HIỂM (Lan truyền theo từng giây)", "ƯU TIÊN CÔ LẬP NGAY (Contain First): Rút cáp mạng máy nghi nhiễm, khóa cổng Switch, ngắt SMB Session và khóa User đó trên AD/NAS ngay lập tức dù đang giữa ca làm việc.", "Chờ hết giờ làm việc mới xử lý; hoặc mở quyền/cắm USB trực tiếp từ máy nhiễm sang máy lành để copy dữ liệu."],
          ["2. NAS / Server báo 1 ổ cứng hỏng (RAID 5 / SHR Degraded) giữa ca sản xuất", "CẢNH BÁO CAO (Vẫn chạy được nhưng mất lớp dự phòng)", "GIỮ HỆ THỐNG CHẠY CẦM CHỪNG qua hết ca sản xuất. Tắt tiếng Bíp cảnh báo, kiểm tra ngay bản Backup mới nhất đã có đủ dữ liệu hôm nay chưa, hạn chế các tác vụ nặng. Đợi hết ca mới thay ổ và bấm Repair.", "Rút nhầm ổ cứng đang sống (Healthy) ra khỏi khay; hoặc tắt nguồn NAS đột ngột; hoặc ép Rebuild tốc độ tối đa ngay lúc cao điểm khi chưa có Backup."],
          ["3. Máy chủ bị Disk I/O 100% làm ứng dụng phản hồi chậm", "TRUNG BÌNH - CAO (Ảnh hưởng hiệu năng vận hành)", "Mở `resmon.exe` (Resource Monitor) xem tiến trình nào đang ngốn Disk I/O. Nếu là tác vụ Backup/Antivirus Scan/Windows Update chạy nhầm giờ -> Tạm dừng (Pause/Stop) tác vụ đó để trả lại I/O cho sản xuất.", "Bấm nút Reset cứng máy chủ ngay lập tức (gây hỏng Database/File System đang ghi dở)."],
          ["4. Ổ đĩa C: của Windows Server hoặc Volume NAS đầy 99%", "CAO (Có thể làm dừng dịch vụ AD, SQL, SMB)", "Tìm và dọn dẹp các file rác/log an toàn (`C:\\Windows\\Temp`, IIS Logs, thùng rác `#recycle` trên NAS) để giải phóng ngay 5-10GB cho hệ thống thở, sau đó lên kế hoạch mở rộng đĩa ngoài giờ.", "Xóa thủ công thư mục `C:\\Windows\\WinSxS` hoặc `C:\\Windows\\Installer`, hoặc xóa Snapshot/LUN khi chưa biết bên trong chứa gì."]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Tư duy của một Senior System Admin khi đối mặt với khủng hoảng hạ tầng dựa trên câu hỏi: <b>'Nếu mình để hệ thống chạy tiếp thêm 2 tiếng nữa cho hết ca sản xuất, thiệt hại lớn hơn hay dừng ngay lập tức thiệt hại lớn hơn?'</b><ul><li><b>Với Malware / Ransomware</b>: Để chạy thêm 1 phút = Mất thêm hàng chục ngàn file trên Server. Vì vậy: <b>Cô lập mạng ngay lập tức (Zero Delay Containment)</b>.</li><li><b>Với RAID 5/SHR Degraded hoặc Disk I/O cao</b>: Hệ thống vẫn đang phục vụ được sản xuất. Dừng ngay lập tức = Cả nhà máy/công ty đình trệ. Vì vậy: <b>Giữ dịch vụ sống (Keep Business Running) + Bảo vệ dữ liệu trước (Verify Backup) + Thay thế/Rebuild trong khung giờ bảo trì (Maintenance Window)</b>.</li><li><b>Nguyên tắc vàng khi thay ổ cứng RAID</b>: Trước khi rút bất kỳ ổ cứng nào ra khỏi khay Server/NAS, bắt buộc phải đối chiếu <b>Số Serial Number (S/N)</b> và bật đèn định vị ổ hỏng (Drive Locator LED). Rút nhầm một ổ đang khỏe mạnh trong khi mảng RAID 5 đang Degraded đồng nghĩa với việc tự tay đánh sập toàn bộ mảng RAID!</li></ul>",
      flowTitle: "Quy trình Phản ứng khẩn cấp cho 2 kịch bản: Ransomware vs RAID Degraded",
      flowSteps: [
        {
          step: "Kịch bản A - Bước 1 (0 - 60 giây)",
          title: "Phát hiện Ransomware -> Cô lập vật lý và logic ngay lập tức",
          detail: "Ngay khi thấy file trên ổ chung bị đổi đuôi lạ (ví dụ `.encrypted`), lập tức rút dây mạng LAN / tắt Wi-Fi của máy trạm nghi nhiễm. Đồng thời vào NAS Synology (Resource Monitor -> Connected Users) hoặc Windows File Server (`Get-SmbSession`) để biết chính xác **IP và Username nào** đang thực hiện lệnh sửa/đổi tên file hàng loạt và ngắt kết nối (Disconnect / Disable User) ngay!",
          packetOrState: "Bằng chứng từ SMB Log / Resource Monitor: Tài khoản `CORP\\huy.le` từ IP `192.168.20.45` đang ghi đè 500 file/phút -> Khóa ngay tài khoản `huy.le` và khóa cổng Switch của IP `.45`."
        },
        {
          step: "Kịch bản A - Bước 2 (5 - 30 phút)",
          title: "Khoanh vùng phạm vi lây nhiễm và Khôi phục từ Immutable/Offline Snapshot",
          detail: "Kiểm tra các máy khác cùng VLAN xem có dấu hiệu bất thường không. Tuyệt đối không xóa dữ liệu bị mã hóa trước khi đánh giá xong, và sử dụng bản **Snapshot Read-Only** trên NAS Synology hoặc bản **Backup Offline/Cloud (quy tắc 3-2-1)** để khôi phục lại thư mục bị mã hóa về thời điểm cách đó vài giờ.",
          packetOrState: "Kết quả: Chỉ mất 15 phút dữ liệu thay đổi gần nhất, khôi phục sạch sẽ từ Snapshot mà không phải trả tiền chuộc."
        },
        {
          step: "Kịch bản B - Bước 1 (Giờ hành chính)",
          title: "NAS báo 1 ổ cứng hỏng (RAID 5 Degraded) -> Giữ nguyên vận hành & Kiểm tra Backup",
          detail: "vào Storage Manager trên NAS bấm `Beep Off` để tắt tiếng còi báo động gây hoang mang. Kiểm tra trạng thái các ổ còn lại (S.M.A.R.T status) xem có ổ nào đang báo Bad Sector không. Kiểm tra ngay bản Backup đêm qua và chạy sao lưu bổ sung các thư mục quan trọng nhất vừa phát sinh trong ngày sang thiết bị lưu trữ độc lập.",
          packetOrState: "Bằng chứng: Ổ Disk 3 (Serial: `WD-WCC4N12345`) bị lỗi `Crashed`. Các ổ Disk 1, 2, 4 đều `Healthy`. Bản Backup đã an toàn 100%."
        },
        {
          step: "Kịch bản B - Bước 2 (Ngoài giờ ca sản xuất)",
          title: "Xác nhận Serial Number, thay ổ cứng mới và Rebuild RAID an toàn",
          detail: "Sau khi hết ca làm việc, bật đèn nháy định vị (Locate Drive) cho Disk 3, đối chiếu đúng Serial Number `WD-WCC4N12345`, rút ổ hỏng ra, lắp ổ cứng Enterprise/NAS mới có dung lượng bằng hoặc lớn hơn vào, và vào Storage Pool bấm **Repair**.",
          packetOrState: "Kết quả: Quá trình Repair hoàn tất vào sáng hôm sau, mảng RAID trở lại trạng thái `Healthy` mà không gây ra bất kỳ phút giây Downtime nào cho công ty."
        }
      ],
      asciiDiagram: `
             [ SỰ CỐ HỆ THỐNG LƯU TRỮ / FILE SERVER / NAS ]
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
  [DẤU HIỆU RANSOMWARE]    [RAID 5 / SHR BÁO DEGRADED]   [DISK I/O 100% / ĐẦY Ổ]
  (File đổi đuôi lạ,        (Chết 1 ổ cứng vật lý         (Server phản hồi cực chậm,
   xuất hiện README.txt)     giữa ca làm việc)             ổ C: báo đỏ < 1GB)
          │                         │                         │
   ƯU TIÊN SỐ 1:             ƯU TIÊN SỐ 1:             ƯU TIÊN SỐ 1:
   CÔ LẬP TRONG 30 GIÂY!     GIỮ CA SẢN XUẤT CHẠY!     GIẢM TẢI & DỌN AN TOÀN!
          │                         │                         │
  1. Rút cáp LAN / Tắt      1. Tắt còi Beep, KHÔNG     1. Mở resmon.exe / Get-SmbOpenFile
     Wi-Fi máy nghi nhiễm      tắt NAS đột ngột!          xem Process nào chiếm I/O
  2. Xem SMB Session trên   2. Kiểm tra ngay bản       2. Tạm dừng Backup / AV Scan
     NAS/Server: Tìm IP &      Backup / Copy dữ liệu      đang chạy nhầm giờ hành chính
     User đang mã hóa file     quan trọng ra ngoài     3. Xóa file Temp, IIS Logs,
  3. Khóa User AD + Shutdown 3. Đợi HẾT CA LÀM VIỆC:      #recycle (KHÔNG xóa bừa
     cổng Switch của máy đó    Đối chiếu Serial Number    thư mục hệ thống WinSxS!)
  4. Khôi phục từ Snapshot     -> Thay ổ mới -> Repair`,
      keyTakeaways: [
        "Gặp Ransomware: Cô lập trước, điều tra sau (Contain First, Investigate Later). Tìm ngay IP và User đang mã hóa file qua bảng SMB Session trên File Server/NAS để cắt đứt kết nối trong 30 giây đầu tiên.",
        "Gặp RAID 5 / SHR Degraded (hỏng 1 ổ): Không tắt máy, không hoảng loạnRebuild ngay giữa giờ cao điểm nếu chưa kiểm tra Backup. Luôn xác minh bản Backup còn sống trước khi bấm Repair RAID.",
        "Trước khi rút ổ cứng khỏi Server/NAS, bắt buộc phải kiểm tra đèn báo (Drive LED) và đối chiếu đúng Serial Number của ổ bị lỗi để tránh thảm họa rút nhầm ổ đang sống.",
        "Khi ổ đĩa hệ thống đầy hoặc I/O 100%, dùng `resmon.exe` (Resource Monitor) để tìm thủ phạm thay vì khởi động lại máy chủ mù quáng."
      ]
    },
    level3_practice: {
      scenario: "Bạn đang trực vận hành tại nhà máy thì xảy ra 2 tình huống liên tiếp:\n- **Tình huống 1 (Lúc 10h15 sáng)**: Nhân viên phòng Mua hàng hốt hoảng gọi báo các file hợp đồng trên ổ đĩa mạng `\\\\FILESERVER\\Purchasing` tự nhiên không mở được, đuôi file biến thành `.lockbit` và xuất hiện file `Restore-My-Files.txt`.\n- **Tình huống 2 (Lúc 14h30 chiều cùng ngày)**: Thiết bị NAS Synology lưu trữ bản vẽ kỹ thuật của xưởng kêu tiếng Bíp dài liên tục, đèn Status nhấp nháy màu cam và báo `Storage Pool 1 has degraded (1/4 drives failing)` ngay lúc xưởng đang chạy đơn hàng gấp. Hãy xử lý chuẩn xác cả 2 tình huống.",
      steps: [
        {
          title: "Bước 1 (Tình huống 1): Truy tìm chính xác máy trạm đang mã hóa File Server và cắt đứt kết nối trong 30 giây",
          instruction: "Thay vì chạy đi hỏi từng người trong phòng Mua hàng xem máy ai bị nhiễm virus, bạn mở ngay PowerShell quyền Admin trên `FILESERVER` để xem phiên SMB nào đang mở và ghi các file `.lockbit` hoặc `Restore-My-Files.txt`.",
          commandOrConfig: `# 1. Liệt kê ngay các file đang bị mở/ghi liên quan đến mã độc để bắt tận tay IP và Username
Get-SmbOpenFile | Where-Object {$_.Path -like "*Restore-My-Files*" -or $_.Path -like "*.lockbit"} | Select-Object SessionId, ClientComputerName, ClientUserName, Path

# Giả sử phát hiện ClientComputerName = 192.168.30.55 và ClientUserName = CORP\\tuan.pham
# 2. Cắt đứt ngay lập tức toàn bộ phiên SMB từ máy 192.168.30.55 và khóa quyền truy cập SMB:
Close-SmbSession -ClientComputerName "192.168.30.55" -Force

# 3. Khóa ngay tài khoản CORP\\tuan.pham trên Active Directory để mã độc không thể tự kết nối lại:
Disable-ADAccount -Identity tuan.pham`,
          explanation: "Bằng lệnh `Get-SmbOpenFile` và `Close-SmbSession`, chỉ trong chưa đầy 30 giây bạn đã chặn đứng hành vi mã hóa từ xa của máy `192.168.30.55` mà không cần tắt cả máy chủ File Server (nhờ đó các phòng ban khác như Kế toán, Nhân sự, Sản xuất vẫn làm việc bình thường!). Ngay sau đó, bạn khóa cổng Switch của máy `.30.55` và xuống rút cáp mạng vật lý của máy đó."
        },
        {
          title: "Bước 2 (Tình huống 1): Khôi phục thư mục Purchasing từ Volume Shadow Copy / Snapshot",
          instruction: "Sau khi đã cô lập hoàn toàn máy tính của `tuan.pham` và xác nhận không còn file nào bị thay đổi thêm trên `FILESERVER`, tiến hành khôi phục thư mục `Purchasing` về bản chụp (Shadow Copy / Backup) lúc 08h00 sáng nay.",
          commandOrConfig: `# 1. Kiểm tra xem còn bất kỳ file .lockbit nào đang được tạo mới không
Get-ChildItem -Path "D:\\Shares\\Purchasing" -Filter "*.lockbit" -Recurse | Sort-Object LastWriteTime -Descending | Select-Object -First 5 FullName, LastWriteTime

# 2. Kiểm tra danh sách các bản Volume Shadow Copy hiện có trên ổ D: của File Server
vssadmin list shadows /for=D:

# 3. Đổi tên thư mục bị nhiễm sang Purchasing_Infected_Evidence (để giữ bằng chứng) và Restore thư mục Purchasing sạch từ Shadow Copy / Veeam Backup lúc 08:00 sáng.`,
          explanation: "Chỉ sau 15 phút, toàn bộ dữ liệu hợp đồng của phòng Mua hàng đã được khôi phục nguyên vẹn về trạng thái lúc 08h00 sáng. Riêng chiếc máy tính `192.168.30.55` của anh Tuấn được mang về phòng IT để cài trắng (Clean Install) lại hệ điều hành và rà soát nguồn lây (file đính kèm email giả mạo hóa đơn)."
        },
        {
          title: "Bước 3 (Tình huống 2): Xử lý cảnh báo NAS Synology báo RAID Degraded giữa ca sản xuất",
          instruction: "Đăng nhập vào giao diện quản trị DSM của NAS Synology (hoặc qua SSH). Không tắt NAS! Tắt tiếng còi báo động, kiểm tra xem ổ nào bị hỏng, các ổ còn lại có khỏe không, và kiểm tra ngay bản Backup.",
          commandOrConfig: `# Nếu kiểm tra nhanh qua giao diện DSM:
# Storage Manager -> Overview -> Bấm "Mute Beep" (Tắt còi).
# Vào HDD/SSD -> Xem ổ nào báo Crashed/Failed -> Ghi lại chính xác Số Thứ Tự Khay (ví dụ: Drive 2) và Số Serial Number (ví dụ: S460NF0M998877).

# Nếu kiểm tra qua SSH trên NAS Synology / Linux RAID (mdadm):
cat /proc/mdstat
# Kết quả hiển thị: md2 : active raid5 sda5[0] sdd5[3] sdc5[2]
#                   [4/3] [U_UU]  ---> Ổ thứ 2 (sdb) đã bị rớt khỏi mảng RAID 5!`,
          explanation: "Trạng thái `[4/3] [U_UU]` cho thấy mảng RAID 5 gồm 4 ổ đang chạy với 3 ổ khỏe mạnh (`U`), ổ số 2 (`_`) đã hỏng. Nhờ cơ chế Parity của RAID 5, xưởng sản xuất vẫn đang mở và lưu bản vẽ kỹ thuật bình thường. Bạn kiểm tra ngay tiến trình Hyper Backup / Active Backup thấy bản sao lưu đêm qua đã hoàn tất, đồng thời chạy đồng bộ nhanh các file bản vẽ vừa sửa trong sáng nay sang NAS dự phòng."
        },
        {
          title: "Bước 4 (Tình huống 2): Thay ổ cứng đúng Serial Number và chạy Repair RAID vào cuối ca",
          instruction: "Đợi đến 17h30 khi công nhân xưởng đã tan ca (tải I/O trên NAS giảm về gần 0%), tiến hành bật đèn định vị ổ hỏng, rút đúng ổ hỏng, cắm ổ cứng NAS mới vào và kích hoạt quá trình Repair.",
          commandOrConfig: `# 1. Trên giao diện DSM -> Storage Manager -> HDD/SSD -> Chọn Drive 2 -> Bấm "Locate Drive" (Đèn khay số 2 trên NAS sẽ nhấp nháy đỏ/cam).
# 2. Rút khay số 2 ra, ĐỐI CHIẾU SỐ SERIAL trên nhãn ổ cứng khớp đúng với "S460NF0M998877".
# 3. Lắp ổ cứng mới (cùng dòng Enterprise/NAS, dung lượng >= ổ cũ) vào khay số 2.
# 4. Vào Storage Manager -> Storage Pool 1 -> Bấm "Repair" -> Chọn Drive 2 mới lắp -> Apply.

# Theo dõi tiến độ Rebuild RAID:
cat /proc/mdstat
# [>....................]  recovery =  4.2% (16842012/4000787008) finish=312.5min speed=212450K/sec`,
          explanation: "Việc đợi đến 17h30 hết ca mới thay ổ và chạy Repair giúp tốc độ Rebuild đạt mức tối đa (hơn 200MB/s), hoàn thành ngay trong đêm mà không gây giật lag cho người dùng trong giờ làm việc, đồng thời giảm thiểu tối đa nguy cơ quá tải làm hỏng ổ cứng thứ 2."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Phát hiện nhiều file trên thư mục dùng chung của Server bị đổi sang đuôi lạ (`.encrypted`, `.lockbit`, `.akira`) kèm file `.txt` đòi tiền chuộc.",
          hypothesis: "Một máy trạm trong mạng LAN đã bị nhiễm Ransomware và đang thông qua quyền ghi ổ đĩa mạng (Mapped Drive / SMB Share) để mã hóa các file trên Server.",
          testCommand: "Trên File Server: `Get-SmbOpenFile` hoặc `Get-SmbSession` (trên NAS Synology: `Resource Monitor -> Connected Users` hoặc `Log Center -> File Transfer Log`).",
          fix: "Ngắt ngay phiên SMB (`Close-SmbSession`), khóa tài khoản AD của User đó (`Disable-ADAccount`), khóa cổng Switch và rút dây mạng máy trạm nhiễm mã độc. Sau đó Restore thư mục từ Snapshot/Backup sạch."
        },
        {
          symptom: "NAS Synology hoặc Server chạy RAID 5 / RAID 6 / SHR kêu bíp liên tục, báo đèn cam `Degraded` do 1 ổ cứng bị hỏng ngay trong giờ làm việc cao điểm.",
          hypothesis: "Một ổ cứng vật lý đã chết, mảng RAID đang chạy ở chế độ suy giảm (không còn lớp chịu lỗi nếu là RAID 5) nhưng dịch vụ vẫn đang hoạt động.",
          testCommand: "Kiểm tra `Storage Manager -> Storage Pool` & `HDD/SSD` để ghi nhận số khay, Serial Number ổ lỗi và trạng thái S.M.A.R.T của các ổ còn lại.",
          fix: "Tắt tiếng Bíp, giữ nguyên hệ thống cho hết ca làm việc, kiểm tra/sao lưu ngay dữ liệu quan trọng nhất, sau đó hết giờ làm việc mới đối chiếu đúng Serial Number để thay ổ mới và bấm `Repair`."
        },
        {
          symptom: "Tất cả người dùng kêu ca mở file trên Server cực kỳ chậm, kiểm tra Task Manager thấy Disk Active Time luôn ở mức 100%.",
          hypothesis: "Có một tiến trình ngầm (như phần mềm Backup, Antivirus Full Scan, Windows Search Indexer, hoặc 1 máy trạm đang copy hàng trăm GB) đang chiếm sạch băng thông IOPS của ổ cứng.",
          testCommand: "Mở `resmon.exe` (Resource Monitor) -> chuyển sang tab **Disk** -> sắp xếp cột **Total (B/sec)** giảm dần tại bảng `Processes with Disk Activity` và `Disk Activity`.",
          fix: "Xác định đúng Process và đường dẫn file đang gây nghẽn; tạm dừng (Pause/Reschedule) tác vụ Backup/Scan sang khung giờ đêm (22h00 - 05h00)."
        },
        {
          symptom: "Ổ đĩa C: trên Windows Server báo đỏ còn 0 MB trống, một số dịch vụ bắt đầu báo lỗi không ghi được log.",
          hypothesis: "Các file Log hệ thống (IIS Logs, CBS Logs, Windows Temp) hoặc file rác trong User Profile / Recycle Bin tích tụ lâu ngày không được xoay vòng (Log Rotation).",
          testCommand: "Dùng lệnh PowerShell hoặc công cụ TreeSize/WinDirStat quét nhanh dung lượng từng thư mục trên ổ C:.",
          fix: "Xóa các file trong `C:\\Windows\\Temp`, `C:\\inetpub\\logs\\LogFiles` (các file log cũ trên 30 ngày), làm rỗng Recycle Bin để cứu ngay vài GB trống; tuyệt đối không xóa thủ công thư mục `WinSxS`."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Đang lúc 10h sáng thứ Hai, cả công ty đang làm việc cao điểm thì thiết bị NAS Synology chạy RAID 5 (4 ổ cứng) kêu bíp báo động đỏ/cam vì chết 1 ổ cứng. Đồng thời lúc đó có một nhân viên báo máy tính của bạn ấy xuất hiện thông báo đòi tiền chuộc Ransomware. Nếu chỉ có một mình em trực, em xử lý cái nào trước, cái nào sau và xử lý như thế nào?",
          wrongAnswer: "Dạ vì con NAS chứa dữ liệu của cả công ty quan trọng hơn 1 máy nhân viên nên em sẽ chạy vào phòng Server tắt nguồn con NAS ngay để bảo vệ dữ liệu không bị hỏng thêm ổ cứng, sau đó em mới ra xem máy của bạn nhân viên bị virus gì ạ.",
          rightAnswer: "Thưa anh/chị, nếu đánh giá theo **Mức độ nguy hiểm thực tế (Risk & Business Impact)**, em bắt buộc phải xử lý **ca Ransomware trong 30 giây đầu tiên**, còn ca **NAS RAID 5 Degraded xử lý sau**:\n1. **Tại sao xử lý Ransomware trước ngay lập tức?**: Máy nhân viên bị Ransomware đang kết nối mạng LAN và rất có thể đang âm thầm mã hóa dữ liệu trên chính con NAS thông qua ổ đĩa mạng SMB! Mỗi giây chậm trễ là hàng ngàn file trên NAS bị hủy hoại. Em sẽ lập tức yêu cầu rút dây mạng LAN + tắt Wi-Fi của máy nhân viên đó, đồng thời mở giao diện NAS/File Server ngắt phiên SMB và khóa tài khoản AD của nhân viên đó ngay.\n2. **Tại sao NAS RAID 5 hỏng 1 ổ lại có thể bình tĩnh xử lý sau?**: Bản chất của RAID 5 là cho phép hỏng 1 ổ cứng mà hệ thống **vẫn đọc ghi và hoạt động bình thường** (trạng thái Degraded). Việc tắt nguồn NAS ngay lúc 10h sáng sẽ làm sập toàn bộ hoạt động của công ty một cách không cần thiết.\n3. **Cách em xử lý NAS RAID 5 chuẩn an toàn**: Sau khi đã cô lập xong máy nhiễm Ransomware, em vào NAS tắt còi Bíp, kiểm tra ngay bản Backup/Snapshot gần nhất đã an toàn chưa, giữ cho NAS chạy êm qua hết giờ hành chính. Đến chiều tối hết ca làm việc, em mới bật đèn định vị ổ hỏng, đối chiếu đúng **Serial Number**, rút ổ hỏng thay ổ mới vào và bấm **Repair** để quá trình Rebuild chạy vào ban đêm (tránh làm quá tải I/O gây chết ổ thứ 2 trong giờ làm việc).",
          keyPoints: [
            "Phân tích sắc bén thứ tự ưu tiên: Ransomware là mối đe dọa đang phá hủy dữ liệu theo từng giây -> Phải cô lập ngay lập tức",
            "Hiểu rõ bản chất RAID 5 Degraded: Vẫn duy trì hoạt động được, không được tắt NAS đột ngột làm gián đoạn sản xuất",
            "Nêu đủ quy trình vàng khi thay ổ RAID: Kiểm tra Backup trước -> Đợi ngoài giờ cao điểm -> Đối chiếu Serial Number -> Thay ổ và Repair"
          ]
        },
        {
          question: "Khi phát hiện các file trên thư mục dùng chung của Windows File Server đang bị đổi đuôi hàng loạt bởi Ransomware, làm thế nào em biết chính xác chiếc máy trạm nào trong số 200 máy tính của công ty đang là nguồn phát tán mã hóa lên Server?",
          wrongAnswer: "Dạ em sẽ đi từng tầng kiểm tra màn hình của 200 máy tính xem máy nào đang hiện bảng đòi tiền chuộc, hoặc em rút dây mạng của cả File Server ra rồi cắm lại từng phòng ban một để dò ạ.",
          rightAnswer: "Thưa anh/chị, đi kiểm tra từng máy trong 200 máy sẽ quá muộn vì dữ liệu trên Server sẽ bị mã hóa hết. Ngay trên chính chiếc máy chủ **Windows File Server** (hoặc trên **NAS Synology**), mọi thao tác mở và sửa file qua mạng đều được ghi nhận trực tiếp trong phiên **SMB Session**:\n1. **Trên Windows File Server**: Em mở PowerShell quyền Admin và gõ lệnh:\n   `Get-SmbOpenFile | Where-Object {$_.Path -like \"*.<đuôi_lạ>\"} | Select ClientComputerName, ClientUserName, Path`\n   (Hoặc mở công cụ `fsmgmt.msc` -> mục **Sessions** và **Open Files**). Chỉ mất 5 giây là em nhìn thấy ngay địa chỉ IP (`ClientComputerName`) và tài khoản (`ClientUserName`) nào đang mở hàng loạt file để mã hóa.\n2. **Trên NAS Synology**: Em nhìn vào `Resource Monitor -> Connected Users` hoặc `Log Center -> File Transfer Log` sẽ thấy ngay IP và User nào đang thực hiện lệnh Rename/Write liên tục.\n3. Ngay khi có IP và Username, em chạy lệnh `Close-SmbSession` để đá văng máy đó khỏi Server, khóa tài khoản AD (`Disable-ADAccount`) và khóa cổng Switch của máy đó ngay lập tức mà các phòng ban khác không bị gián đoạn.",
          keyPoints: [
            "Sử dụng đúng công cụ quản trị trên Server (`Get-SmbOpenFile`, `Get-SmbSession`, `fsmgmt.msc` hoặc `Connected Users` trên NAS) để tìm ra IP và User nguồn trong 5 giây",
            "Cô lập trúng đích (Targeted Containment) thay vì rút cáp cả Server làm tê liệt toàn công ty"
          ]
        },
        {
          question: "Tại sao các chuyên gia lưu trữ luôn cảnh báo rằng: 'Khi mảng RAID 5 đang bị Degraded (chết 1 ổ), hành động bấm Rebuild/Repair ngay lập tức khi chưa kiểm tra Backup là cực kỳ rủi ro'?",
          wrongAnswer: "Dạ vì khi bấm Rebuild thì phần mềm của NAS hay bị lỗi làm xóa nhầm dữ liệu trên các ổ cứng cũ ạ.",
          rightAnswer: "Lý do không phải do lỗi phần mềm xóa nhầm, mà do **nguyên lý vật lý và toán học của quá trình Rebuild RAID 5**:\n1. Để tái tạo lại dữ liệu cho ổ cứng mới từ thông tin Parity (XOR), bộ điều khiển RAID bắt buộc phải **đọc 100% từng Sector từ đầu đến cuối của tất cả các ổ cứng còn lại**.\n2. Các ổ cứng trong cùng một mảng RAID thường được mua cùng một lô, lắp cùng một ngày và chịu cùng một mức độ hao mòn cơ học như nhau. Khi ổ số 1 vừa chết vì tuổi thọ, các ổ số 2, 3, 4 cũng đang ở trạng thái rất nhạy cảm.\n3. Dưới áp lực đọc 100% công suất liên tục trong nhiều giờ liền để Rebuild (đặc biệt với các ổ cứng dung lượng lớn 8TB - 16TB), xác suất một trong các ổ còn lại gặp lỗi **URE (Unrecoverable Read Error / Bad Sector)** hoặc hỏng cơ hoàn toàn là rất cao. Trong RAID 5, chỉ cần lỗi thêm ổ thứ 2 trong lúc đang Rebuild là toàn bộ mảng RAID bị **Crashed (mất sạch dữ liệu)**.\nVì vậy, quy tắc sắt đá là: **Kiểm tra bản Backup (hoặc sao lưu ngay dữ liệu quan trọng nhất ra ngoài) TRƯỚC KHI bấm nút Repair RAID**, và luôn thực hiện Repair ngoài giờ cao điểm.",
          keyPoints: [
            "Giải thích được bản chất Rebuild RAID 5 phải đọc toàn bộ 100% các ổ cứng còn lại để tính toán XOR Parity",
            "Nêu rõ rủi ro các ổ cùng lô sản xuất dễ chết dây chuyền hoặc gặp lỗi URE/Bad Sector dưới tải I/O cực đại",
            "Khẳng định quy tắc: Verify Backup First -> Rebuild Later (Off-peak hours)"
          ]
        }
      ],
      quizzes: [
        {
          question: "Khi phát hiện một máy tính trong mạng nội bộ đang bị nhiễm Ransomware và bắt đầu mã hóa các file trên ổ đĩa mạng dùng chung, hành động ĐẦU TIÊN bạn phải thực hiện là gì?",
          options: [
            "Cài đặt phần mềm diệt virus mới lên máy đó và chờ quét toàn bộ ổ cứng (mất khoảng 2 giờ).",
            "Rút ngay dây cáp mạng LAN / tắt Wi-Fi của máy đó và ngắt phiên kết nối SMB / khóa tài khoản AD tương ứng trên Server để cô lập lập tức.",
            "Cắm một chiếc USB chứa dữ liệu quan trọng của bạn vào máy đó để chạy công cụ kiểm tra.",
            "Cấp quyền Everyone Full Control trên File Server để kiểm tra xem file nào bị lỗi."
          ],
          correctIndex: 1,
          explanation: "Đối với Ransomware, tốc độ cô lập mạng quyết định số lượng dữ liệu cứu sống được. Phải ngắt kết nối mạng (cả vật lý lẫn phiên SMB trên Server) ngay trong những giây đầu tiên để ngăn chặn mã độc mã hóa tiếp dữ liệu trên NAS/File Server."
        },
        {
          question: "Một thiết bị NAS chạy cấu hình RAID 5 gồm 4 ổ cứng (Disk 1, Disk 2, Disk 3, Disk 4). Trong giờ làm việc, Disk 2 bị hỏng hoàn toàn (Failed). Phát biểu nào sau đây là ĐÚNG về trạng thái của hệ thống lúc này?",
          options: [
            "Toàn bộ dữ liệu trên NAS đã bị mất sạch và không ai có thể truy cập được nữa.",
            "Hệ thống chuyển sang trạng thái Degraded: người dùng vẫn truy cập dữ liệu được bình thường, nhưng nếu hỏng thêm bất kỳ 1 ổ cứng nào nữa trước khi Rebuild xong thì toàn bộ dữ liệu sẽ bị mất.",
            "Dung lượng lưu trữ khả dụng của NAS tự động giảm đi một nửa.",
            "Bạn bắt buộc phải tắt nguồn NAS trong vòng 5 phút nếu không các ổ còn lại sẽ tự bốc cháy."
          ],
          correctIndex: 1,
          explanation: "RAID 5 sử dụng 1 ổ tương đương để lưu thông tin chẵn lẻ (Parity), cho phép chịu lỗi tối đa 1 ổ cứng. Khi hỏng 1 ổ, mảng RAID ở trạng thái Degraded (vẫn hoạt động nhưng mất khả năng chịu lỗi tiếp theo)."
        },
        {
          question: "Trước khi rút một ổ cứng bị báo hỏng ra khỏi khay Hotswap của Server/NAS đang chạy RAID Degraded, thao tác nào sau đây là BẮT BUỘC để tránh tai nạn làm sập cả mảng RAID?",
          options: [
            "Rút thử từng ổ ra xem khi nào hết tiếng kêu bíp thì dừng lại.",
            "Format toàn bộ Storage Pool trước khi rút ổ.",
            "Kiểm tra chính xác vị trí khay đĩa (Slot number), bật đèn định vị ổ cứng (Locate Drive LED) và đối chiếu trùng khớp Số Serial Number (S/N) của ổ bị hỏng.",
            "Tắt tường lửa trên Router MikroTik."
          ],
          correctIndex: 2,
          explanation: "Khi mảng RAID 5 đang Degraded (đã mất 1 ổ), nếu kỹ thuật viên nhìn nhầm thứ tự khay và rút nhầm một ổ cứng đang hoạt động tốt (Healthy), mảng RAID sẽ mất đồng thời 2 ổ và sập ngay lập tức. Do đó bắt buộc phải bật đèn định vị và đối chiếu Serial Number."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 23: SỰ CỐ WAN OUTAGE, MES & PRINTER (KHÔI PHỤC VẬN HÀNH SẢN XUẤT)
  // =========================================================================
  {
    id: 23,
    code: "23",
    week: 4,
    title: "Sự cố WAN Outage, MES & Printer: Tư duy Khôi phục Sản xuất & Phương án Tạm thời (Workaround)",
    subtitle: "Xử lý đứt cáp quang nhà mạng (Dual-WAN Failover), mất kết nối hệ thống MES/ERP xưởng sản xuất và treo máy in tem nhãn Barcode lúc xuất hàng gấp",
    priority: "P2",
    duration: "75 phút",
    whyThisMatters: "Trong môi trường nhà máy và doanh nghiệp sản xuất, mỗi phút dây chuyền đóng gói dừng hoạt động hoặc xe container phải nằm chờ ở cổng kho vì không in được tem nhãn / phiếu xuất kho là thiệt hại tiền tươi thóc thật. Ở các vị trí System & Network Admin cho doanh nghiệp sản xuất (Manufacturing/Factory IT), nhà tuyển dụng cực kỳ quan tâm: 'Khi xảy ra sự cố chưa thể sửa xong gốc rễ ngay trong 5 phút (ví dụ nhà mạng đứt cáp ngoài đường, máy in hỏng đầu nhiệt), em làm cách nào để dây chuyền sản xuất tiếp tục chạy được ngay (Workaround)?'. Bài học này rèn cho bạn tư duy **Business Continuity (Duy trì hoạt động liên tục)**: Tìm đường vòng cho sản xuất chạy trước, sửa căn cơ sau.",
    analogy: {
      title: "Cầu chính bị tắc khi xe cấp cứu đang đi giao hàng: Mở ngay cầu phao phụ!",
      content: "Hãy tưởng tượng bạn là Chỉ huy giao thông của một nhà máy đang cần xuất 10 xe container hàng hóa ra cảng trước 16h00 chiều:\n\n1. **Sự cố WAN Outage (Sập cầu chính ra quốc lộ)**: Nếu cây cầu chính (nhà mạng ISP 1 - Viettel) bị xe tai nạn chặn ngang, một người chỉ huy tồi sẽ đứng ở đầu cầu gọi điện mắng đơn vị quản lý cầu rồi bắt 10 xe hàng đứng chờ 4 tiếng cho đến khi họ dọn xong. Một người chỉ huy giỏi đã chuẩn bị sẵn **Cầu phụ (ISP 2 - VNPT hoặc cục phát 4G/5G dự phòng)** để chuyển làn xe sang đi ngay trong 10 giây!\n2. **Sự cố Máy in tem nhãn Barcode bị treo (Hỏng trạm đóng dấu ở Cổng số 1)**: Nếu máy đóng dấu mã vạch ở dây chuyền số 1 bị kẹt giấy/treo lệnh in, đừng bắt 20 công nhân đứng khoanh tay chờ bạn tháo từng con ốc máy in ra sửa. Hãy lập tức **chuyển hướng lệnh in (Print Redirection / Printer Pooling)** sang chiếc máy in đang rảnh ở dây chuyền số 2 cách đó 5 mét để công nhân lấy tem dán tiếp, còn bạn mang chiếc máy lỗi về bàn kỹ thuật xử lý!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Workaround (Phương án thay thế tạm thời) vs Root Cause Fix (Xử lý tận gốc)",
          shortDef: "Workaround là giải pháp nhanh giúp người dùng/dây chuyền sản xuất tiếp tục làm việc được ngay lập tức, trong khi chờ hoàn tất việc sửa chữa nguyên nhân gốc rễ.",
          easyExplain: "Trong quản trị dịch vụ IT (ITIL), khi xảy ra sự cố nghiêm trọng làm gián đoạn sản xuất, mục tiêu số 1 là **Khôi phục dịch vụ (Restore Service)** nhanh nhất có thể bằng Workaround, sau đó mới đi vào **Quản lý vấn đề (Problem Management)** để tìm Root Cause. Ví dụ: Đứt đường cáp quang chính -> Chuyển sang đường 4G/WAN2 là Workaround; nhà mạng hàn lại mối cáp quang bị đứt là Root Cause Fix.",
          realExample: "Máy in tem Zebra ở chuyền đóng gói số 1 bị cháy nguồn lúc đang đóng hàng gấp. Workaround trong 2 phút: Trỏ IP/Share Name cổng in của chuyền 1 sang máy in dự phòng (hoặc máy in chuyền 2) để công nhân in tiếp; sau đó mới gửi máy hỏng đi bảo hành."
        },
        {
          term: "WAN Outage vs DNS Outage vs LAN Outage (Phân biệt 3 cấp độ 'Mất mạng')",
          shortDef: "Người dùng luôn gọi chung mọi sự cố là 'Mất mạng rồi em ơi!', nhưng Admin phải dùng 3 lệnh Ping/Tracert để biết đứt ở LAN, đứt ở WAN hay chỉ chết DNS.",
          easyExplain: "Khi cả văn phòng kêu 'Mất Internet':\n1. Ping Default Gateway (`192.168.10.1`): Nếu mất -> Lỗi mạng nội bộ (LAN/Switch/Loop).\n2. Ping IP ngoài Internet (`8.8.8.8`): Nếu mất -> Đứt đường truyền WAN (Modem/ISP). Nhưng nếu Ping `8.8.8.8` VẪN THÔNG mà mở trình duyệt gõ `google.com` không vào được -> Đường truyền Internet vẫn sống 100%, chỉ bị chết **DNS Server**!\n3. Cực kỳ lưu ý với Dual-WAN: Có trường hợp cáp từ Router tới Modem nhà mạng vẫn sáng đèn (Gateway ISP vẫn trả lời Ping), nhưng từ trạm nhà mạng đi ra quốc tế bị đứt -> Phải dùng kỹ thuật **Recursive Routing / Netwatch** kiểm tra xuyên tới `8.8.8.8` / `1.1.1.1` thì Failover mới tự động chuyển mạch chính xác!",
          realExample: "Đường cáp quang FTTH bị đứt ngoài cột điện nhưng cục Modem nhà mạng trong tủ rack vẫn bật nguồn nên cổng WAN1 trên MikroTik vẫn báo `Running`. Nhờ cấu hình Check-Gateway bằng Recursive Route kiểm tra tới `8.8.8.8`, MikroTik phát hiện mất Internet thật sự và tự động đẩy lưu lượng sang WAN2."
        },
        {
          term: "Kiến trúc kết nối Hệ thống Sản xuất (MES / ERP Client - Server - Database)",
          shortDef: "Các phần mềm điều hành sản xuất (MES) dưới xưởng thường kết nối từ máy trạm/PDA qua mạng LAN/Wi-Fi về App Server và Database Server (SQL/Oracle) qua các cổng TCP cố định.",
          easyExplain: "Khi dây chuyền báo 'Phần mềm MES bị treo không quét được mã vạch sản phẩm', bạn cần khoanh vùng ngay theo 3 lớp:\n- **Lớp 1 (Trạm đơn lẻ)**: Chỉ 1 máy quét ở Chuyền 1 lỗi -> Kiểm tra kết nối Wi-Fi, file cấu hình (`config.ini` / `hosts`), hoặc treo tiến trình phần mềm trên máy đó.\n- **Lớp 2 (Mạng khu vực)**: Cả Xưởng B không kết nối được MES -> Kiểm tra Switch/AP Xưởng B và đường truyền về VLAN Server.\n- **Lớp 3 (Máy chủ MES / Database)**: Toàn bộ nhà máy đều báo lỗi -> Kiểm tra dịch vụ App Server (IIS/Tomcat), cổng Database (ví dụ SQL Server TCP `1433`), dung lượng ổ cứng chứa Transaction Log của Database bị đầy, hoặc bị Deadlock.",
          realExample: "Toàn bộ máy trạm dưới xưởng báo lỗi `Cannot connect to MES Database`. Kiểm tra `Test-NetConnection 192.168.100.50 -Port 1433` thấy thông, nhưng vào SQL Server phát hiện ổ đĩa chứa file `.ldf` (Transaction Log) đã bị đầy 100% khiến Database chuyển sang Read-only/Suspect."
        },
        {
          term: "Print Spooler & Kẹt hàng đợi máy in mạng (Network Printer / Zebra Barcode)",
          shortDef: "Cơ chế hàng đợi in ấn (Print Queue) trên Windows/Print Server sử dụng cổng TCP 9100 (RAW) và thư mục tạm `C:\\Windows\\System32\\spool\\PRINTERS`.",
          easyExplain: "Tại sao máy in tem nhãn hoặc máy in văn phòng đang in tự nhiên đứng im, bấm xóa lệnh in (Cancel) trên giao diện Windows thì nó cứ treo mãi ở chữ `Deleting...`? Vì dịch vụ `Print Spooler` đang khóa chặt file tạm (`.SPL` và `.SHD`) trong ổ cứng. Lúc này bấm Cancel trên giao diện vô tác dụng. Cách xử lý chuẩn mất 15 giây là: **Stop dịch vụ Spooler -> Xóa sạch các file kẹt trong thư mục `spool\\PRINTERS` -> Start lại dịch vụ Spooler** và kiểm tra cổng TCP 9100 tới IP máy in.",
          realExample: "Dây chuyền đóng gói bị kẹt 50 lệnh in tem mã vạch do một file PDF bị lỗi định dạng đứng đầu hàng đợi. Admin chạy 3 dòng lệnh xóa sạch thư mục `spool\\PRINTERS` và khởi động lại Spooler, máy in lập tức hoạt động trở lại."
        }
      ],
      comparisonTable: {
        title: "Bảng Phản ứng nhanh & Phương án Workaround cho 3 sự cố Vận hành Sản xuất",
        headers: ["Sự cố thực tế", "Cách kiểm chứng nguyên nhân (60 giây)", "Phương án Workaround (Chạy lại sản xuất ngay)", "Giải pháp Căn cơ (Root Cause Fix & Prevention)"],
        rows: [
          ["1. Mất kết nối Internet / WAN toàn công ty", "Chạy 3 lệnh: `ping <IP_Gateway_LAN>`, `ping 8.8.8.8`, `nslookup google.com` để tách lỗi LAN vs ISP vs DNS.", "Nếu chết DNS ISP -> Đổi ngay DNS Forwarder sang `1.1.1.1 / 8.8.8.8`. Nếu đứt cáp ISP 1 -> Kích hoạt đường WAN 2 (hoặc cắm USB/Modem 4G LTE vào cổng phụ của MikroTik) và ưu tiên băng thông cho ERP/Email/VPN.", "Cấu hình Dual-WAN Failover tự động bằng **Recursive Routing / Netwatch** trên MikroTik từ hai nhà mạng đi 2 hướng cáp vật lý khác nhau."],
          ["2. Phần mềm sản xuất MES / ERP dưới xưởng báo mất kết nối", "Khoanh vùng 1 máy hay cả xưởng. Chạy `Test-NetConnection <IP_MES_Server> -Port <Port_App/1433>`.", "Nếu lỗi DNS -> Khai báo tạm IP trong file `hosts` hoặc cấu hình kết nối bằng IP. Nếu treo 1 máy trạm tại chuyền -> Đổi ngay máy dự phòng (Cold/Warm Spare PC/PDA) đã cài sẵn MES ra thay thế tại chỗ.", "Giám sát tự động (Zabbix/PRTG) dung lượng ổ đĩa Database, CPU/RAM và trạng thái dịch vụ của MES Server; luôn chuẩn bị sẵn 1-2 thiết bị đầu cuối dự phòng cho dây chuyền."],
          ["3. Máy in tem nhãn Barcode / Máy in phiếu xuất kho bị treo", "Kiểm tra đèn báo trên máy in (hết giấy/ruy-băng mực), `ping <IP_May_In>`, `Test-NetConnection <IP_May_In> -Port 9100`.", "Nếu kẹt hàng đợi -> Stop Spooler + xóa file trong `spool\\PRINTERS` + Start Spooler. Nếu hỏng phần cứng máy in -> Đổi Port IP trên Print Server trỏ sang máy in của chuyền kế bên để in tạm ngay.", "Đặt **DHCP Reservation (Static Lease)** cho toàn bộ máy in mạng (cấm để IP động nhảy lung tung!) và triển khai Print Server tập trung." ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Trong vận hành hệ thống sản xuất, nguyên tắc tối thượng là: <b>'Không bao giờ để dây chuyền sản xuất phải chờ IT ngồi nghiên cứu lỗi'</b>.<ul><li>Khi một mắt xích ở tầng đầu cuối (máy in tem, máy quét mã vạch, PC chuyền sản xuất) gặp lỗi phức tạp cần quá 10 phút để sửa, hãy áp dụng ngay chiến thuật <b>Hoán đổi hoặc Chuyển hướng (Swap or Redirect)</b>: Chuyển lệnh in sang máy bên cạnh, đưa máy PDA dự phòng ra thay, rồi mang thiết bị lỗi về phòng IT mổ xẻ.</li><li>Với đường truyền WAN trên Router MikroTik, nếu chỉ dùng tùy chọn <code>check-gateway=ping</code> thông thường trên Route mặc định, Router chỉ ping tới địa chỉ IP của chiếc Modem nhà mạng đặt ngay trong phòng Server. Khi cáp quang ngoài đường bị đứt, chiếc Modem vẫn sống nên MikroTik tưởng mạng vẫn thông và không chuyển sang WAN2! Giải pháp chuẩn Senior là dùng <b>Recursive Routing (Định tuyến đệ quy)</b> hoặc <b>Netwatch</b> kiểm tra xuyên thấu tới các IP tin cậy trên Internet (như `8.8.8.8`, `1.1.1.1`).</li></ul>",
      flowTitle: "Quy trình 4 bước Xử lý Sự cố Vận hành Sản xuất (WAN, MES, Printer)",
      flowSteps: [
        {
          step: "Bước 1: Đánh giá mức độ khẩn cấp & Khoanh vùng (1 phút)",
          title: "Xác định xem sự cố có đang làm dừng dây chuyền xuất hàng không",
          detail: "Kiểm tra nhanh phạm vi lỗi: Toàn bộ nhà máy mất mạng WAN, cả xưởng mất kết nối MES, hay chỉ 1 trạm in tem nhãn đóng gói bị treo.",
          packetOrState: "Bằng chứng: 'Dây chuyền đóng gói số 1 đang xuất 2 container hàng nhưng máy in tem nhãn Zebra (`192.168.50.101`) không ra tem; đồng thời phòng Xuất nhập khẩu báo mất Internet không khai được Hải quan điện tử'."
        },
        {
          step: "Bước 2: Kích hoạt Workaround khôi phục sản xuất ngay (2 - 5 phút)",
          title: "Cấp cứu cho công việc kinh doanh chạy lại trước tiên",
          detail: "1. Với phòng Xuất nhập khẩu: Kiểm tra MikroTik thấy đường WAN1 (Viettel) bị rớt gói quốc tế/DNS -> Hạ độ ưu tiên (Distance) hoặc Disable tạm WAN1 để toàn bộ lưu lượng chuyển sang WAN2 (VNPT) trong 5 giây.\n2. Với dây chuyền đóng gói số 1: Xóa kẹt Spooler; nếu máy in số 1 bị kẹt ruy-băng mực hoặc lỗi đầu in, đổi ngay IP Port trên Print Server từ `192.168.50.101` sang `192.168.50.102` (máy in chuyền 2 ngay sát cạnh) để công nhân lấy tem dán tiếp.",
          packetOrState: "Kết quả sau 5 phút: Hải quan điện tử nộp tờ khai thành công qua WAN2; công nhân chuyền 1 tiếp tục dán tem xuất hàng không bị trễ giờ tàu."
        },
        {
          step: "Bước 3: Chẩn đoán và xử lý nguyên nhân gốc rễ (Root Cause Fix)",
          title: "Sửa chữa thiết bị lỗi khi áp lực thời gian đã được giải tỏa",
          detail: "Kiểm tra chi tiết chiếc máy in số 1 (`192.168.50.101`): phát hiện máy in không hỏng phần cứng mà do sáng nay bị mất điện khởi động lại, DHCP đã cấp cho nó một IP mới (`192.168.50.188`) vì trước đó chưa gắn Static Lease! Còn đường WAN1 bị đứt cáp ngoài đường đã được báo tổng đài nhà mạng đến hàn cáp.",
          packetOrState: "Bằng chứng gốc rễ: Máy in bị đổi IP động từ `.101` sang `.188` nên Print Server gửi lệnh vào `.101` bị treo ở cổng TCP 9100."
        },
        {
          step: "Bước 4: Trả lại trạng thái chuẩn & Phòng ngừa tái diễn (Prevention)",
          title: "Cố định IP cho toàn bộ máy in và tự động hóa WAN Failover",
          detail: "Vào DHCP Server bấm `Make Static` để khóa cứng địa chỉ MAC của máy in Zebra số 1 vào IP `192.168.50.101` (và rà soát toàn bộ các máy in khác trong nhà máy). Chuyển lại Port in của chuyền 1 về `.101`. Trên MikroTik, thiết lập Recursive Routing kiểm tra `8.8.8.8` để lần sau WAN1 đứt ngầm sẽ tự động nhảy sang WAN2.",
          packetOrState: "Kết quả lâu dài: Loại bỏ hoàn toàn lỗi máy in nhảy IP sau khi mất điện và tự động hóa chuyển mạch đường truyền Internet."
        }
      ],
      asciiDiagram: `
          [ SỰ CỐ GIÁN ĐOẠN VẬN HÀNH: WAN / MES / MÁY IN DÂY CHUYỀN ]
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
[BÁO "MẤT INTERNET / WAN"]     [MẤT KẾT NỐI PHẦN MỀM MES]     [MÁY IN TEM / MẠNG BỊ TREO]
       │                               │                               │
1. Ping LAN Gateway (192.168.10.1)  1. 1 máy lỗi hay cả xưởng?   1. Ping IP máy in & Test Port 9100:
2. Ping IP ngoài (8.8.8.8)          2. Test-NetConnection tới       Test-NetConnection <IP> -Port 9100
3. Phân giải tên (nslookup)            IP Server MES (Port 1433/80)    │
       │                               │                        ┌──────┴──────┐
 ┌─────┴─────┐                  ┌──────┴──────┐                 ▼             ▼
 ▼           ▼                  ▼             ▼          [Port 9100 True] [Port 9100 False]
[Ping 8.8.8.8 [Ping 8.8.8.8   [Chỉ 1 máy]  [Cả nhà máy]         │             │
 THÔNG!]       RỚT!]            │             │          - Kẹt hàng đợi   - Máy in tắt nguồn/
 │             │              - Lỗi Wi-Fi  - Đầy ổ Log     Print Spooler    đứt cáp LAN
[LỖI DNS!]    [ĐỨT WAN1!]     - Sai file     SQL Server  -> Stop Spooler, - Máy in bị nhảy
- Đổi DNS     - Chuyển ngay     config.ini - Treo IIS/DB    xóa thư mục     IP động (DHCP)!
  sang 1.1.1.1  sang WAN2 /   -> Đưa máy   -> Dọn ổ Log,    PRINTERS,     -> Workaround: Trỏ
  hoặc 8.8.8.8  4G Backup!       dự phòng     Restart       Start Spooler    tạm sang máy in
              - Cấu hình         ra thay      Service                        kế bên!
                Recursive        cho chuyền   MES                          -> Fix: Gán Static
                Failover         chạy tiếp!                                  DHCP Lease!`,
      keyTakeaways: [
        "Khi người dùng báo 'Mất mạng', luôn chạy bộ 3 phép thử trong 15 giây: Ping LAN Gateway -> Ping 8.8.8.8 -> nslookup google.com để phân biệt chính xác lỗi LAN, lỗi WAN hay chỉ chết DNS của nhà mạng.",
        "Trên MikroTik, muốn tự động chuyển mạng dự phòng (Dual-WAN Failover) cả khi đứt cáp quang ngoài đường mà Modem vẫn sáng đèn, phải kiểm tra kết nối tới IP ngoài Internet (`8.8.8.8`/`1.1.1.1`) bằng Recursive Routing hoặc Netwatch.",
        "Tất cả các máy in mạng và thiết bị đầu cuối cố định trên dây chuyền bắt buộc phải được đặt IP tĩnh hoặc gán DHCP Static Lease (Make Static); tuyệt đối không để nhận IP động ngẫu nhiên.",
        "Khi máy in bị kẹt lệnh in ở trạng thái 'Deleting...', giải pháp chuẩn là dừng dịch vụ `Spooler`, xóa các file `.SPL`/`.SHD` trong `C:\\Windows\\System32\\spool\\PRINTERS` rồi bật lại `Spooler`."
      ]
    },
    level3_practice: {
      scenario: "Chiều thứ Sáu lúc 15h00, nhà máy đang gấp rút hoàn tất lô hàng xuất khẩu thì xảy ra 2 sự cố:\n1. Đường truyền cáp quang chính WAN1 (ISP1 - Gateway `100.64.1.1` trên cổng `ether1`) bị sự cố ở trạm nhà mạng: đèn cổng `ether1` vẫn sáng và ping tới `100.64.1.1` vẫn thông, nhưng hoàn toàn không ra được Internet. Đường truyền dự phòng WAN2 (ISP2 - Gateway `203.113.1.1` trên cổng `ether2`) đang sẵn sàng.\n2. Dưới xưởng đóng gói, máy in tem mã vạch `PRN-PACKING-01` (IP `192.168.50.101`) bị kẹt cứng 30 lệnh in không nhúc nhích, bấm Cancel không xóa được. Hãy thực hiện các câu lệnh xử lý ngay lập tức.",
      steps: [
        {
          title: "Bước 1: Chẩn đoán nhanh sự cố WAN1 'Sống Modem nhưng Chết Internet' và cấu hình Recursive Failover trên MikroTik",
          instruction: "SSH vào Router MikroTik, kiểm tra ping ra `8.8.8.8` qua cổng WAN1, sau đó thiết lập Recursive Routing (Định tuyến đệ quy) để MikroTik tự động giám sát `8.8.8.8` qua WAN1 và tự động chuyển sang WAN2 khi WAN1 mất kết nối quốc tế.",
          commandOrConfig: `# 1. Kiểm tra bằng chứng: Ping Gateway WAN1 (100.64.1.1) vẫn thông, nhưng ping 8.8.8.8 qua WAN1 bị timeout:
/ping 100.64.1.1 count=3
/ping 8.8.8.8 interface=ether1 count=3

# 2. Cấu hình Recursive Routing để tự động chuyển sang WAN2 (203.113.1.1) khi WAN1 không đi ra được 8.8.8.8:
# Tạo route cụ thể ép đường tới 8.8.8.8 phải đi qua Gateway của WAN1 (100.64.1.1):
/ip route add dst-address=8.8.8.8/32 gateway=100.64.1.1 scope=10 comment="Monitor_Host_WAN1"

# Tạo Default Route chính (distance=1) kiểm tra đệ quy qua 8.8.8.8, và Default Route phụ (distance=2) qua WAN2:
/ip route add dst-address=0.0.0.0/0 gateway=8.8.8.8 distance=1 target-scope=11 check-gateway=ping comment="Primary_WAN1_Recursive"
/ip route add dst-address=0.0.0.0/0 gateway=203.113.1.1 distance=2 check-gateway=ping comment="Backup_WAN2"`,
          explanation: "Ngay khi cấu hình xong, vì `8.8.8.8` không trả lời ping qua `100.64.1.1`, dòng `Primary_WAN1_Recursive` lập tức chuyển sang trạng thái `Unreachable (Inactive)` và dòng `Backup_WAN2` (`distance=2`) tự động nhảy lên thành `Active`! Toàn bộ nhà máy có lại Internet qua WAN2 ngay lập tức. Khi nào nhà mạng ISP1 sửa xong cáp, ping `8.8.8.8` thông trở lại, MikroTik sẽ tự động trả lưu lượng về WAN1."
        },
        {
          title: "Bước 2: Xử lý dứt điểm hàng đợi Print Spooler bị kẹt cứng trong 15 giây",
          instruction: "Trên máy tính điều khiển in tem (hoặc Print Server), mở Command Prompt / PowerShell với quyền Administrator để dừng dịch vụ Spooler, dọn sạch các file lệnh in bị hỏng và khởi động lại dịch vụ.",
          commandOrConfig: `# 1. Kiểm tra xem máy in 192.168.50.101 có đang bật và mở cổng in RAW (TCP 9100) không
Test-NetConnection -ComputerName 192.168.50.101 -Port 9100

# 2. Dừng dịch vụ Print Spooler, xóa toàn bộ các file lệnh in (.SPL, .SHD) bị kẹt và bật lại Spooler:
net stop spooler
del /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*"
net start spooler`,
          explanation: "Khi dịch vụ `spooler` dừng lại, Windows nhả khóa (File Lock) đối với các file `.SPL` và `.SHD` bị lỗi trong thư mục `Spool\\Printers`. Sau khi xóa sạch và chạy `net start spooler`, hàng đợi in trống trơn ngay lập tức mà không cần khởi động lại máy tính."
        },
        {
          title: "Bước 3: Áp dụng Workaround Chuyển hướng cổng in (nếu máy in số 1 bị hỏng phần cứng hoặc nhảy IP)",
          instruction: "Giả sử lệnh `Test-NetConnection 192.168.50.101 -Port 9100` ở Bước 2 trả về `False` vì máy in số 1 vừa bị hỏng bo mạch (hoặc trong lúc chờ kiểm tra), trong khi chuyền đóng gói đang cần in tem ngay. Hãy dùng PowerShell đổi IP của Printer Port sang máy in chuyền 2 (`192.168.50.102`).",
          commandOrConfig: `# 1. Xem danh sách máy in và cổng TCP/IP đang gắn với máy in chuyền 1
Get-Printer -Name "Zebra_Packing_Line1" | Select-Object Name, PortName, PrinterStatus

# 2. Tạo nhanh cổng TCP/IP trỏ sang máy in chuyền 2 (192.168.50.102) và chuyển hướng máy in chuyền 1 sang cổng đó:
Add-PrinterPort -Name "IP_192.168.50.102_Backup" -PrinterHostAddress "192.168.50.102"
Set-Printer -Name "Zebra_Packing_Line1" -PortName "IP_192.168.50.102_Backup"`,
          explanation: "Với thao tác chuyển hướng Port này, phần mềm MES/ERP trên máy tính chuyền 1 **không cần sửa bất kỳ cấu hình nào** (vẫn bấm in vào máy in tên `Zebra_Packing_Line1`), nhưng tem nhãn sẽ tự động chạy ra ở chiếc máy in chuyền 2 đặt ngay bàn bên cạnh! Dây chuyền đóng gói tiếp tục chạy không gián đoạn."
        },
        {
          title: "Bước 4: Cố định IP cho toàn bộ máy in trên DHCP Server MikroTik (Phòng ngừa tái diễn)",
          instruction: "Sau khi kiểm tra phát hiện máy in số 1 bị đổi IP động sang `.188` do mất điện, hãy vào MikroTik chuyển Lease của máy in thành Static và đổi lại về `.101`.",
          commandOrConfig: `# 1. Tìm địa chỉ MAC của máy in Zebra trong bảng DHCP Lease
/ip dhcp-server lease print where host-name~"ZBR" or active-address="192.168.50.188"

# 2. Chuyển Lease động thành tĩnh (Make Static) và gán cố định về IP 192.168.50.101:
/ip dhcp-server lease make-static [find mac-address="00:07:4D:AA:BB:CC"]
/ip dhcp-server lease set [find mac-address="00:07:4D:AA:BB:CC"] address=192.168.50.101 comment="Printer_Zebra_Packing_Line1"`,
          explanation: "Sau khi khóa cứng MAC vào IP `192.168.50.101` (hoặc đặt IP tĩnh trực tiếp trên máy in ngoài dải DHCP Pool), khởi động lại cổng mạng của máy in để nó nhận đúng IP `.101`, sau đó trả lại `PortName` trên máy tính về `192.168.50.101`."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Toàn bộ công ty báo không vào được các trang web (Google, Báo chí, Hải quan), nhưng thử `ping 8.8.8.8` từ máy trạm vẫn trả về `Reply time=15ms` đều đặn.",
          hypothesis: "Đường truyền cáp quang WAN và định tuyến NAT vẫn hoạt động tốt 100%, sự cố chỉ nằm ở việc máy chủ DNS (của nhà mạng ISP hoặc DNS Forwarder trên Router/DC) bị treo không phân giải được tên miền.",
          testCommand: "Chạy `nslookup google.com` (với DNS hiện tại) và so sánh với `nslookup google.com 1.1.1.1`.",
          fix: "Vào DNS Server nội bộ (hoặc `/ip dns` trên MikroTik) đổi ngay DNS Forwarders sang các máy chủ DNS công cộng ổn định như `1.1.1.1`, `8.8.8.8`, `9.9.9.9` rồi xóa cache DNS (`/ip dns cache flush`)."
        },
        {
          symptom: "Đã cấu hình 2 đường truyền Internet trên MikroTik với `check-gateway=ping`, nhưng khi nhà mạng chính bị đứt cáp ngoài đường thì mạng công ty vẫn mất hoàn toàn mà không tự chuyển sang đường dự phòng.",
          hypothesis: "Tùy chọn `check-gateway=ping` thông thường chỉ ping tới địa chỉ IP của chiếc Modem nhà mạng đặt trong phòng Server (vẫn đang bật điện), nên MikroTik tưởng WAN1 vẫn thông.",
          testCommand: "Trên MikroTik: `/ip route print detail where dst-address=0.0.0.0/0` và `/ping 8.8.8.8 interface=<cổng_WAN1>`.",
          fix: "Cấu hình **Recursive Routing** (kiểm tra thông qua IP trung gian ngoài Internet như `8.8.8.8` / `1.1.1.1`) hoặc dùng công cụ **Netwatch** để tự động tăng Distance/Disable Route chính khi mất ping ra Internet."
        },
        {
          symptom: "Máy in mạng báo trạng thái 'Offline' trên tất cả máy tính trong phòng sau một đợt cúp điện ngắn, dù màn hình máy in vẫn sáng bình thường.",
          hypothesis: "Máy in đang được cấu hình nhận IP động (DHCP). Sau khi cúp điện bật lại, DHCP Server đã cấp cho máy in một địa chỉ IP mới khác với địa chỉ IP đang lưu trong Standard TCP/IP Port của các máy tính.",
          testCommand: "In tờ cấu hình mạng (Network Configuration Page) trực tiếp trên nút bấm của máy in để xem IP hiện tại, hoặc tìm MAC của máy in trong bảng DHCP Lease.",
          fix: "Cố định IP cho máy in về đúng địa chỉ cũ bằng **DHCP Reservation (Make Static)** trên Router VÀ đặt IP tĩnh trên chính máy in."
        },
        {
          symptom: "Phần mềm MES trên toàn bộ các chuyền sản xuất báo lỗi không lưu được dữ liệu sản lượng vào cơ sở dữ liệu (Database Error), dù ping và kết nối cổng TCP 1433 tới máy chủ SQL vẫn thông.",
          hypothesis: "Ổ cứng chứa Database hoặc file Transaction Log (`.ldf`) trên máy chủ SQL Server đã bị đầy 100% dung lượng, hoặc dịch vụ SQL Server Agent / Database bị khóa (Deadlock).",
          testCommand: "Đăng nhập vào máy chủ MES/Database kiểm tra dung lượng trống các ổ đĩa (`Get-Volume`) và kiểm tra Windows Application Event Log của SQL Server.",
          fix: "Mở rộng dung lượng phân vùng đĩa (nếu chạy trên VM), dọn dẹp các file Backup/Log cũ không cần thiết trên ổ đĩa đó và thực hiện Backup + Shrink Transaction Log theo đúng quy trình DBA."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Đang lúc 15h30 chiều, bộ phận Kho vận đang cần in gấp 200 phiếu xuất kho và tem mã vạch để xe tải kịp giờ chạy ra cảng, nhưng chiếc máy in mạng duy nhất ở kho bị hỏng bộ sấy không thể in được. Nếu mua máy mới hoặc gọi thợ sửa phải mất đến ngày mai. Em xử lý tình huống này như thế nào?",
          wrongAnswer: "Dạ em sẽ báo với quản lý kho là máy in đã hỏng phần cứng nặng phải gửi đi bảo hành mất 2-3 ngày, nên bảo anh chị viết tay tạm 200 phiếu xuất kho hoặc chờ đến ngày mai sửa xong mới xuất hàng ạ.",
          rightAnswer: "Thưa anh/chị, trong tình huống hàng đang chờ xuất gấp, mục tiêu số 1 của em là tạo ra **Phương án thay thế tạm thời (Workaround)** trong vòng 5-10 phút để kho kịp xuất hàng, tuyệt đối không để xe hàng phải nằm chờ qua ngày hôm sau:\n1. **Với máy in phiếu xuất kho (A4/A5)**: Em lập tức kiểm tra xem khu vực văn phòng gần kho nhất có máy in mạng nào đang hoạt động bình thường không. Trên Print Server (hoặc máy tính thủ kho), em chỉ cần **đổi địa chỉ IP trong cổng Standard TCP/IP Port** của máy in kho trỏ sang IP của chiếc máy in văn phòng gần nhất (hoặc chia sẻ quyền in sang máy đó) để thủ kho bấm in và chạy sang lấy giấy trong 1 phút.\n2. **Với máy in tem mã vạch (Zebra/Godex)**:\n   - Nếu có dây chuyền bên cạnh dùng cùng dòng máy in tem mạng: Em chuyển hướng Port IP sang máy in chuyền bên cạnh để in ké ngay lập tức.\n   - Nếu máy in bên cạnh cắm qua cáp USB vào một PC khác: Em bật **Share Printer** trên PC đó rồi kết nối từ máy thủ kho sang.\n   - Thậm chí nếu kho có sẵn máy in dự phòng (Cold Spare) hoặc bốc tạm 1 máy in từ chuyền đang nghỉ: Em chỉ mất 3 phút cắm nguồn, gán đúng IP tĩnh của máy cũ (`192.168.50.101`) cho máy mới là toàn bộ phần mềm ERP/MES in tiếp được ngay mà không cần cài lại Driver trên từng máy trạm.\n3. Sau khi xe hàng đã xuất bến an toàn, em mới mang chiếc máy in hỏng bộ sấy đi bảo hành.",
          keyPoints: [
            "Thể hiện tư duy hướng tới hoạt động kinh doanh (Business Continuity): Chuyển hướng lệnh in (Print Port Redirection) hoặc hoán đổi máy in cùng IP để giải cứu đơn hàng trong 5 phút",
            "Nêu được mẹo kỹ thuật thực chiến: Gán lại đúng IP tĩnh của máy cũ cho máy thay thế (hoặc đổi IP trong Printer Port) để không phải cấu hình lại phần mềm ERP/MES"
          ]
        },
        {
          question: "Tại sao trên Router MikroTik đã cấu hình 2 đường truyền Internet (WAN1 Viettel và WAN2 VNPT) kèm tùy chọn `check-gateway=ping`, nhưng hôm qua cáp quang Viettel bị xe cẩu làm đứt ở ngoài đầu ngõ mà mạng công ty vẫn mất hẳn, không tự chuyển sang VNPT?",
          wrongAnswer: "Dạ chắc do tính năng `check-gateway=ping` trên MikroTik bị lỗi phần mềm, nên mỗi lần mất mạng em phải vào Winbox tắt tay cổng WAN1 đi thì nó mới chạy sang WAN2 được ạ.",
          rightAnswer: "Không phải do lỗi phần mềm của MikroTik, mà do bản chất của tùy chọn **`check-gateway=ping` trên một Route thông thường**:\n- Khi ta cấu hình `dst-address=0.0.0.0/0 gateway=192.168.1.1 check-gateway=ping` (hoặc IP Gateway của Modem nhà mạng đặt trong tủ Rack), MikroTik chỉ gửi gói ICMP Ping tới đúng địa chỉ **Next-hop (`192.168.1.1`)** đó thôi.\n- Khi xe cẩu làm đứt cáp quang ở ngoài đầu ngõ, đoạn dây mạng LAN dài 1 mét nối từ MikroTik sang chiếc Modem Viettel trong tủ Rack vẫn nguyên vẹn và chiếc Modem vẫn đang cắm điện -> Vì vậy Modem vẫn trả lời Ping của MikroTik trong 1ms! MikroTik thấy Next-hop vẫn sống nên giữ nguyên Route chính và không bao giờ chuyển sang WAN2.\n- **Cách khắc phục triệt để**: Em sẽ cấu hình **Recursive Routing (Định tuyến đệ quy)** hoặc dùng **Netwatch** để ép MikroTik phải ping xuyên qua cổng WAN1 tới các máy chủ DNS uy tín ngoài Internet (như `8.8.8.8` và `1.1.1.1`). Khi đứt cáp ngoài ngõ, ping tới `8.8.8.8` qua WAN1 bị rớt, Route đệ quy sẽ tự động chuyển sang trạng thái Inactive và kích hoạt đường WAN2 chỉ sau vài giây.",
          keyPoints: [
            "Chỉ ra rõ hạn chế của `check-gateway=ping` thông thường là chỉ kiểm tra tới Next-hop (Modem/PE gần nhất) chứ không kiểm tra thông ra Internet",
            "Đưa ra đúng giải pháp kỹ thuật trên MikroTik: Recursive Routing (`scope` / `target-scope` qua `8.8.8.8`) hoặc Netwatch script"
          ]
        },
        {
          question: "Cả văn phòng đồng loạt hô to 'Mất mạng rồi em ơi!'. Em hãy cho biết chỉ với tối đa 3 câu lệnh trên máy tính của em trong vòng 30 giây, làm sao em biết chính xác lỗi đang nằm ở mạng LAN nội bộ, nằm ở đường truyền nhà mạng ISP, hay nằm ở máy chủ DNS?",
          wrongAnswer: "Dạ em sẽ mở trình duyệt Chrome lên gõ thử `youtube.com` và `dantri.com.vn`, nếu cả hai trang đều không vào được thì chắc chắn là nhà mạng bị đứt cáp rồi ạ.",
          rightAnswer: "Thưa anh/chị, thử bằng trình duyệt web không thể tách biệt được lỗi đường truyền với lỗi DNS. Trong vòng 30 giây, em mở CMD và gõ đúng 3 lệnh kiểm chứng từ trong ra ngoài:\n1. **Lệnh 1 — `ping <IP_Default_Gateway>` (ví dụ `ping 192.168.10.1`)**:\n   - Nếu **Rớt (Timeout/Unreachable)**: Lỗi nằm ngay ở **mạng LAN nội bộ** (đứt cáp Uplink, treo Switch, Loop mạng hoặc sập Router nội bộ).\n   - Nếu **Thông (<1ms)**: Mạng LAN từ máy trạm tới Router hoàn toàn tốt -> Chuyển sang Lệnh 2.\n2. **Lệnh 2 — `ping 8.8.8.8` (Ping thẳng tới địa chỉ IP ngoài Internet không cần qua DNS)**:\n   - Nếu **Rớt**: Lỗi nằm ở **NAT hoặc đường truyền WAN/ISP** (đứt cáp quang, treo Modem, mất phiên PPPoE).\n   - Nếu **Thông (ví dụ 15ms)**: Đường truyền Internet vật lý và định tuyến NAT vẫn đang **SỐNG 100%**! -> Chuyển sang Lệnh 3.\n3. **Lệnh 3 — `nslookup google.com`**:\n   - Nếu `ping 8.8.8.8` thông mà `nslookup google.com` báo `DNS request timed out`: Em khẳng định 100% **chỉ bị chết dịch vụ DNS** (DNS Server nội bộ hoặc DNS của nhà mạng bị sập). Em chỉ cần đổi DNS Forwarders sang `1.1.1.1 / 8.8.8.8` là cả công ty vào lại web ngay lập tức trong 10 giây!",
          keyPoints: [
            "Trình bày chuỗi 3 lệnh kinh điển: Ping Gateway LAN -> Ping 8.8.8.8 -> nslookup tên miền",
            "Giải thích sắc sảo ý nghĩa của từng bước: Tại sao ping `8.8.8.8` thông mà không vào được web là bằng chứng 100% của lỗi DNS"
          ]
        }
      ],
      quizzes: [
        {
          question: "Khi kiểm tra sự cố toàn bộ nhân viên không truy cập được các trang web bằng trình duyệt, bạn mở CMD gõ `ping 8.8.8.8` thì thấy phản hồi `Reply from 8.8.8.8: bytes=32 time=14ms TTL=117`, nhưng gõ `ping google.com` lại báo `Ping request could not find host google.com`. Kết luận nào sau đây là CHÍNH XÁC NHẤT?",
          options: [
            "Đường cáp quang Internet của nhà mạng đã bị đứt hoàn toàn.",
            "Switch trung tâm của công ty đang bị Loop mạng.",
            "Kết nối Internet (Layer 3 & NAT) vẫn hoạt động bình thường, nguyên nhân lỗi nằm ở dịch vụ phân giải tên miền (DNS).",
            "Trình duyệt Chrome trên máy tính của mọi người đều bị nhiễm virus."
          ],
          correctIndex: 2,
          explanation: "Việc ping thành công tới địa chỉ IP `8.8.8.8` ngoài Internet chứng minh cả mạng LAN, Router NAT và đường truyền cáp quang WAN đều đang thông suốt. Việc không thể tìm thấy host `google.com` khẳng định lỗi nằm ở khâu phân giải tên miền sang IP (DNS)."
        },
        {
          question: "Một máy in mạng đang có hàng chục lệnh in bị kẹt ở trạng thái 'Deleting...' trong hàng đợi, bấm Cancel trên giao diện Windows không có tác dụng. Chuỗi thao tác nào trên máy chủ quản lý in (Print Server) sẽ xóa sạch hàng đợi này nhanh và chuẩn nhất?",
          options: [
            "Gỡ bỏ toàn bộ hệ điều hành Windows Server và cài lại từ đầu.",
            "Dừng dịch vụ `Print Spooler` (`net stop spooler`) -> Xóa các file trong thư mục `C:\\Windows\\System32\\spool\\PRINTERS` -> Khởi động lại dịch vụ `Print Spooler` (`net start spooler`).",
            "Tắt tường lửa Windows Firewall và đổi địa chỉ IP của Domain Controller.",
            "Xóa tài khoản Active Directory của người vừa bấm lệnh in."
          ],
          correctIndex: 1,
          explanation: "Các lệnh in đang chờ xử lý được lưu dưới dạng file `.SPL` và `.SHD` trong thư mục `C:\\Windows\\System32\\spool\\PRINTERS` và bị khóa bởi dịch vụ `Spooler`. Khi dừng dịch vụ này, xóa sạch file trong thư mục đó rồi bật lại dịch vụ, hàng đợi in sẽ được làm sạch hoàn toàn."
        },
        {
          question: "Tại sao trong mạng doanh nghiệp, các thiết bị như Máy in mạng (Network Printer), Máy chấm công và Camera IP không bao giờ được để nhận địa chỉ IP động ngẫu nhiên từ DHCP Pool mà không có cấu hình cố định?",
          options: [
            "Vì máy in mạng không hỗ trợ giao thức TCP/IP.",
            "Vì sau khi mất điện hoặc hết hạn Lease Time, máy in có thể nhận một địa chỉ IP mới khác với địa chỉ IP đã cấu hình trong Printer Port của các máy trạm/Print Server, làm toàn bộ người dùng mất kết nối tới máy in.",
            "Vì DHCP Server sẽ bị cháy phần cứng nếu cấp IP cho máy in.",
            "Vì máy in nhận IP động sẽ tiêu tốn gấp 10 lần lượng mực in."
          ],
          correctIndex: 1,
          explanation: "Các máy tính hoặc Print Server kết nối tới máy in mạng thông qua một địa chỉ IP cố định khai báo trong cổng TCP/IP Port (ví dụ `192.168.50.101`). Nếu máy in nhận IP động và bị đổi sang số khác sau khi khởi động lại, mọi lệnh in gửi tới IP cũ sẽ thất bại."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 24: MOCK INTERVIEW 2.0 (12 CÂU HỎI TOÀN DIỆN & PHẢN BIỆN SÂU)
  // =========================================================================
  {
    id: 24,
    code: "24",
    week: 4,
    title: "Mock Interview 2.0: 12 Câu Hỏi Toàn Diện & Phản Biện Sâu (Bài Thi Tốt Nghiệp)",
    subtitle: "Tổng duyệt toàn bộ 4 tuần học qua 12 câu hỏi phỏng vấn kết hợp Lý thuyết bản chất + Thực chiến xử lý sự cố + Câu hỏi vặn xoáy nối tiếp của Nhà tuyển dụng",
    priority: "MOCK",
    duration: "120 phút",
    whyThisMatters: "Ở buổi phỏng vấn đầu tiên (trước khi bước vào khóa học 4 tuần này), điểm số của bạn chỉ đạt 3.8/10 vì mắc phải căn bệnh chung của nhiều IT Support: 'Biết làm theo thói quen nhưng hổng bản chất kỹ thuật, chẩn đoán mò mẫm không có bằng chứng, và đề xuất những thao tác cực kỳ nguy hiểm cho hệ thống (tắt Firewall, mở Everyone Full Control, khởi động lại Server mù quáng)'. Bài 24 này chính là Phòng thi Tốt nghiệp của bạn: 12 câu hỏi lớn bao phủ trọn vẹn 4 mảng (Network & MikroTik, Active Directory & GPO, File Server/NAS/Backup, và Tư duy Troubleshooting & An toàn vận hành). Nếu bạn tự trả lời trôi chảy được từ 9/12 câu trở lên mà không vấp phải bất kỳ lỗi an toàn vận hành nào, bạn hoàn toàn tự tin chinh phục mức điểm 8.5 - 9.0/10 trước các Senior System/Network Manager khó tính nhất.",
    analogy: {
      title: "Sự khác biệt giữa 'Thợ sửa máy theo bản năng' và 'Kỹ sư Hệ thống Chuyên nghiệp'",
      content: "Hãy quan sát cách hai ứng viên trả lời cùng một câu hỏi của Hội đồng tuyển dụng:\n\n- **Ứng viên 3.8/10 (Thợ sửa theo bản năng)**: Khi nghe đề bài sự cố, lập tức nói: *'Dạ em sẽ thử khởi động lại cục mạng xem sao, nếu không được thì em tắt Firewall hoặc cài lại Win ạ'*. Khi bị hỏi vặn *'Tại sao làm thế?'* thì ấp úng: *'Dạ vì chỗ cũ em hay làm thế thấy nó chạy lại'*.\n- **Ứng viên 8.5/10 (System & Network Admin chuyên nghiệp)**: Luôn trả lời theo **Cấu trúc 4 tầng chặt chẽ**:\n  1. **Nguyên lý / Bản chất (Why)**: Giải thích ngắn gọn cơ chế hoạt động đằng sau hiện tượng.\n  2. **Khoanh vùng phạm vi (Scope)**: Tách biệt lỗi xảy ra cho 1 người, 1 VLAN hay cả hệ thống.\n  3. **Kiểm chứng bằng bằng chứng (Evidence)**: Đọc tên chính xác câu lệnh/công cụ (`Test-NetConnection -Port 445`, `gpresult /r`, `/log print where topics~\"dhcp\"`, `Get-SmbOpenFile`) và ý nghĩa kết quả.\n  4. **Xử lý an toàn & Phòng ngừa (Safe Fix & Prevention)**: Sửa đúng điểm nghẽn theo nguyên tắc *Least Privilege*, có phương án dự phòng/rollback và giải pháp chống tái diễn."
    },
    level1_definitions: {
      concepts: [
        {
          term: "Công thức trả lời phỏng vấn 4 bước: STAR-E (Scope - Theory - Action/Evidence - Resilience)",
          shortDef: "Khung diễn đạt giúp câu trả lời của bạn luôn ngắn gọn, đúng trọng tâm kỹ thuật và toát lên phong thái của một người làm chủ hệ thống.",
          easyExplain: "Mỗi khi nhà tuyển dụng đưa ra một câu hỏi tình huống, đừng nhảy bổ vào nói 'Em sửa cái này'. Hãy dành 3 giây sắp xếp ý trong đầu theo 4 gạch đầu dòng:\n1. **Scope (Khoanh vùng)**: Em xác định xem lỗi ảnh hưởng 1 máy hay diện rộng.\n2. **Theory (Giả thuyết theo nguyên lý)**: Dựa trên phạm vi đó, nguyên nhân khả dĩ nhất nằm ở tầng nào.\n3. **Action & Evidence (Kiểm chứng bằng lệnh)**: Em chạy lệnh X, nhìn vào thông số Y để khẳng định.\n4. **Resilience (Sửa an toàn & Phòng ngừa)**: Em sửa đúng phạm vi, không làm gián đoạn sản xuất và cấu hình giám sát/phòng ngừa lâu dài.",
          realExample: "Áp dụng công thức STAR-E giúp bạn trả lời mọi câu hỏi chỉ trong 90 - 120 giây nhưng chạm đúng 100% từ khóa (Keywords) mà người phỏng vấn đang cầm trên phiếu chấm điểm."
        },
        {
          term: "5 'Điểm Liệt' (Fatal Red Flags) tuyệt đối không bao giờ được thốt ra khi phỏng vấn",
          shortDef: "Những câu trả lời khiến nhà tuyển dụng đánh trượt ứng viên ngay lập tức vì thể hiện sự thiếu ý thức về An toàn thông tin và Tính sẵn sàng của hệ thống.",
          easyExplain: "Dù bạn có giỏi lệnh đến đâu, chỉ cần buột miệng nói một trong 5 câu sau là mất điểm nghiêm trọng:\n1. *'Em tắt hẳn Firewall (Windows Firewall / Router Firewall) đi cho nó thông'*.\n2. *'Em cấp quyền Everyone Full Control lên thư mục chia sẻ để nhân viên vào không bị hỏi quyền'*.\n3. *'Em khởi động lại (Reboot) ngay con Router tổng / Domain Controller / File Server giữa giờ làm việc xem có hết lỗi không'*.\n4. *'Em điền thêm DNS 8.8.8.8 vào Secondary DNS trên các máy trạm trong Domain'*.\n5. *'Em gõ lệnh xóa/ghi đè cấu hình trực tiếp trên thiết bị đang chạy mà không kiểm tra hoặc sao lưu cấu hình trước'*. ",
          realExample: "Thay vì nói 'Em tắt Firewall', hãy luôn nói: 'Em kiểm tra Log/Scope của Firewall và mở đúng cổng dịch vụ cần thiết (ví dụ TCP 445) cho đúng dải IP nguồn được phép truy cập'."
        },
        {
          term: "Tiêu chuẩn Đánh giá Tốt nghiệp (Graduation Rubric 8.0+/10)",
          shortDef: "Thang đo năng lực sau 4 tuần: Hiểu đúng bản chất Lý thuyết (30%) + Chẩn đoán bằng bằng chứng (40%) + Xử lý an toàn & Vận hành thực tế (30%).",
          easyExplain: "Bạn không cần phải thuộc lòng từng tham số dài dòng của mọi câu lệnh, nhưng bạn bắt buộc phải nhớ: (1) Gói tin đi qua những bước nào, (2) Nhìn vào đâu để lấy bằng chứng, và (3) Quyết định nào bảo vệ được cả dữ liệu lẫn hoạt động kinh doanh của công ty.",
          realExample: "Đạt tối thiểu 9/12 câu hỏi trong phần phỏng vấn bên dưới và trả lời đúng 100% bài kiểm tra trắc nghiệm cuối khóa."
        }
      ],
      comparisonTable: {
        title: "Bảng So sánh Tư duy Ứng viên Trước và Sau khóa học 4 tuần (3.8/10 vs 8.5+/10)",
        headers: ["Mảng kiến thức", "Câu trả lời kiểu 'Thử mò mẫm' (3.8/10 - Rớt)", "Câu trả lời chuẩn 'Theory Behind Practice' (8.5+/10 - Đậu)"],
        rows: [
          ["1. Mạng & MikroTik (VLAN, DHCP, NAT, Routing)", "Không phân biệt được Untagged/Tagged; thấy lỗi IP 169.254.x.x là rút dây cắm lại hoặc đặt IP tĩnh; nhầm lẫn giữa NAT và Routing.", "Giải thích rõ 802.1Q Tagging/PVID trên Trunk vs Access; đọc Log DHCP Server để tách lỗi Pool Empty vs Layer 2 vs DHCP Snooping; phân biệt rành mạch `input` vs `forward` chain và Src-NAT vs Dst-NAT."],
          ["2. Active Directory, DNS & GPO", "Điền `8.8.8.8` vào DNS máy trạm; gặp lỗi Trust là Disjoin/Rejoin; GPO không chạy chỉ biết gõ `gpupdate /force` rồi khởi động lại máy.", "Hiểu rõ AD phụ thuộc vào DNS SRV records (máy trạm chỉ trỏ DNS về DC, DC dùng Forwarders); dùng `Test-ComputerSecureChannel -Repair`; dùng `gpresult /r` để bóc tách lỗi sai OU, sai nhánh User/Computer hoặc lỗi Security Filtering."],
          ["3. File Server, NAS, RAID & Backup", "Nhầm lẫn quyền Share và NTFS; khi lỗi quyền thì mở `Everyone Full Control`; thấy RAID 5 hỏng 1 ổ là tắt NAS hoặc ép Rebuild ngay khi chưa xem Backup; nghĩ rằng RAID chính là Backup.", "Tính đúng quyền giao thoa (Most Restrictive) giữa SMB & NTFS; thiết lập ABE + Quota; giữ RAID 5 Degraded chạy qua ca, kiểm tra Backup trước rồi mới đối chiếu Serial Number thay ổ và Repair ngoài giờ; áp dụng chuẩn Backup 3-2-1-1-0 chống Ransomware."],
          ["4. Troubleshooting & An toàn vận hành", "Đụng đâu sửa đó không khoanh vùng; tắt Firewall để thử nghiệm; không có phương án tạm thời (Workaround) khi dây chuyền sản xuất bị đình trệ.", "Luôn tuân thủ 4 bước (Scope -> Hypothesis -> Verification -> Safe Fix & Prevention); dùng `Test-NetConnection` kiểm chứng theo Port; ưu tiên cô lập ngay với Malware và ưu tiên Workaround giữ nhịp sản xuất với sự cố phần cứng/mạng."]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Bản tổng kết <b>'Bản đồ Tư duy Toàn diện của một System & Network Administrator'</b> sau 4 tuần học:<ul><li><b>Tuần 1 (Nền tảng Mạng)</b>: Mọi dữ liệu muốn đi từ máy A sang máy B đều phải đi qua đóng gói L2 (MAC/VLAN/ARP) -> định tuyến L3 (IP/Subnet/Gateway/NAT/Firewall) -> thiết lập phiên L4 (TCP 3-way Handshake/UDP Port) -> dịch vụ L7 (DNS/DHCP/SMB/HTTP). Hiểu đường đi của gói tin là chìa khóa giải mã mọi sự cố mạng.</li><li><b>Tuần 2 (Windows Server & Active Directory)</b>: Quản trị tập trung hàng trăm máy tính dựa trên bộ 3 trụ cột: <b>DNS nội bộ</b> (chỉ đường), <b>Kerberos/LDAP</b> (định danh & xác thực) và <b>GPO/SYSVOL</b> (áp đặt chính sách theo cấu trúc OU).</li><li><b>Tuần 3 (Lưu trữ, Bảo mật & Sao lưu)</b>: Dữ liệu là tài sản sống còn của doanh nghiệp. Bảo vệ dữ liệu bằng 3 lớp: <b>Phân quyền chặt chẽ</b> (SMB + NTFS theo AGDLP), <b>Chịu lỗi phần cứng</b> (RAID/NAS) và <b>Khôi phục sau thảm họa</b> (Backup 3-2-1 + Immutable Snapshot + Restore Drill).</li><li><b>Tuần 4 (Chẩn đoán bằng bằng chứng & Bản lĩnh vận hành)</b>: Kết nối toàn bộ kiến thức Tuần 1-2-3 để nhìn triệu chứng là biết kiểm tra bằng chứng ở đâu, sửa đúng chỗ hỏng mà không tạo ra lỗ hổng mới.</li></ul>",
      flowTitle: "Chiến lược 4 bước Chinh phục Buổi Phỏng Vấn Thực Chiến (Từ lúc nghe câu hỏi đến khi chốt hạ)",
      flowSteps: [
        {
          step: "Bước 1: Lắng nghe & Xác lập bối cảnh (Clarify & Scope)",
          title: "Cho nhà tuyển dụng thấy bạn có tư duy cẩn trọng của người làm hệ thống thật",
          detail: "Đừng vội vàng trả lời chỉ bằng 1 câu cụt lủn. Hãy mở đầu bằng việc xác lập phạm vi: 'Thưa anh/chị, với tình huống này, bước đầu tiên em sẽ khoanh vùng nhanh xem sự cố đang xảy ra cho 1 thiết bị đơn lẻ hay cho cả một VLAN/phòng ban...'.",
          packetOrState: "Ấn tượng tạo ra: Nhà tuyển dụng thấy ngay bạn không phải người làm việc hấp tấp, mò mẫm."
        },
        {
          step: "Bước 2: Nêu nguyên lý & Điểm kiểm chứng bằng chứng (Verify with Evidence)",
          title: "Đưa ra đúng tên công cụ, câu lệnh và dòng Log quyết định",
          detail: "Chỉ rõ bạn sẽ nhìn vào đâu để phân nhánh quyết định: Ví dụ với DHCP là xem `/log print where topics~\"dhcp\"`; với SMB/VPN là chạy `Test-NetConnection <IP> -Port 445` và thử truy cập bằng IP `\\\\192.168.x.y`; với GPO là chạy `gpresult /r`.",
          packetOrState: "Ấn tượng tạo ra: Chứng minh năng lực thực chiến thật sự, hiểu sâu lý thuyết đằng sau thực hành."
        },
        {
          step: "Bước 3: Đưa ra giải pháp an toàn & Phương án Workaround (Safe Fix)",
          title: "Giải quyết sự cố mà vẫn đảm bảo An toàn bảo mật và Duy trì sản xuất",
          detail: "Nêu rõ cách sửa tuân thủ nguyên tắc quyền tối thiểu (mở đúng Port, đúng IP, đúng Security Group) và cách giúp người dùng/dây chuyền sản xuất làm việc tiếp ngay lập tức trong lúc chờ xử lý căn cơ.",
          packetOrState: "Ấn tượng tạo ra: Thể hiện tầm nhìn của một Senior hiểu rõ Business Impact."
        },
        {
          step: "Bước 4: Chủ động nêu giải pháp Phòng ngừa tái diễn (Prevention)",
          title: "Điểm cộng ăn tiền giúp bạn vượt lên mức 9/10",
          detail: "Kết thúc câu trả lời bằng 1 câu chốt: 'Sau khi xử lý xong sự cố, để tránh lỗi này lặp lại trong tương lai, em sẽ cấu hình... (ví dụ: gán DHCP Static Lease cho máy in, bật cảnh báo dung lượng ổ đĩa, hoặc chuẩn hóa lại cấu trúc OU/GPO)'.",
          packetOrState: "Ấn tượng tạo ra: Tinh thần trách nhiệm cao và tư duy hệ thống bền vững."
        }
      ],
      asciiDiagram: `
   =================================================================================
         BẢN ĐỒ TỔNG HỢP TƯ DUY CHẨN ĐOÁN HỆ THỐNG (EVIDENCE-BASED ADMIN MAP)
   =================================================================================

   [ TẦNG 1-2: VẬT LÝ, WI-FI & VLAN ] ──► Bằng chứng: Đèn Port, MAC Table, /interface bridge vlan,
          │                               Log DHCP Server (Có nhận được gói Discover không?)
          ▼
   [ TẦNG 3: IP, DHCP, ROUTE & NAT ]  ──► Bằng chứng: ipconfig /all (169.254.x.x?), ping Gateway,
          │                               tracert -d, /ip route, /ip firewall nat (Src-NAT/Dst-NAT)
          ▼
   [ TẦNG 4: FIREWALL & PORT TCP/UDP] ──► Bằng chứng: Test-NetConnection <IP> -Port <445/389/1433/9100>,
          │                               MikroTik Filter (input vs forward), Windows Firewall Scope
          ▼
   [ TẦNG 7: DNS, AD, GPO & STORAGE ] ──► Bằng chứng: nslookup (Tên vs IP), w32tm (< 5 phút),
                                          Test-ComputerSecureChannel, gpresult /r,
                                          Effective Access (SMB ∩ NTFS), Get-SmbOpenFile, RAID Status`,
      keyTakeaways: [
        "12 câu hỏi trong bài này là bộ đề chuẩn hóa toàn diện nhất: Hãy tự đọc to câu trả lời của mình thành tiếng trước khi xem đáp án mẫu để rèn phản xạ diễn đạt mạch lạc.",
        "Luôn nhớ các cặp phân biệt sống còn: Access vs Trunk (PVID vs Tagged), Routing vs NAT, Input Chain vs Forward Chain, Primary/Secondary DNS nội bộ vs DNS Forwarders, SMB Share vs NTFS Permission, RAID (Uptime) vs Backup (Data Recovery).",
        "Mọi câu trả lời xử lý sự cố đều phải đi qua lăng kính Bằng chứng (Evidence) và An toàn vận hành (Operational Safety)."
      ]
    },
    level3_practice: {
      scenario: "Trước khi bước vào 12 câu hỏi phỏng vấn lớn ở Phần 4, bạn hãy thực hiện bài diễn tập 'Rapid-Fire Command & Evidence Review' (4 tình huống tổng hợp liên hoàn thường được nhà tuyển dụng yêu cầu viết lệnh hoặc đọc kết quả trực tiếp trên giấy/bảng trắng).",
      steps: [
        {
          title: "Tình huống Tổng hợp 1: Mảng Network & MikroTik (VLAN + Firewall + NAT + Dual-WAN)",
          instruction: "Viết các câu lệnh MikroTik RouterOS chuẩn xác để: (1) Cho phép VLAN 20 (`192.168.20.0/24`) truy cập duy nhất cổng SQL (`TCP 1433`) của máy chủ DB (`192.168.100.50`), chặn mọi kết nối khác sang VLAN 100; (2) Cấu hình Port Forwarding (Dst-NAT) cổng `TCP 8443` từ WAN1 (`ether1`) vào Web Server nội bộ `192.168.100.80` cổng `443`.",
          commandOrConfig: `# 1. Firewall Filter trên chuỗi forward (Kiểm soát truy cập giữa các VLAN):
/ip firewall filter add chain=forward src-address=192.168.20.0/24 dst-address=192.168.100.50 protocol=tcp dst-port=1433 action=accept comment="Allow VLAN20 to DB SQL 1433"
/ip firewall filter add chain=forward src-address=192.168.20.0/24 dst-address=192.168.100.0/24 action=drop comment="Block all other VLAN20 to Server VLAN100"

# 2. Port Forwarding (Dst-NAT + Filter Forward Accept):
/ip firewall nat add chain=dstnat in-interface=ether1 protocol=tcp dst-port=8443 action=dst-nat to-addresses=192.168.100.80 to-ports=443 comment="Port Forward HTTPS WebServer"
/ip firewall filter add chain=forward in-interface=ether1 dst-address=192.168.100.80 protocol=tcp dst-port=443 action=accept comment="Allow Forwarded HTTPS to WebServer"`,
          explanation: "Điểm ăn tiền ở đây là bạn nhớ rằng sau khi gói tin đi qua bước `dst-nat` (đổi IP đích thành `192.168.100.80` và port đích thành `443`), nó sẽ đi tiếp vào `chain=forward` của Firewall Filter. Do đó rule ở `chain=forward` phải kiểm tra theo IP nội bộ `192.168.100.80` và port đích sau khi dịch là `443`!"
        },
        {
          title: "Tình huống Tổng hợp 2: Mảng Active Directory, DNS & GPO",
          instruction: "Tổng hợp bộ câu lệnh kiểm chứng nhanh trên Windows Server và Client khi xử lý sự cố Domain/DNS/GPO.",
          commandOrConfig: `# 1. Kiểm tra bản ghi SRV của Domain Controller trên DNS nội bộ:
nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local

# 2. Kiểm tra và sửa lỗi đứt kênh bảo mật (Trust Relationship) không cần Disjoin/Rejoin:
Test-ComputerSecureChannel -Repair -Credential (Get-Credential)

# 3. Kiểm tra trạng thái khóa tài khoản và mở khóa trên AD:
net user <username> /domain
Unlock-ADAccount -Identity <username>

# 4. Xuất báo cáo bằng chứng áp dụng GPO (RSoP):
gpresult /r
gpresult /h C:\\Temp\\gpreport.html`,
          explanation: "Nắm vững 4 nhóm lệnh này giúp bạn giải quyết 95% các câu hỏi thực chiến về Active Directory mà không bao giờ phải dùng đến các thao tác thủ công rủi ro."
        },
        {
          title: "Tình huống Tổng hợp 3: Mảng File Server, SMB & Ứng phó Ransomware",
          instruction: "Tổng hợp các lệnh PowerShell kiểm chứng kết nối SMB từ xa và cô lập nhanh máy trạm nhiễm mã độc đang tấn công File Server.",
          commandOrConfig: `# 1. Từ máy trạm (LAN hoặc VPN), kiểm tra thông mạch tới cổng SMB 445 của File Server:
Test-NetConnection -ComputerName 192.168.10.20 -Port 445

# 2. Trên File Server, truy tìm ngay IP máy trạm và User đang mở/mã hóa file:
Get-SmbSession
Get-SmbOpenFile | Where-Object {$_.Path -like "*.encrypted*"} | Select-Object ClientComputerName, ClientUserName, Path

# 3. Ngắt lập tức phiên kết nối SMB của máy nhiễm mã độc và khóa tài khoản AD:
Close-SmbSession -ClientComputerName "192.168.20.88" -Force
Disable-ADAccount -Identity <username_bi_nhiem>`,
          explanation: "Sự kết hợp giữa `Test-NetConnection -Port 445` (khi chẩn đoán mất kết nối) và `Get-SmbOpenFile` + `Close-SmbSession` (khi ứng cứu sự cố Ransomware) thể hiện đẳng cấp làm chủ dịch vụ SMB của bạn."
        },
        {
          title: "Tình huống Tổng hợp 4: Mảng Vận hành Sản xuất (WAN, Printer Spooler, Disk I/O)",
          instruction: "Tổng hợp bộ 3 phép thử chẩn đoán 'Mất mạng' trong 30 giây và lệnh giải cứu máy in bị kẹt hàng đợi.",
          commandOrConfig: `# 1. Bộ 3 lệnh phân biệt lỗi LAN vs WAN vs DNS trong 30 giây:
ping 192.168.10.1        # Test 1: LAN & Default Gateway
ping 8.8.8.8             # Test 2: WAN Routing & NAT (bỏ qua DNS)
nslookup google.com      # Test 3: Dịch vụ phân giải tên miền DNS

# 2. Giải cứu hàng đợi Print Spooler bị treo lệnh 'Deleting...':
net stop spooler
del /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*"
net start spooler`,
          explanation: "Đây là những thao tác giúp bạn khôi phục hoạt động của văn phòng và nhà máy chỉ trong tính bằng giây."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "[Checklist Mảng 1 - Network] Người dùng nhận IP 169.254.x.x hoặc VLAN mới tạo không ra được Internet.",
          hypothesis: "Đứt quá trình DORA (cạn Pool / sai VLAN Tagging / DHCP Snooping) hoặc thiếu Gateway / thiếu Inter-VLAN Firewall / thiếu Src-NAT.",
          testCommand: "`/log print where topics~\"dhcp\"`, `show interfaces trunk`, `tracert -d 8.8.8.8`.",
          fix: "Kiểm tra tuần tự: PVID & Tagged VLAN trên Switch/Bridge -> DHCP Pool -> IP Gateway của VLAN -> Firewall Forward Chain -> Src-NAT Masquerade."
        },
        {
          symptom: "[Checklist Mảng 2 - AD/DNS/GPO] Không Join/Login được Domain hoặc GPO không áp xuống máy trạm.",
          hypothesis: "Sai DNS (dính `8.8.8.8`), lệch giờ > 5 phút, đứt Secure Channel, hoặc đặt nhầm OU / sai nhánh User vs Computer / lỗi Security Filtering.",
          testCommand: "`ipconfig /all`, `nslookup _ldap._tcp.dc._msdcs.<domain>`, `Test-ComputerSecureChannel`, `gpresult /r`.",
          fix: "Chỉ trỏ DNS máy trạm về DC (cấu hình Forwarders trên DC), đồng bộ NTP, chạy `Test-ComputerSecureChannel -Repair`, đặt đúng đối tượng vào OU và đảm bảo Computer có quyền Read GPO."
        },
        {
          symptom: "[Checklist Mảng 3 - VPN & File Share] VPN Connected nhưng không vào được `\\\\Server\\Share`.",
          hypothesis: "Thiếu Route ở Split Tunnel, bị chặn ở Forward Chain trên Router, bị chặn bởi Scope `LocalSubnet` trên Windows Firewall của File Server, lỗi DNS qua VPN, hoặc thiếu quyền SMB/NTFS.",
          testCommand: "Thử `\\\\<IP_Server>\\Share` vs `\\\\<Ten_Server>\\Share` và chạy `Test-NetConnection <IP_Server> -Port 445`.",
          fix: "Đẩy DNS/Route qua VPN, mở đúng TCP 445 trên Router Forward & Windows Server Firewall Scope cho dải VPN, xác thực bằng `DOMAIN\\user` và cấp quyền theo mô hình AGDLP."
        },
        {
          symptom: "[Checklist Mảng 4 - Storage, Malware & Vận hành] Ransomware mã hóa file, RAID 5 báo Degraded, hoặc treo máy in dây chuyền.",
          hypothesis: "Mã độc lây qua SMB; hỏng 1 ổ cứng vật lý trong mảng RAID; hoặc kẹt Spooler / máy in bị nhảy IP động.",
          testCommand: "`Get-SmbOpenFile`, kiểm tra `Storage Manager` (Serial Number & Backup status), `Test-NetConnection <IP_Printer> -Port 9100`.",
          fix: "Ransomware -> Cô lập mạng trong 30s & Restore từ Immutable Snapshot; RAID Degraded -> Giữ chạy hết ca, kiểm tra Backup rồi mới thay ổ đúng Serial và Repair ngoài giờ; Máy in -> Xóa Spooler, chuyển hướng Port in tạm thời và gán DHCP Static Lease."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        // CÂU 1 - MẢNG NETWORK (VLAN, TRUNK/ACCESS, PVID)
        {
          question: "[Câu 1/12 — Network & VLAN] Hãy giải thích sự khác biệt bản chất giữa cổng Access (Untagged) và cổng Trunk (Tagged 802.1Q) trên Switch. Phản biện nối tiếp: Khi nối một cổng Switch ra một chiếc Access Point phát 3 tên Wi-Fi (SSID) cho 3 phòng ban khác nhau, cổng Switch đó phải cấu hình như thế nào và nếu cấu hình sai PVID thì chuyện gì xảy ra?",
          wrongAnswer: "Dạ cổng Access là cổng nối vào máy tính còn cổng Trunk là cổng nối giữa 2 Switch với nhau ạ. Khi nối ra cục phát Wi-Fi thì vì cục Wi-Fi là thiết bị đầu cuối nên em cấu hình cổng đó là Access cho nó chạy ổn định ạ.",
          rightAnswer: "Thưa anh/chị, bản chất sự khác biệt giữa Access và Trunk nằm ở việc xử lý **nhãn 802.1Q VLAN Tag (4 bytes)** trong khung tin Ethernet:\n1. **Cổng Access (Untagged)**: Chỉ thuộc về 1 VLAN duy nhất (xác định bởi **PVID**). Các thiết bị đầu cuối thông thường như PC, máy in không hiểu thẻ VLAN. Khi gói tin từ PC đi vào cổng Access, Switch sẽ gắn nhãn PVID cho nó; khi đi ra khỏi cổng Access về PC, Switch sẽ gỡ bỏ nhãn VLAN.\n2. **Cổng Trunk (Tagged 802.1Q)**: Cho phép nhiều VLAN cùng đi qua 1 sợi cáp bằng cách giữ nguyên nhãn 802.1Q Tag của từng VLAN (ngoại trừ duy nhất 1 Native VLAN / PVID có thể đi qua dạng Untagged).\n3. **Trả lời câu hỏi phản biện về Access Point (Multi-SSID)**: Dù AP là thiết bị lắp ở cuối đường dây, nhưng vì nó phát 3 SSID tương ứng với 3 VLAN khác nhau (ví dụ VLAN 20 Staff, VLAN 30 Guest, VLAN 40 IoT) kèm theo 1 VLAN quản trị chính nó (ví dụ VLAN 10 Management), nên cổng Switch nối với AP **bắt buộc phải cấu hình là Trunk (hoặc Hybrid)**:\n   - Đặt **Native VLAN / PVID = VLAN 10** (để bản thân chiếc AP nhận được IP quản trị và báo Online về Controller).\n   - Đặt **Tagged (`allowed vlan`) = 20, 30, 40** (để lưu lượng của người dùng trên 3 SSID đi qua).\n   - Nếu cấu hình sai PVID thì AP sẽ mất kết nối với Controller (báo Offline); còn nếu đúng PVID nhưng quên Tag các VLAN 20, 30, 40 thì AP vẫn báo Online xanh mượt nhưng người dùng bắt Wi-Fi sẽ bị nhận IP `169.254.x.x` (APIPA).",
          keyPoints: [
            "Giải thích đúng cơ chế đóng/gỡ nhãn 802.1Q (4 bytes) và vai trò của PVID",
            "Khẳng định cổng nối Multi-SSID Access Point phải là Trunk/Hybrid (PVID cho Management AP + Tagged cho các VLAN của SSID)",
            "Nêu rõ hậu quả khi sai PVID (AP Offline) so với khi thiếu Tagged VLAN (AP Online nhưng Client bị APIPA)"
          ]
        },

        // CÂU 2 - MẢNG NETWORK (DHCP DORA, APIPA & SNOOPING)
        {
          question: "[Câu 2/12 — DHCP & Chẩn đoán APIPA] Khi một máy tính nhận địa chỉ IP `169.254.x.x`, điều đó có ý nghĩa gì trong tiến trình DHCP DORA? Phản biện nối tiếp: Làm sao chỉ bằng cách nhìn vào Log của DHCP Server trên Router MikroTik, em phân biệt được ngay lỗi đó là do cạn IP Pool, do đứt VLAN ở Switch, hay do tính năng DHCP Snooping chặn?",
          wrongAnswer: "Dạ IP 169.254.x.x là IP mặc định của card mạng khi bị lỗi phần cứng hoặc bị trùng IP ạ. Em sẽ xuống máy tính đó gõ `ipconfig /renew` hoặc đặt IP tĩnh chứ trên Router MikroTik thì không nhìn thấy được lỗi của máy trạm đâu ạ.",
          rightAnswer: "Thưa anh/chị, địa chỉ `169.254.x.x/16` là địa chỉ **APIPA**, xuất hiện khi máy trạm gửi bản tin Broadcast **DHCP Discover** (Bước 1 trong tiến trình 4 bước **D**iscover - **O**ffer - **R**equest - **A**ck) nhưng không nhận lại được bất kỳ bản tin **DHCP Offer** nào (Bước 2).\nChỉ cần nhìn vào **Log DHCP trên Router MikroTik** (`/log print where topics~\"dhcp\"`), em có thể phân biệt chính xác 3 nguyên nhân ngay lập tức:\n1. **Trường hợp 1 — Cạn DHCP Pool**: Trong Log MikroTik sẽ hiện thông báo lỗi đỏ: `failed to give out IP address: pool <tên_pool> is empty`. Nghĩa là gói Discover đã lên tới Router nhưng không còn IP trống để cấp.\n2. **Trường hợp 2 — Đứt VLAN / Sai Tagging trên Switch**: Trong Log MikroTik **hoàn toàn im lặng**, không hề xuất hiện địa chỉ MAC của máy trạm bị lỗi. Điều này chứng minh gói Broadcast DHCP Discover đã bị chặn hoặc đi lạc VLAN ngay ở tầng 2 (Switch/AP) trước khi tới được Router.\n3. **Trường hợp 3 — Bị DHCP Snooping chặn trên Switch**: Trong Log MikroTik hiện cảnh báo lặp đi lặp lại: `dhcp1 offering lease 192.168.x.y for MAC ... without success`. Nghĩa là gói Discover đã lên tới Router, Router đã gửi gói **Offer** trả về, nhưng gói Offer đó bị Switch tầng 2 hủy bỏ vì cổng Uplink nối lên Router chưa được cấu hình `ip dhcp snooping trust`.",
          keyPoints: [
            "Liên kết chính xác APIPA 169.254.x.x với sự thất bại ở bước Discover -> Offer của tiến trình DORA",
            "Phân biệt sắc sảo 3 trạng thái Log trên MikroTik: `pool is empty` (cạn Pool) vs `Im lặng không có log` (kẹt Layer 2/VLAN) vs `offering lease without success` (bị chặn chiều về do DHCP Snooping Untrusted Uplink)"
          ]
        },

        // CÂU 3 - MẢNG NETWORK (ROUTING VS NAT, MIKROTIK PACKET FLOW)
        {
          question: "[Câu 3/12 — Routing, NAT & MikroTik Firewall] Nhiều bạn hay nhầm lẫn giữa Routing (Định tuyến) và NAT. Em hãy phân biệt rõ hai khái niệm này và giải thích tại sao giữa 2 VLAN nội bộ trong cùng một con Router MikroTik thì đã nhìn thấy nhau mà không cần NAT, nhưng khi đi ra Internet lại bắt buộc phải có Src-NAT (Masquerade)? Phản biện nối tiếp: Muốn chặn VLAN Khách không cho vào VLAN Server trên MikroTik thì viết Rule ở đâu?",
          wrongAnswer: "Dạ Routing và NAT đều là để nối các mạng khác nhau lại với nhau ạ. Để các VLAN đi ra Internet hay nói chuyện với nhau thì em đều vào mục Firewall NAT chọn Masquerade cho tất cả các cổng là chạy được hết ạ.",
          rightAnswer: "Thưa anh/chị, **Routing** và **NAT** có bản chất hoàn toàn khác nhau:\n1. **Routing (Định tuyến)**: Là việc tìm đường đi cho gói tin giữa các mạng khác nhau nhưng **giữ nguyên địa chỉ IP nguồn và IP đích ban đầu**. Giữa 2 VLAN nội bộ trên cùng một Router MikroTik (ví dụ VLAN 10 `192.168.10.0/24` và VLAN 20 `192.168.20.0/24`), cả hai mạng đều là Connected Routes mà Router đã biết rõ đường đi và đường về, nên mặc định Router sẽ định tuyến trực tiếp qua lại giữa chúng mà **hoàn toàn không cần NAT**.\n2. **Tại sao ra Internet lại bắt buộc phải có Src-NAT (Masquerade)?**: Vì địa chỉ `192.168.x.x` là **Private IP (RFC 1918)** không được phép định tuyến trên mạng Internet công cộng (nếu gói tin mang nguồn `192.168.10.5` đi ra ngoài, các Router trên thế giới sẽ vứt bỏ hoặc không biết trả lời về đâu). Do đó, khi đi ra cổng WAN, Router phải dùng **Src-NAT (Masquerade)** để thay địa chỉ IP nguồn Private thành **IP Public WAN** của công ty.\n3. **Trả lời câu hỏi phản biện**: Để chặn VLAN Khách (`172.16.40.0/24`) không cho truy cập vào VLAN Server (`192.168.100.0/24`), em tạo Rule trong bảng **`/ip firewall filter`** tại chuỗi **`chain=forward`** (vì lưu lượng đi xuyên qua Router từ VLAN này sang VLAN khác), với `src-address=172.16.40.0/24 dst-address=192.168.100.0/24 action=drop` (hoặc dùng `in-interface=vlan40-guest out-interface=vlan100-server action=drop`).",
          keyPoints: [
            "Phân biệt rõ: Routing giữ nguyên IP nguồn/đích (chỉ tìm đường), còn NAT thay đổi IP nguồn (Src-NAT) hoặc IP đích (Dst-NAT)",
            "Giải thích đúng lý do Private IP (RFC 1918) cần Src-NAT Masquerade khi ra Internet nhưng không cần NAT giữa các VLAN nội bộ",
            "Chỉ định chính xác vị trí chặn Inter-VLAN là `/ip firewall filter` với `chain=forward`"
          ]
        },

        // CÂU 4 - MẢNG NETWORK (DUAL-WAN FAILOVER)
        {
          question: "[Câu 4/12 — Dual-WAN Failover & Chẩn đoán Mất mạng] Công ty có 2 đường truyền cáp quang (WAN1 và WAN2) đấu vào Router MikroTik. Em cấu hình thế nào để khi WAN1 bị đứt cáp quang ở ngoài trạm nhà mạng (nhưng cục Converter/Modem trong phòng Server vẫn sáng đèn), hệ thống vẫn tự động chuyển sang WAN2? Phản biện nối tiếp: Nếu người dùng vẫn kêu không vào được web dù đã chuyển sang WAN2, em kiểm tra gì trong 30 giây?",
          wrongAnswer: "Dạ em chỉ cần tạo 2 Default Route với Distance=1 cho WAN1 và Distance=2 cho WAN2 rồi tích chọn `check-gateway=ping` là khi nào đứt cáp nó tự nhảy sang WAN2 ạ. Nếu sang WAN2 mà vẫn không vào được web thì chắc cả 2 nhà mạng cùng đứt cáp một lúc ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Về cấu hình Dual-WAN Failover thực chất**: Nếu chỉ tích `check-gateway=ping` trên Default Route thông thường, MikroTik chỉ ping tới IP của chiếc Modem nhà mạng đặt ngay trong tủ Rack. Khi đứt cáp ngoài đường, chiếc Modem vẫn có điện nên vẫn trả lời Ping -> MikroTik tưởng WAN1 vẫn sống và không chuyển sang WAN2! Để xử lý triệt để, em cấu hình **Recursive Routing (Định tuyến đệ quy)** hoặc **Netwatch**:\n   - Tạo một Route tĩnh `/32` ép đường đi tới `8.8.8.8` phải đi qua Gateway của WAN1 (`scope=10`).\n   - Tạo Default Route `0.0.0.0/0` chính (`distance=1`) đặt `gateway=8.8.8.8` với `check-gateway=ping` và `target-scope=11`.\n   - Khi WAN1 đứt cáp ngoài trạm, ping tới `8.8.8.8` qua WAN1 bị rớt -> Default Route chính tự động Inactive và kích hoạt Default Route phụ của WAN2 (`distance=2`).\n2. **Trả lời phản biện (Đã chuyển sang WAN2 mà vẫn không vào được web)**: Em kiểm tra ngay trong 30 giây 2 điểm rất hay bị bỏ sót khi chuyển sang WAN2:\n   - **Một là thiếu Rule Src-NAT (Masquerade) cho cổng WAN2**: Nhiều khi Admin chỉ mới tạo NAT Masquerade cho `out-interface=ether1-WAN1` mà quên tạo cho `ether2-WAN2` (hoặc chưa đưa WAN2 vào `interface-list=WAN`), khiến gói tin đi ra WAN2 mang nguyên IP Private nên không nhận được phản hồi.\n   - **Hai là lỗi DNS nhà mạng cũ**: Nếu trong `/ip dns` đang điền cứng DNS riêng của nhà mạng ISP1 (chỉ cho phép truy vấn từ IP của ISP1), khi chuyển sang đường truyền ISP2 sẽ bị từ chối phân giải tên miền -> Cần đổi sang DNS chung như `1.1.1.1` / `8.8.8.8`.",
          keyPoints: [
            "Giải thích rõ tại sao `check-gateway=ping` đơn thuần thất bại khi đứt cáp ngoài trạm và cách dùng Recursive Routing qua `8.8.8.8`",
            "Bắt trúng 2 lỗi kinh điển khi chuyển mạch sang WAN2 mà vẫn mất mạng: Quên tạo Src-NAT Masquerade cho cổng WAN2 hoặc kẹt DNS riêng của ISP1"
          ]
        },

        // CÂU 5 - MẢNG AD & DNS (KIẾN TRÚC DNS TRONG DOMAIN)
        {
          question: "[Câu 5/12 — Active Directory & DNS] Tại sao người ta nói 'DNS là trái tim của Active Directory'? Phản biện nối tiếp: Nếu công ty có 1 máy chủ Domain Controller (`192.168.10.10`), khi cấu hình DHCP cấp IP cho nhân viên, em sẽ điền thông số DNS Server như thế nào để vừa vào được Domain mượt mà vừa lướt web Internet nhanh?",
          wrongAnswer: "Dạ DNS giúp đổi tên thành IP ạ. Trong DHCP em sẽ điền DNS dòng 1 là `192.168.10.10` để vào Domain, còn dòng 2 em điền `8.8.8.8` của Google để nhân viên lướt web cho nhanh và lỡ Server có tắt thì vẫn có mạng dùng ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Tại sao DNS là trái tim của Active Directory?**: Bởi vì các máy trạm trong Domain không tìm kiếm Domain Controller bằng cách phát Broadcast hay nhớ IP tĩnh, mà hoàn toàn dựa vào việc truy vấn các **bản ghi dịch vụ DNS SRV Records** (ví dụ `_ldap._tcp.dc._msdcs.corp.local` để tìm dịch vụ thư mục LDAP, và `_kerberos._tcp.dc._msdcs.corp.local` để xác thực Kerberos). Nếu không phân giải được các bản ghi SRV này, máy trạm sẽ không thể Join Domain, không xác thực đăng nhập được và không tải được GPO từ `\\\\domain.local\\SYSVOL`.\n2. **Trả lời câu hỏi phản biện về cấu hình DNS trong DHCP**:\n   - Trên DHCP cấp cho máy trạm nội bộ, em **chỉ điền duy nhất IP của các Domain Controller nội bộ** (ví dụ `192.168.10.10`, và nếu có DC02 dự phòng thì điền dòng 2 là `192.168.10.11`).\n   - Em **tuyệt đối KHÔNG điền `8.8.8.8` vào Secondary DNS của máy trạm**. Vì cơ chế của Windows không chỉ dùng Secondary DNS khi Primary chết: chỉ cần DC phản hồi chậm một nhịp, Windows sẽ nhảy sang hỏi `8.8.8.8`. Khi hỏi `8.8.8.8` về tên nội bộ `corp.local`, Google trả về `NXDOMAIN` (Tên miền không tồn tại) khiến Windows báo lỗi ngay mà không hỏi lại DC nữa, gây ra hiện tượng mất ổ đĩa mạng và treo màn hình đăng nhập 10-15 phút.\n   - Để nhân viên lướt web Internet nhanh, em cấu hình **DNS Forwarders** (`1.1.1.1`, `8.8.8.8`) ở ngay bên trong dịch vụ DNS Server của Domain Controller.",
          keyPoints: [
            "Nêu rõ cơ chế máy trạm tìm DC thông qua bản ghi DNS SRV (`_ldap`, `_kerberos`)",
            "Phân tích rõ tác hại của việc điền `8.8.8.8` vào Secondary DNS trên máy trạm (bị trả về NXDOMAIN làm đứt kết nối AD/GPO/SMB)",
            "Đưa ra mô hình chuẩn: Client -> Internal DC DNS -> DNS Forwarders -> Internet (và triển khai thêm DC02 nếu cần dự phòng)"
          ]
        },

        // CÂU 6 - MẢNG AD & TROUBLESHOOTING (1 USER VS CẢ VĂN PHÒNG & TRUST RELATIONSHIP)
        {
          question: "[Câu 6/12 — Sự cố Đăng nhập Domain & Trust Relationship] Nhân viên gọi báo không đăng nhập được vào máy tính bằng tài khoản Domain. Em khoanh vùng thế nào giữa lỗi của User và lỗi của Máy tính? Phản biện nối tiếp: Nếu màn hình hiện lỗi 'The trust relationship between this workstation and the primary domain failed', nguyên nhân gốc rễ là gì và em sửa thế nào nhanh nhất mà không làm mất cấu hình của máy?",
          wrongAnswer: "Dạ em sẽ lấy tài khoản Admin vào máy đó, cho máy thoát khỏi Domain về Workgroup, khởi động lại máy rồi Join vào lại Domain và khởi động lại lần nữa là xong ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Khoanh vùng lỗi User vs lỗi Máy tính**:\n   - Em nhìn thông báo lỗi trên màn hình hoặc thực hiện **phép thử chéo**: Cho User đó đăng nhập thử sang máy đồng nghiệp bên cạnh. Nếu sang máy khác cũng báo lỗi (*Account locked out / Password expired / Logon workstation restriction*), em kiểm tra tài khoản trên AD bằng `net user <username> /domain` và xem **Event ID 4740** trên DC để tìm nguyên nhân khóa tài khoản.\n   - Nếu User đó sang máy khác vào được bình thường, còn ai ngồi vào chiếc máy này cũng lỗi -> Lỗi nằm tại chiếc máy tính (kiểm tra kết nối mạng, DNS, độ lệch giờ Kerberos < 5 phút, hoặc kênh Trust).\n2. **Trả lời phản biện về lỗi 'Trust relationship failed'**:\n   - **Nguyên nhân gốc rễ**: Mỗi chiếc máy tính khi Join Domain đều có một **Machine Account** (`ComputerName$`) và tự động đổi mật khẩu ngầm với Domain Controller mỗi 30 ngày. Khi máy trạm bị bung lại bản Ghost/Snapshot cũ, hoặc tắt nguồn lưu kho quá lâu bị lệch mật khẩu Machine Account với AD, kênh bảo mật (Secure Channel) sẽ bị đứt.\n   - **Cách sửa chuẩn Senior trong 10 giây (không cần Disjoin/Rejoin 2 lần khởi động lại)**: Em đăng nhập vào máy bằng tài khoản Local Administrator, mở PowerShell quyền Admin và chạy lệnh:\n     `Test-ComputerSecureChannel -Repair -Credential (Get-Credential)`\n     Nhập tài khoản có quyền Domain Admin vào, lệnh sẽ đồng bộ lại mật khẩu Machine Account và trả về `True`, người dùng đăng nhập lại được ngay lập tức!",
          keyPoints: [
            "Dùng phép thử chéo và Event ID 4740 để tách bạch lỗi User Object và lỗi Computer Object",
            "Giải thích đúng bản chất Machine Account Password (đổi mỗi 30 ngày) gây ra lỗi Trust Relationship khi bung Ghost/Snapshot cũ",
            "Sử dụng lệnh `Test-ComputerSecureChannel -Repair` thay vì cách Disjoin/Rejoin thủ công tốn thời gian"
          ]
        },

        // CÂU 7 - MẢNG GPO (OU DESIGN, LSDOU & GPRESULT)
        {
          question: "[Câu 7/12 — Thiết kế OU & Chẩn đoán GPO] Em hãy trình bày cách thiết kế cây OU chuẩn cho một công ty và giải thích tại sao khi một GPO không áp dụng xuống máy trạm, ta không nên chỉ ngồi gõ `gpupdate /force`? Phản biện nối tiếp: Nếu em tạo GPO ở nhánh User Configuration nhưng lại gắn (Link) vào OU chứa Computer, hoặc xóa nhóm `Authenticated Users` trong Security Filtering thì chuyện gì xảy ra?",
          wrongAnswer: "Dạ em cứ tạo mỗi phòng ban 1 OU rồi bỏ chung cả User và Computer vào đó cho tiện ạ. Khi GPO không chạy thì em gõ `gpupdate /force` rồi khởi động lại máy, nếu vẫn không chạy thì em gắn GPO thẳng lên cấp Domain luôn ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Thiết kế OU chuẩn & Công cụ chẩn đoán**:\n   - Em luôn tách rõ nhánh **`OU=Users`** (chia theo các OU con từng phòng ban: HR, Sales, Accounting) và nhánh **`OU=Computers` / `Workstations`** (chia theo phòng ban hoặc loại thiết bị Desktop/Laptop), đồng thời tách riêng `OU=Servers` và `OU=Service_Accounts`. Cách này giúp gắn các GPO dành cho User và GPO dành cho Computer cực kỳ rõ ràng, không bị chồng chéo.\n   - Khi GPO không áp dụng, `gpupdate /force` chỉ là lệnh tải lại chính sách chứ không cho biết nguyên nhân lỗi. Em bắt buộc phải chạy lệnh **`gpresult /r`** (hoặc **`gpresult /h report.html`**) để lấy bằng chứng xem đối tượng đang nằm ở OU nào và GPO bị chặn ở bước nào.\n2. **Trả lời 2 tình huống phản biện**:\n   - **Cấu hình User Configuration nhưng Link vào OU chỉ chứa Computer**: GPO đó sẽ **hoàn toàn không có tác dụng** (trừ khi bật chế độ đặc biệt Loopback Processing), vì nhánh User Configuration chỉ áp dụng lên các đối tượng `User` nằm trong OU đó.\n   - **Xóa `Authenticated Users` trong Security Filtering để chỉ giữ lại 1 nhóm User**: GPO đó sẽ bị báo lỗi *Denied (Security Filtering)* và không chạy được! Bởi vì từ bản vá bảo mật MS16-072, Windows yêu cầu **bản thân chiếc máy tính (`Domain Computers`) cũng phải có quyền `Read`** đối với GPO thì mới tải được gói chính sách từ SYSVOL về cho User. Giải pháp đúng là trong tab **Delegation**, luôn giữ quyền **Read** cho `Authenticated Users` hoặc `Domain Computers`, và chỉ điều chỉnh quyền `Apply Group Policy` cho nhóm User mục tiêu.",
          keyPoints: [
            "Thiết kế OU tách biệt rõ ràng giữa Users và Computers để quản lý GPO chính xác",
            "Dùng `gpresult /r` và `gpresult /h` làm công cụ chẩn đoán bằng chứng",
            "Giải thích sắc bén 2 cái bẫy lớn nhất của GPO: Lệch nhánh User/Computer Configuration với đối tượng trong OU, và mất quyền Read của Computer khi xóa `Authenticated Users` trong Security Filtering"
          ]
        },

        // CÂU 8 - MẢNG FILE SERVER (SMB VS NTFS, AGDLP, ABE)
        {
          question: "[Câu 8/12 — Phân quyền File Server SMB & NTFS] Khi cấu hình File Server cho các phòng ban, quy tắc kết hợp giữa quyền SMB Share và quyền NTFS Security là gì? Phản biện nối tiếp: Nếu một nhân viên phòng Kế toán vừa chuyển sang phòng Nhân sự, làm sao để họ không còn thấy các thư mục của phòng Kế toán nữa và tại sao tuyệt đối không được phân quyền trực tiếp cho từng tài khoản cá nhân (User) trên từng thư mục?",
          wrongAnswer: "Dạ quyền nào cao hơn thì Windows sẽ lấy quyền đó ạ, nên em cứ để Everyone Full Control cho dễ. Khi nhân viên chuyển phòng thì em vào từng thư mục của phòng Kế toán tìm tên bạn đó xóa đi rồi sang thư mục Nhân sự thêm tên bạn đó vào ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Quy tắc giao thoa giữa SMB Share và NTFS Security**:\n   - Khi người dùng truy cập qua mạng (`\\\\Server\\Share`), quyền thực tế họ nhận được là **quyền hẹp nhất (Most Restrictive / Giao của hai tập hợp)** giữa SMB Share Permission và NTFS Permission.\n   - Thực hành chuẩn (Best Practice) của Microsoft là: Ở tầng **SMB Share**: cấp cho `Authenticated Users` quyền `Change/Full Control` (tuyệt đối xóa `Everyone`), còn toàn bộ việc phân quyền chi tiết cho từng phòng ban (Read, Modify, tắt Inheritance cho thư mục con nhạy cảm) sẽ được kiểm soát chặt chẽ ở tầng **NTFS Security** kết hợp bật tính năng **ABE (Access-Based Enumeration)** để người dùng không có quyền vào thư mục nào thì hoàn toàn không nhìn thấy thư mục đó.\n2. **Trả lời phản biện (Tại sao dùng Group theo mô hình AGDLP thay vì gán từng User)**:\n   - Nếu gán trực tiếp từng User vào hàng trăm thư mục NTFS, hệ thống ACL sẽ cực kỳ rối rắm và khi nhân viên chuyển bộ phận sẽ rất dễ bỏ sót quyền cũ (Privilege Creep).\n   - Em luôn áp dụng nguyên tắc **AGDLP (Account -> Global Group -> Domain Local Permission)**: Tạo các Security Group theo vai trò (`GG_Accounting`, `GG_HR`) và gán quyền NTFS trên các Group này. Khi nhân viên chuyển từ Kế toán sang Nhân sự, em chỉ cần vào Active Directory **gỡ tài khoản của họ khỏi `GG_Accounting` và thêm vào `GG_HR`**. Ngay ở lần đăng nhập kế tiếp, nhờ tính năng ABE, toàn bộ thư mục Kế toán sẽ tự động biến mất và thư mục Nhân sự sẽ hiện ra!",
          keyPoints: [
            "Nắm chắc quy tắc Most Restrictive giữa SMB Share và NTFS, cùng Best Practice cấu hình SMB + NTFS + ABE",
            "Giải thích thuyết phục lợi ích của việc phân quyền qua Security Group (AGDLP) khi nhân sự luân chuyển phòng ban"
          ]
        },

        // CÂU 9 - MẢNG VPN & FILE SHARE TROUBLESHOOTING
        {
          question: "[Câu 9/12 — Chẩn đoán VPN Connected nhưng mất File Share] Nhân viên làm việc tại nhà báo đã kết nối VPN thành công nhưng không mở được `\\\\FILESERVER\\Data`. Em hãy nêu quy trình chẩn đoán từng bước từ thấp lên cao? Phản biện nối tiếp: Tại sao chạy `ping 192.168.10.20` (IP của File Server) vẫn trả lời bình thường mà mở File Share vẫn báo lỗi không kết nối được?",
          wrongAnswer: "Dạ nếu ping đã thông rồi thì mạng và Firewall chắc chắn không sao cả ạ. Chắc do máy của nhân viên ở nhà bị lỗi Windows nên em bảo bạn ấy cài lại Win hoặc tắt hết tường lửa trên Server đi ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Quy trình chẩn đoán 4 bước bằng bằng chứng**:\n   - **Bước 1 (Tách lỗi DNS trong 5 giây)**: Em bảo người dùng mở Run gõ trực tiếp bằng IP `\\\\192.168.10.20\\Data`. Nếu vào được bằng IP mà không vào được bằng tên `\\\\FILESERVER` -> Lỗi 100% do VPN chưa đẩy DNS nội bộ xuống máy trạm.\n   - **Bước 2 (Kiểm tra cổng SMB TCP 445)**: Nếu bằng IP cũng lỗi, em mở PowerShell trên máy trạm chạy lệnh **`Test-NetConnection 192.168.10.20 -Port 445`**.\n   - **Bước 3 (Nếu Port 445 báo `False`)**: Em kiểm tra **Bảng định tuyến (`route print`)** trên máy trạm (khi dùng Split Tunnel), kiểm tra **Firewall Forward Chain** trên Router MikroTik, và kiểm tra **Windows Defender Firewall** trên File Server.\n   - **Bước 4 (Nếu Port 445 báo `True`)**: Đường mạng đã thông suốt -> Lỗi nằm ở khâu xác thực (máy cá nhân ở nhà chưa nhập định dạng `DOMAIN\\username` trong Credential Manager) hoặc thiếu quyền SMB/NTFS.\n2. **Trả lời câu hỏi phản biện (Tại sao Ping thông mà vẫn không vào được File Share?)**:\n   - Bởi vì lệnh `ping` chỉ sử dụng giao thức **ICMP ở Layer 3**, trong khi dịch vụ File Share (SMB) hoạt động trên giao thức **TCP Port 445 ở Layer 4/7**.\n   - Rất thường xảy ra 2 trường hợp: (1) Trên Router Firewall cho phép ICMP nhưng lại chặn TCP 445; hoặc (2) Kinh điển nhất là trên **Windows Defender Firewall của chính máy chủ File Server**, Rule *File and Printer Sharing (SMB-In TCP 445)* đang để chế độ **Scope = `LocalSubnet`** (chỉ cho phép các máy cùng lớp mạng LAN `192.168.10.x` kết nối port 445, còn IP VPN `10.10.99.x` khác Subnet gửi gói TCP SYN 445 tới sẽ bị Windows Server chặn đứng dù vẫn trả lời Ping!). Giải pháp an toàn là thêm dải IP VPN `10.10.99.0/24` vào mục Remote IP trong Scope của Rule SMB-In trên File Server.",
          keyPoints: [
            "Trình tự kiểm chứng chuẩn: Thử IP vs Tên -> `Test-NetConnection -Port 445` -> Route/Firewall -> Auth/Permission",
            "Giải thích xuất sắc sự khác biệt giữa ICMP (Ping) và TCP Port 445 (SMB), đặc biệt là cái bẫy `LocalSubnet` trên Windows Firewall của File Server"
          ]
        },

        // CÂU 10 - MẢNG STORAGE, RAID & BACKUP (3-2-1 & RANSOMWARE)
        {
          question: "[Câu 10/12 — RAID, NAS & Chiến lược Backup 3-2-1] Giám đốc hỏi em: 'Công ty mình vừa mua con NAS Synology 4 ổ cứng chạy RAID 5 (hoặc RAID 10) hết mấy chục triệu rồi, thế là dữ liệu đã được sao lưu an toàn tuyệt đối rồi đúng không, cần gì tốn tiền làm Backup nữa?'. Em giải thích thế nào cho Giám đốc hiểu và thiết kế giải pháp bảo vệ dữ liệu chống lại cả hỏng phần cứng lẫn Ransomware?",
          wrongAnswer: "Dạ đúng rồi sếp ạ! Chạy RAID 5 hoặc RAID 10 là dữ liệu đã được nhân bản sang các ổ cứng khác nhau rồi nên không bao giờ sợ mất dữ liệu nữa, không cần mua thêm ổ cứng Backup đâu ạ.",
          rightAnswer: "Thưa anh/chị, em sẽ giải thích rõ với Giám đốc bằng một ví dụ dễ hiểu rằng: **'RAID chỉ giúp công ty không bị ngừng làm việc khi cháy 1 ổ cứng (tăng Uptime/Availability), chứ RAID hoàn toàn KHÔNG PHẢI LÀ BACKUP'**.\n1. **Tại sao RAID không cứu được dữ liệu trong hầu hết các thảm họa?**:\n   - Vì cơ chế của RAID là **đồng bộ tức thời (Real-time Mirroring/Parity)**. Nếu một nhân viên lỡ tay bấm `Shift + Delete` xóa nhầm thư mục hợp đồng, hoặc một con **Ransomware** mã hóa file trên ổ đĩa mạng, thì ngay trong tích tắc đó, hành động xóa hoặc mã hóa đó sẽ được ghi đè đồng loạt lên cả 4 ổ cứng trong mảng RAID! Lúc đó 4 ổ cứng vẫn báo 'Healthy xanh mượt' nhưng dữ liệu bên trong đã bị phá hủy hoàn toàn.\n   - Chưa kể nếu xảy ra cháy nổ phòng Server, hỏng bo mạch RAID Controller, hoặc chết đồng thời 2 ổ cứng trong RAID 5 thì mất trắng toàn bộ.\n2. **Thiết kế kiến trúc bảo vệ dữ liệu toàn diện (Quy tắc 3-2-1-1-0)**:\n   - **3 bản dữ liệu**: 1 bản chính đang chạy trên Server/NAS + ít nhất 2 bản sao lưu.\n   - **2 môi trường lưu trữ độc lập**: Ví dụ từ Windows File Server sao lưu sang NAS thứ hai hoặc ổ cứng gắn ngoài/Tape.\n   - **1 bản Offsite / Cloud**: Đẩy 1 bản đã mã hóa lên Cloud (AWS S3 / Backblaze / Azure) hoặc đặt ở chi nhánh khác.\n   - **1 bản Immutable / Offline (Chống Ransomware)**: Bật tính năng **Immutable Snapshot (WORM - Write Once Read Many)** trên NAS Synology và **tách biệt hoàn toàn tài khoản quản trị NAS/Backup khỏi Domain AD** (để dù máy Domain Admin bị nhiễm Ransomware thì mã độc cũng không thể đăng nhập vào NAS để xóa bản Backup).\n   - **0 lỗi khi diễn tập khôi phục (Restore Drill)**: Định kỳ hàng tháng/quý phải bốc thử một bản Backup ra khôi phục và mở thử file để chắc chắn bản Backup dùng được.",
          keyPoints: [
            "Khẳng định đanh thép: RAID = High Availability (chống hỏng phần cứng đơn lẻ), Backup = Data Recovery (chống xóa nhầm, Ransomware, thảm họa)",
            "Trình bày đầy đủ quy tắc 3-2-1-1-0, nhấn mạnh vào Immutable Snapshot, tách tài khoản Backup khỏi Domain AD và diễn tập Restore Drill"
          ]
        },

        // CÂU 11 - MẢNG QUYẾT ĐỊNH VẬN HÀNH (BUSINESS IMPACT: RANSOMWARE VS RAID DEGRADED)
        {
          question: "[Câu 11/12 — Ra quyết định theo Business Impact] Giữa giờ làm việc cao điểm, nếu phát hiện 1 máy trạm có dấu hiệu nhiễm Ransomware đang mã hóa ổ đĩa chung, so với trường hợp NAS lưu trữ báo hỏng 1 ổ cứng trong mảng RAID 5 (Degraded), cách phản ứng của em ở 2 trường hợp này khác nhau như thế nào? Tại sao?",
          wrongAnswer: "Dạ cả hai trường hợp đều rất nguy hiểm nên em sẽ tắt nguồn ngay con NAS và tắt nguồn File Server để bảo vệ dữ liệu trước, sau đó em mới đi sửa máy virus và thay ổ cứng cho NAS ngay trong buổi sáng ạ.",
          rightAnswer: "Thưa anh/chị, hai tình huống này đòi hỏi **hai chiến lược phản ứng hoàn toàn trái ngược nhau** dựa trên việc đánh giá tốc độ gây thiệt hại dữ liệu (Data Loss Velocity) và ảnh hưởng vận hành (Business Impact):\n1. **Trường hợp 1 — Máy trạm nhiễm Ransomware (Ưu tiên: CÔ LẬP NGAY TRONG 30 GIÂY)**:\n   - Đây là mối đe dọa đang phá hủy dữ liệu theo từng giây. Em **không chờ hết ca**, lập tức rút cáp mạng LAN / tắt Wi-Fi của máy nghi nhiễm.\n   - Đồng thời, thay vì tắt cả File Server làm cả công ty ngừng việc, em dùng lệnh `Get-SmbOpenFile` / `Get-SmbSession` (hoặc xem `Connected Users` trên NAS) để tìm đúng **IP và Username** của máy đang mã hóa file -> Chạy `Close-SmbSession` để cắt đứt kết nối SMB của riêng máy đó, khóa tài khoản AD (`Disable-ADAccount`) và khóa cổng Switch. Các bộ phận khác vẫn làm việc bình thường trong khi em khôi phục thư mục bị ảnh hưởng từ Snapshot.\n2. **Trường hợp 2 — NAS RAID 5 báo hỏng 1 ổ cứng Degraded (Ưu tiên: GIỮ VẬN HÀNH QUA CA & KIỂM TRA BACKUP TRƯỚC)**:\n   - RAID 5 được thiết kế để khi chết 1 ổ thì hệ thống **vẫn đọc ghi hoạt động bình thường**. Nếu tắt NAS hoặc bấm Rebuild ngay lúc 10h sáng cao điểm, toàn bộ ổ cứng còn lại sẽ bị ép đọc 100% công suất gây treo đơ hệ thống và rất dễ làm chết nốt ổ cứng thứ 2 (dẫn đến mất sạch dữ liệu).\n   - Vì vậy: Trong giờ hành chính, em chỉ tắt còi Bíp, **kiểm tra ngay bản Backup mới nhất** (hoặc sao lưu bổ sung các dữ liệu quan trọng nhất vừa phát sinh trong ngày), giữ cho NAS chạy êm qua hết ca sản xuất. Đến tối hết giờ làm việc, em mới bật đèn định vị ổ hỏng, **đối chiếu chính xác Serial Number**, rút ổ hỏng thay ổ mới và bấm **Repair**.",
          keyPoints: [
            "Ransomware -> Cô lập tức thì (Targeted Containment qua SMB Session + Switch Port + AD Account)",
            "RAID 5 Degraded -> Giữ hệ thống chạy hết ca sản xuất -> Kiểm tra Backup trước -> Đối chiếu Serial Number thay ổ và Rebuild ngoài giờ cao điểm"
          ]
        },

        // CÂU 12 - MẢNG AN TOÀN VẬN HÀNH & PHƯƠNG ÁN WORKAROUND SẢN XUẤT
        {
          question: "[Câu 12/12 — An toàn Vận hành, Change Management & Workaround] Khi đang ở dưới xưởng sản xuất, dây chuyền đóng gói bị dừng vì máy in tem nhãn Barcode không in được trong khi xe hàng sắp phải xuất bến. Em xử lý thế nào? Phản biện nối tiếp: Trong công việc hàng ngày, trước khi em thực hiện một thay đổi lớn trên hệ thống đang chạy (như sửa Firewall, đổi cấu hình VLAN trên Switch tổng, hay nâng cấp Server), nguyên tắc an toàn vận hành của em là gì?",
          wrongAnswer: "Dạ máy in hỏng thì em tháo ra sửa tại chỗ đến khi nào được thì thôi ạ. Còn khi cần sửa Firewall hay Switch tổng thì em cứ vào Winbox/SSH gõ lệnh sửa luôn cho nhanh, nếu thấy ai kêu mất mạng thì em sửa lại ạ.",
          rightAnswer: "Thưa anh/chị:\n1. **Xử lý máy in dây chuyền đóng gói khi đang xuất hàng gấp (Workaround First)**:\n   - Đầu tiên trong 60 giây, em kiểm tra nhanh xem có phải kẹt hàng đợi **Print Spooler** (dừng Spooler -> xóa file trong `System32\\spool\\PRINTERS` -> bật lại Spooler) hoặc máy in bị nhảy IP động sau khi mất điện không.\n   - Nếu phát hiện máy in bị hỏng phần cứng (cháy đầu nhiệt, hỏng nguồn) không thể sửa trong 5 phút, em tuyệt đối không bắt dây chuyền đứng chờ. Em áp dụng ngay **Workaround**: Chuyển hướng địa chỉ IP trong **Printer Port** của chuyền đó sang chiếc máy in của chuyền kế bên (hoặc lấy máy in dự phòng gán đúng IP tĩnh của máy cũ lắp vào) để công nhân in tem đóng hàng kịp giờ xe chạy. Sau đó em mới mang máy hỏng về phòng IT sửa và rà soát gán **DHCP Static Lease** cho toàn bộ máy in.\n2. **Trả lời phản biện — Nguyên tắc An toàn Vận hành (Change Management & Rollback Plan)**:\n   Trên môi trường Production, em luôn tuân thủ 4 nguyên tắc sắt đá trước mọi thay đổi:\n   - **Một là Sao lưu cấu hình trước khi chạm vào (Backup Before Change)**: Xuất file cấu hình Router/Switch (`/export file=...`, `write memory`), hoặc chụp Snapshot/Backup máy chủ.\n   - **Hai là Có phương án quay lui (Rollback Plan & Safe Mode)**: Trên MikroTik, luôn bật **Safe Mode (`Ctrl + X`)** khi sửa Firewall/VLAN từ xa để nếu lỡ tay làm đứt kết nối, Router sẽ tự động hoàn tác lệnh đó. Trên Switch Cisco, luôn dùng từ khóa `add` khi thêm VLAN vào cổng Trunk.\n   - **Ba là Thực hiện trong khung giờ bảo trì (Maintenance Window)** và thông báo trước cho các bộ phận liên quan đối với các thay đổi có nguy cơ gây gián đoạn.\n   - **Bốn là Kiểm chứng sau thay đổi (Post-Change Verification)** và cập nhật lại tài liệu sơ đồ mạng.",
          keyPoints: [
            "Áp dụng linh hoạt Workaround (đổi Printer Port / thay máy cùng IP) để giải cứu dây chuyền sản xuất trong 5 phút",
            "Trình bày trọn vẹn 4 nguyên tắc An toàn vận hành chuẩn Senior: Backup trước khi sửa -> Có kế hoạch Rollback (Safe Mode / `allowed vlan add`) -> Làm trong Maintenance Window -> Kiểm chứng & Cập nhật tài liệu"
          ]
        }
      ],
      quizzes: [
        {
          question: "[Tổng hợp 1] Một máy tính trong VLAN 20 (`192.168.20.50/24`) muốn truy cập vào máy chủ File Server trong VLAN 100 (`192.168.100.20/24`), cả hai VLAN đều được định tuyến qua Router MikroTik trung tâm. Khi kiểm tra Firewall trên MikroTik, bạn cần đảm bảo gói tin được phép đi qua chuỗi (Chain) nào?",
          options: [
            "`chain=input` trong `/ip firewall filter`",
            "`chain=output` trong `/ip firewall filter`",
            "`chain=forward` trong `/ip firewall filter`",
            "`chain=srcnat` với `action=masquerade` là bắt buộc"
          ],
          correctIndex: 2,
          explanation: "Lưu lượng đi từ VLAN 20 sang VLAN 100 là lưu lượng đi XUYÊN QUA Router (từ giao diện mạng này sang giao diện mạng khác), do đó nó được kiểm soát bởi `chain=forward` trong `/ip firewall filter`. Hai VLAN nội bộ đã có Connected Routes trên cùng Router nên không cần NAT Masquerade."
        },
        {
          question: "[Tổng hợp 2] Máy tính `PC-SALES-05` sau khi được khôi phục từ một bản Ghost cũ thì không ai đăng nhập tài khoản Domain vào được nữa, màn hình báo lỗi: 'The trust relationship between this workstation and the primary domain failed'. Cách xử lý nào sau đây là NHANH VÀ CHUẨN NHẤT?",
          options: [
            "Cài đặt lại mới hoàn toàn hệ điều hành Windows 11 cho máy tính đó.",
            "Đăng nhập bằng tài khoản Local Administrator, mở PowerShell chạy lệnh `Test-ComputerSecureChannel -Repair -Credential (Get-Credential)` với quyền Domain Admin.",
            "Vào máy chủ Domain Controller tắt dịch vụ Active Directory Domain Services.",
            "Điền thêm DNS `8.8.8.8` vào card mạng của máy tính."
          ],
          correctIndex: 1,
          explanation: "Lỗi Trust Relationship xảy ra do mật khẩu Machine Account lưu trong bản Ghost cũ không còn khớp với mật khẩu hiện tại trên Active Directory. Lệnh `Test-ComputerSecureChannel -Repair` sẽ đồng bộ lại mật khẩu kênh bảo mật ngay lập tức mà không cần Disjoin/Rejoin."
        },
        {
          question: "[Tổng hợp 3] Nhân viên kết nối VPN về công ty báo không vào được `\\\\FILESERVER\\Public`. Bạn bảo họ gõ thử bằng địa chỉ IP `\\\\192.168.10.20\\Public` thì mở được thư mục ngay, và chạy `Test-NetConnection 192.168.10.20 -Port 445` cũng báo `TcpTestSucceeded: True`. Nguyên nhân gốc rễ nằm ở đâu?",
          options: [
            "Windows Firewall trên File Server đang chặn cổng 445.",
            "Router MikroTik đang chặn gói tin ở Forward Chain.",
            "Máy trạm VPN chưa phân giải được tên `FILESERVER` sang IP `192.168.10.20` (thiếu cấu hình đẩy DNS nội bộ hoặc thiếu DNS Suffix trên kết nối VPN).",
            "Ổ cứng của File Server đã bị hỏng hoàn toàn."
          ],
          correctIndex: 2,
          explanation: "Khi truy cập bằng địa chỉ IP thành công và Port 445 đã thông suốt (`TcpTestSucceeded: True`), toàn bộ tầng mạng, Routing, Firewall và quyền truy cập SMB đều không có lỗi. Việc thất bại khi gọi bằng tên `\\\\FILESERVER` chứng minh 100% lỗi thuộc về phân giải tên DNS qua VPN."
        },
        {
          question: "[Tổng hợp 4] Trong các hành động dưới đây khi vận hành hệ thống doanh nghiệp, hành động nào tuân thủ ĐÚNG chuẩn An toàn vận hành của một System & Network Administrator chuyên nghiệp?",
          options: [
            "Khi nhân viên báo không vào được thư mục chia sẻ, lập tức tắt Windows Firewall và cấp quyền `Everyone: Full Control` để nhân viên làm việc tiếp.",
            "Khi mảng RAID 5 báo hỏng 1 ổ cứng (Degraded) giữa ca sản xuất, lập tức rút điện tắt NAS ngay mà không cần thông báo cho ai.",
            "Khi thêm VLAN 50 vào cổng Trunk đang chạy sản xuất trên Switch, luôn sao lưu cấu hình trước và dùng đúng cú pháp `switchport trunk allowed vlan add 50` (hoặc bật Safe Mode trên MikroTik).",
            "Cấu hình `8.8.8.8` làm Primary DNS trên tất cả các máy trạm đã Join Domain Active Directory."
          ],
          correctIndex: 2,
          explanation: "Sao lưu cấu hình trước khi thay đổi, sử dụng `Safe Mode` trên MikroTik và dùng từ khóa `add` (`switchport trunk allowed vlan add ...`) trên Switch là những nguyên tắc sống còn giúp tránh tai nạn làm sập hệ thống mạng đang chạy sản xuất."
        }
      ]
    }
  }
];
