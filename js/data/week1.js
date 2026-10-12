// ============================================================================
// TUẦN 1: NETWORK FUNDAMENTALS & MIKROTIK (BÀI 01 -> BÀI 06)
// Phong cách: Từ thực chiến đến hiểu nguyên lý ("Cực kỳ dễ hiểu, mentor-mentee")
// ============================================================================

window.WEEK1_DATA = [
  // ==========================================================================
  // BÀI 01: IP ADDRESS, SUBNET MASK, DEFAULT GATEWAY, DNS
  // ==========================================================================
  {
    id: 1,
    code: "01",
    week: 1,
    title: "IP Address, Subnet Mask, Default Gateway & DNS",
    subtitle: "Phân biệt rõ chức năng từng thành phần trong đường đi của một gói tin; đọc hiểu ipconfig và route print",
    priority: "P0",
    duration: "75 phút",
    whyThisMatters: "Lúc đi làm thực tế, cậu gõ bộ tứ 'IP - Subnet Mask - Default Gateway - DNS' vào card mạng Windows hay MikroTik nhanh như chớp. Nhưng khi người phỏng vấn hỏi: 'Nếu anh bỏ trống Default Gateway hoặc xóa DNS thì máy tính còn ping được máy in cùng phòng không? Còn vào web bằng IP được không?', nhiều anh em lại ngập ngừng hoặc trả lời cảm tính là 'Mất mạng hoàn toàn'. Bài mở đầu này sẽ giúp cậu tách bạch rạch ròi vai trò của từng thông số trong hành trình của một gói tin.",
    analogy: {
      title: "Chuyện gửi thư trong một Khu Chung Cư",
      content: "Hãy tưởng tượng mạng máy tính giống như việc cậu đang ở trong một tòa chung cư và muốn gửi một bức thư:\n• IP Address (Địa chỉ IP): Là 'Số phòng + Tên tòa nhà' của cậu (VD: Phòng 15, Tòa nhà 192.168.10).\n• Subnet Mask (Mặt nạ mạng): Là 'Quy tắc đọc biển số phòng' giúp cậu nhìn vào địa chỉ người nhận là biết ngay người đó ở CÙNG TÒA NHÀ với mình hay ở TÒA NHÀ KHÁC.\n• Default Gateway (Cổng mặc định): Là 'Bác bảo vệ ở cổng chính tòa nhà'. Nếu gửi thư cho hàng xóm cùng tòa, cậu tự đi bộ sang tận cửa phòng người ta mà đưa, KHÔNG CẦN qua bác bảo vệ. Chỉ khi nào người nhận ở tòa nhà khác (khác mạng), cậu mới phải đưa thư cho bác bảo vệ để bác chuyển ra bưu cục bên ngoài.\n• DNS (Domain Name System): Là 'Cuốn danh bạ điện thoại'. Cậu nhớ tên quán là 'Phở Thìn' (google.com), nhưng khi đi gửi thư thì phải ghi địa chỉ số cụ thể (142.250.199.14). Nếu mất danh bạ (lỗi DNS), cậu chỉ không tra được tên ra số thôi, chứ nếu cậu thuộc lòng địa chỉ số thì thư vẫn đi bình thường!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "IP Address (Địa chỉ IPv4)",
          shortDef: "Là định danh logic ở tầng 3 (Layer 3 - Network) giúp xác định duy nhất một thiết bị trong một mạng cụ thể và dùng để định tuyến liên mạng.",
          easyExplain: "Khác với địa chỉ MAC (gắn cứng vào phần cứng card mạng như số CMND/CCCD), địa chỉ IP giống như địa chỉ tạm trú/thường trú của cậu. Đổi sang phòng ban khác (VLAN khác) thì IP sẽ đổi để phù hợp với quy hoạch của phòng ban đó. Một IP luôn gồm 2 phần: Phần Mạng (Network ID) và Phần Máy (Host ID).",
          realExample: "IP 192.168.10.15/24 -> Khi đi cùng /24, phần mạng là '192.168.10' và số thứ tự máy là '.15'."
        },
        {
          term: "Subnet Mask (Mặt nạ mạng con)",
          shortDef: "Là chuỗi 32-bit đi kèm với IP để chỉ định đâu là phần Network (mạng) và đâu là phần Host (máy), từ đó giúp thiết bị quyết định đích đến nằm CÙNG MẠNG hay KHÁC MẠNG.",
          easyExplain: "Bản thân con số 192.168.10.15 đứng một mình là vô nghĩa vì máy tính không biết ranh giới mạng nằm ở đâu. Subnet Mask hoạt động như một chiếc khuôn che: chỗ nào là bit 1 (số 255) thì giữ lại làm tên Mạng, chỗ nào là bit 0 thì dành cho các Máy trạm. Máy tính dùng phép toán logic AND giữa IP của nó và IP đích với Subnet Mask: nếu ra cùng Network ID -> gửi trực tiếp qua Switch (Layer 2); nếu khác -> gửi cho Default Gateway.",
          realExample: "Mask 255.255.255.0 (/24) có nghĩa là 3 cụm số đầu (24 bit) phải giống hệt nhau mới tính là 'cùng hội cùng thuyền' (tối đa 254 máy dùng được, trừ địa chỉ mạng .0 và broadcast .255)."
        },
        {
          term: "Default Gateway (Cổng mặc định)",
          shortDef: "Là địa chỉ IP của thiết bị định tuyến (Router / Layer 3 Switch) nằm CÙNG SUBNET với máy trạm, đóng vai trò là lối thoát khi máy trạm cần gửi gói tin sang một subnet khác.",
          easyExplain: "Tại sao gọi là 'Default' (Mặc định)? Vì trong bảng đường đi (Routing Table) của máy tính, nếu không có chỉ dẫn đặc biệt nào cho một đích đến lạ hoắc (như 8.8.8.8 hay VLAN 30), máy tính sẽ mặc định đẩy gói tin về địa chỉ này (tương ứng với tuyến 0.0.0.0/0). Lưu ý sống còn: IP của Default Gateway BẮT BUỘC phải nằm cùng subnet với máy tính thì máy tính mới tìm được đường đến cái cổng đó!",
          realExample: "Máy tính có IP 192.168.10.15/24 thì Default Gateway thường là 192.168.10.1 (IP gắn trên cổng Bridge/VLAN của con Router MikroTik)."
        },
        {
          term: "DNS (Domain Name System)",
          shortDef: "Là hệ thống phân giải tên miền thành địa chỉ IP (và ngược lại), giúp con người truy cập dịch vụ bằng tên dễ nhớ thay vì phải gõ địa chỉ số IP.",
          easyExplain: "Máy tính và Router chỉ nói chuyện với nhau bằng số (IP và MAC), hoàn toàn không hiểu chữ 'facebook.com' hay 'fileserver.local' là gì. Trước khi gửi gói tin kết nối đi, máy tính sẽ hỏi DNS Server: 'Ê, tên miền này có IP là bao nhiêu?'. Có được IP rồi thì nhiệm vụ của DNS kết thúc, phần việc truyền dữ liệu tiếp theo là của IP, Subnet Mask và Gateway.",
          realExample: "Cấu hình DNS Server là 192.168.10.1 (Router cache) hoặc 8.8.8.8 (Google DNS) để dịch 'erp.congty.vn' -> '192.168.30.100'."
        },
        {
          term: "ARP (Address Resolution Protocol)",
          shortDef: "Là giao thức phân giải địa chỉ IP (Layer 3) sang địa chỉ vật lý MAC (Layer 2) trong phạm vi một mạng nội bộ (cùng Broadcast Domain).",
          easyExplain: "Mảnh ghép cuối cùng mà anh em thực chiến hay quên khi đi phỏng vấn! Biết IP đích rồi, biết cùng mạng hay khác mạng rồi, nhưng để đẩy khung tin (Frame) chạy trên dây mạng qua Switch, card mạng bắt buộc phải ghi được Địa chỉ MAC đích. Nó sẽ hét lên toàn mạng LAN (ARP Broadcast): 'Ai đang giữ IP x.x.x.x thì cho tôi xin cái MAC!'.",
          realExample: "Khi PC (192.168.10.15) muốn gửi gói tin ra Internet (8.8.8.8), nó KHÔNG hỏi MAC của 8.8.8.8, mà dùng ARP hỏi MAC của Default Gateway (192.168.10.1)."
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt nhanh 4 thông số cấu hình mạng & hậu quả khi cấu hình sai",
        headers: ["Thành phần", "Câu hỏi nó trả lời", "Khi nào được dùng đến?", "Chuyện gì xảy ra nếu SAI hoặc THIẾU?"],
        rows: [
          [
            "IP Address",
            "Tôi là ai trong mạng này?",
            "Mọi giao tiếp mạng IP (cả nội bộ lẫn Internet).",
            "Trùng IP hoặc không có IP -> Không thể giao tiếp mạng."
          ],
          [
            "Subnet Mask",
            "Đích đến ở CÙNG MẠNG hay KHÁC MẠNG với tôi?",
            "Ngay bước đầu tiên khi chuẩn bị đóng gói tin gửi đi.",
            "Tính sai phạm vi mạng -> Đích khác mạng lại tưởng cùng mạng (không gửi qua Gateway) hoặc ngược lại."
          ],
          [
            "Default Gateway",
            "Nếu đích KHÁC MẠNG, tôi phải nhờ ai chuyển tiếp?",
            "CHỈ KHI đích đến nằm ở subnet khác (hoặc ra Internet).",
            "Các máy CÙNG SUBNET vẫn ping/share file bình thường! Nhưng mất hoàn toàn kết nối sang VLAN khác và Internet."
          ],
          [
            "DNS Server",
            "Tên miền này có địa chỉ IP là bao nhiêu?",
            "CHỈ KHI người dùng/ứng dụng truy cập bằng TÊN MIỀN (URL/Hostname).",
            "Ping IP (8.8.8.8) vẫn thông, vào `\\\\192.168.10.20` vẫn được, nhưng gõ `google.com` trên trình duyệt thì báo lỗi không tìm thấy trang."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Nguyên lý vàng cần khắc cốt ghi tâm: <b>Máy tính luôn kiểm tra Subnet Mask TRƯỚC khi quyết định có dùng Default Gateway hay không</b>, và trong suốt hành trình đi qua nhiều Router, <b>IP Nguồn - IP Đích giữ nguyên</b> (nếu chưa qua NAT), nhưng <b>MAC Nguồn - MAC Đích sẽ thay đổi ở từng chặng (hop-by-hop)</b>.",
      flowTitle: "Giải phẫu đường đi của gói tin: PC1 (192.168.10.15/24) truy cập Web/Server khác mạng",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Phân giải tên miền (DNS Query)",
          detail: "Giả sử cậu gõ `http://hr.congty.local` trên trình duyệt. PC1 chưa biết IP của trang này nên gửi gói tin hỏi DNS Server (VD: 192.168.10.1). DNS Server trả lời: 'hr.congty.local có IP là 192.168.30.50'. (Nếu cậu gõ thẳng IP 192.168.30.50 thì bỏ qua bước này).",
          packetOrState: "DNS Query: 'hr.congty.local' -> DNS Response: IP = 192.168.30.50"
        },
        {
          step: "Bước 2",
          title: "So khớp Subnet Mask (ANDing) để chọn đường",
          detail: "PC1 lấy IP của mình (192.168.10.15) và IP đích (192.168.30.50) áp vào Subnet Mask 255.255.255.0 (/24). Nó thấy '192.168.10.x' KHÁC VỚI '192.168.30.x'. Kết luận: Đích nằm KHÁC MẠNG! PC1 tra bảng định tuyến (`route print`), khớp với dòng Default Route `0.0.0.0/0` và quyết định phải ném gói tin cho Default Gateway `192.168.10.1`.",
          packetOrState: "NetID Nguồn: 192.168.10.0 != NetID Đích: 192.168.30.0 => Next-hop: 192.168.10.1"
        },
        {
          step: "Bước 3",
          title: "Tìm địa chỉ MAC của Default Gateway (ARP)",
          detail: "Để gửi gói tin đến Gateway 192.168.10.1, PC1 cần biết MAC của Gateway. Nó tra bảng `arp -a`. Nếu chưa có, nó phát bản tin ARP Request (Broadcast FF:FF:FF:FF:FF:FF) hỏi MAC của 192.168.10.1. Router MikroTik trả lời lại MAC của cổng LAN1 (VD: `AA:AA:AA:11:11:11`).",
          packetOrState: "ARP Who has 192.168.10.1? -> 192.168.10.1 is at AA:AA:AA:11:11:11"
        },
        {
          step: "Bước 4",
          title: "Đóng gói và đẩy từ PC1 tới Router (Chặng 1)",
          detail: "Đây là điểm hay bị hỏi bẫy nhất trong phỏng vấn! PC1 đóng gói tin: Địa chỉ IP đích vẫn ghi là Server (`192.168.30.50`), NHƯNG Địa chỉ MAC đích lại ghi là MAC của Gateway (`AA:AA:AA:11:11:11`). Switch nhận frame này và chuyển thẳng tới cổng của Router MikroTik.",
          packetOrState: "Src IP: 192.168.10.15 -> Dst IP: 192.168.30.50 | Src MAC: [MAC-PC1] -> Dst MAC: [MAC-Gateway-LAN1]"
        },
        {
          step: "Bước 5",
          title: "Router bóc vỏ Layer 2, tra bảng Routing và chuyển tiếp (Chặng 2)",
          detail: "Router MikroTik nhận frame, bóc lớp vỏ MAC cũ vứt đi, nhìn vào Dst IP `192.168.30.50`. Nó thấy mạng `192.168.30.0/24` đang nối trực tiếp ở cổng LAN2 (IP Gateway bên đó là 192.168.30.1). Router tìm MAC của Server .30.50, đóng lại lớp vỏ MAC mới và đẩy xuống cho Server.",
          packetOrState: "Src IP: 192.168.10.15 -> Dst IP: 192.168.30.50 | Src MAC: [MAC-Gateway-LAN2] -> Dst MAC: [MAC-Server]"
        }
      ],
      asciiDiagram: `
 [PC1: Phòng Kế Toán]                    [Router MikroTik]                     [Server: Phòng IT]
 IP : 192.168.10.15/24               LAN1: 192.168.10.1/24                 IP : 192.168.30.50/24
 GW : 192.168.10.1                   LAN2: 192.168.30.1/24                 GW : 192.168.30.1
 MAC: 00:11:22:AA:AA:AA              MAC1: AA:AA:AA:11:11:11               MAC: 00:99:88:BB:BB:BB
         |                           MAC2: AA:AA:AA:22:22:22                        |
         |                                     |                                    |
         |--- Chặng 1 (Cùng VLAN 10) --------->|--- Chặng 2 (Sang VLAN 30) -------->|
         | Src IP : 192.168.10.15              | Src IP : 192.168.10.15 (GIỮ NGUYÊN)|
         | Dst IP : 192.168.30.50              | Dst IP : 192.168.30.50 (GIỮ NGUYÊN)|
         | Src MAC: 00:11:22:AA:AA:AA          | Src MAC: AA:AA:AA:22:22:22 (ĐỔI)   |
         | Dst MAC: AA:AA:AA:11:11:11 (MAC GW) | Dst MAC: 00:99:88:BB:BB:BB (ĐỔI)   |`,
      keyTakeaways: [
        "Cùng Subnet (cùng mạng): Máy trạm dùng ARP tìm thẳng MAC của máy đích rồi gửi trực tiếp qua Switch, KHÔNG đi qua Default Gateway.",
        "Khác Subnet (khác mạng): Máy trạm giữ nguyên IP Đích là máy ở xa, nhưng đóng gói MAC Đích là MAC của Default Gateway.",
        "DNS chỉ tham gia ở bước đầu tiên để dịch Tên -> IP. Nếu ping thẳng bằng IP mà mất mạng thì 100% KHÔNG PHẢI lỗi do DNS.",
        "Lệnh `route print` trên Windows cho biết máy tính sẽ chọn cổng nào (Interface) và đẩy cho ai (Gateway) đối với từng dải mạng đích."
      ]
    },
    level3_practice: {
      scenario: "Tại văn phòng, một nhân viên kế toán (PC1) báo 'Máy em không vào được mạng và phần mềm nội bộ!'. Thay vì bấm chuột rút dây mạng hay khởi động lại máy trong vô thức, cậu sẽ dùng các lệnh chuẩn trên Windows CMD kết hợp kiểm tra trên MikroTik để bắt bệnh chính xác trong 60 giây.",
      steps: [
        {
          title: "Bước 1: Kiểm tra toàn diện thông số card mạng bằng ipconfig /all",
          instruction: "Mở Command Prompt (CMD) trên máy nhân viên, gõ `ipconfig /all` (không chỉ gõ `ipconfig` trơn vì sẽ thiếu thông tin DNS và DHCP Server).",
          commandOrConfig: `C:\\Users\\KeToan> ipconfig /all

Ethernet adapter Ethernet:
   Connection-specific DNS Suffix  . : congty.local
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection
   Physical Address. . . . . . . . . : 00-11-22-AA-AA-AA
   DHCP Enabled. . . . . . . . . . . : No
   IPv4 Address. . . . . . . . . . . : 192.168.10.15(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 8.8.8.8`,
          explanation: "Nhìn kỹ kết quả trên! IP của máy là `192.168.10.15` với Mask `255.255.255.0` (tức dải mạng là `192.168.10.0/24`), nhưng ai đó đã đặt IP tĩnh và gõ nhầm Default Gateway thành `192.168.1.1` (khác subnet!). Vì Gateway nằm khác subnet nên PC không biết làm sao để gửi gói tin tới chính cái Gateway đó -> Mất kết nối ra ngoài!"
        },
        {
          title: "Bước 2: Đọc bảng định tuyến trên Windows bằng route print -4",
          instruction: "Sau khi sửa lại Default Gateway đúng thành `192.168.10.1`, gõ `route print -4` để xem cách Windows quyết định đường đi cho gói tin.",
          commandOrConfig: `C:\\Users\\KeToan> route print -4
===========================================================================
IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0     192.168.10.1    192.168.10.15     25
     192.168.10.0    255.255.255.0         On-link     192.168.10.15    281
    192.168.10.15  255.255.255.255         On-link     192.168.10.15    281
   192.168.10.255  255.255.255.255         On-link     192.168.10.15    281`,
          explanation: "Cách đọc cực dễ:\n1) Dòng `192.168.10.0` có Gateway là `On-link`: Nghĩa là mọi IP từ .10.1 đến .10.254 đều nằm ngay trên dây mạng này (cùng LAN), máy sẽ gửi trực tiếp không qua router.\n2) Dòng `0.0.0.0` (Mask `0.0.0.0`): Đây chính là Default Route! Bất kỳ IP nào không khớp các dòng cụ thể bên dưới đều sẽ được đẩy qua Gateway `192.168.10.1` từ card mạng `192.168.10.15`."
        },
        {
          title: "Bước 3: Kiểm tra theo trình tự 4 tầng (Ping tuần tự để cô lập lỗi)",
          instruction: "Thực hiện chuỗi lệnh kiểm tra kinh điển của một Senior SysAdmin để biết đứt ở khâu nào: Cùng LAN -> Gateway -> IP Internet -> Tên miền DNS.",
          commandOrConfig: `# 1. Ping một máy cùng phòng (kiểm tra Layer 2 / Switch / Subnet):
C:\\> ping 192.168.10.20

# 2. Ping Default Gateway và kiểm tra bảng ARP:
C:\\> ping 192.168.10.1
C:\\> arp -a

# 3. Ping IP ngoài Internet (kiểm tra Routing & NAT):
C:\\> ping 8.8.8.8

# 4. Kiểm tra phân giải tên miền DNS:
C:\\> nslookup google.com`,
          explanation: "• Nếu (1) chạy được mà (2) Request timed out -> Xem lại IP Gateway trên Router MikroTik (`/ip address print`) hoặc tường lửa chặn ICMP.\n• Nếu (2)通 mà (3) lỗi -> Máy đã tới được Router nhưng Router thiếu Route hoặc thiếu NAT ra ngoài.\n• Nếu (3) thông mà (4) lỗi -> Mạng Internet thông suốt, chỉ bị lỗi cấu hình DNS Server!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Máy tính vẫn in được qua máy in mạng cùng phòng (192.168.10.200), nhưng không vào được Internet và không sang được Server VLAN 30 (192.168.30.50).",
          hypothesis: "Giao tiếp Layer 2 cùng subnet bình thường, lỗi nằm ở Default Gateway (sai IP, mất cấu hình, hoặc bị trùng IP Gateway).",
          testCommand: "ipconfig /all && ping 192.168.10.1 && arp -a",
          fix: "Kiểm tra thông số Default Gateway trên máy trạm có đúng là 192.168.10.1 không; đối chiếu MAC của 192.168.10.1 trong `arp -a` xem có khớp với MAC cổng LAN của Router MikroTik không (tránh trường hợp có ai cắm nhầm cục Wifi TP-Link phát trùng IP 192.168.10.1)."
        },
        {
          symptom: "Ping 8.8.8.8 trả về Reply <10ms rất mượt, nhưng mở Chrome vào bất kỳ trang web nào cũng báo 'DNS_PROBE_FINISHED_NXDOMAIN' hoặc 'This site can't be reached'.",
          hypothesis: "Đường truyền IP, Gateway, Routing và NAT hoàn toàn tốt; lỗi 100% ở khâu phân giải tên miền (DNS).",
          testCommand: "nslookup google.com && nslookup google.com 8.8.8.8",
          fix: "Nếu `nslookup google.com` báo Timeout nhưng thêm `8.8.8.8` ở cuối lại phân giải được -> DNS Server nội bộ đang cấp cho máy bị treo hoặc trên MikroTik (`/ip dns`) quên tích chọn 'Allow Remote Requests'. Cập nhật lại DNS Server trong DHCP Network hoặc bật Allow Remote Requests kèm Firewall bảo vệ."
        },
        {
          symptom: "Máy tính cắm cả dây LAN công ty (không có Internet, chỉ có mạng nội bộ 10.0.0.0/8) và bắt thêm Wifi 4G để lướt web. Kết quả: Vào được web nhưng mất kết nối tới các phân hệ nội bộ khác subnet (VD: 10.20.30.40).",
          hypothesis: "Xung đột Default Gateway! Cả card LAN và card Wifi đều tạo ra tuyến `0.0.0.0/0` trong bảng định tuyến, Windows ưu tiên đẩy toàn bộ gói tin (kể cả gói nội bộ 10.20.30.40) ra ngoài cục phát Wifi 4G.",
          testCommand: "route print -4 (quan sát 2 dòng 0.0.0.0/0 và cột Metric)",
          fix: "Bỏ trống Default Gateway trên card LAN nội bộ, sau đó thêm Static Route cụ thể cho dải nội bộ đi qua Gateway công ty: `route -p add 10.0.0.0 mask 255.0.0.0 10.10.10.1`. Như vậy mạng 10.x.x.x đi dây LAN, còn lại mọi thứ khác (0.0.0.0/0) đi qua Wifi!"
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Nếu một máy tính cấu hình đúng IP (192.168.10.15) và Subnet Mask (255.255.255.0), nhưng bỏ trống hoàn toàn Default Gateway và DNS Server, máy đó có kết nối được tới File Server (192.168.10.100) bằng đường dẫn \\\\192.168.10.100\\Data không? Tại sao?",
          wrongAnswer: "Không kết nối được ạ, vì thiếu Default Gateway và DNS thì máy tính không có mạng nên không thể truy cập được đâu hết.",
          rightAnswer: "Vẫn kết nối và chép file bình thường 100%! Bởi vì:\n1) Khi máy tính so sánh IP của nó (192.168.10.15/24) với IP đích (192.168.10.100/24), nhờ Subnet Mask nó biết cả hai nằm CÙNG MỘT SUBNET (192.168.10.0/24). Giao tiếp cùng subnet đi trực tiếp ở Layer 2 qua Switch bằng ARP và địa chỉ MAC, hoàn toàn KHÔNG dùng đến Default Gateway.\n2) Người dùng gõ trực tiếp địa chỉ IP `\\\\192.168.10.100` chứ không gõ tên máy `\\\\FILESERVER`, nên cũng KHÔNG cần đến DNS để phân giải tên miền.",
          keyPoints: [
            "So sánh Subnet Mask thấy cùng mạng -> Giao tiếp trực tiếp Layer 2 (On-link)",
            "Không đi qua Default Gateway khi cùng Subnet",
            "Truy cập thẳng bằng địa chỉ IP -> Không cần DNS phân giải"
          ]
        },
        {
          question: "Khi PC1 (192.168.10.15) gửi gói tin sang Server ở VLAN khác (192.168.30.50) thông qua Router (Gateway 192.168.10.1), tại thời điểm gói tin rời khỏi card mạng của PC1, địa chỉ IP đích và địa chỉ MAC đích trong gói tin đó là của thiết bị nào?",
          wrongAnswer: "Cả IP đích và MAC đích đều là của Server 192.168.30.50 (hoặc trả lời ngược lại: cả IP đích và MAC đích đều là của Router 192.168.10.1).",
          rightAnswer: "Tại thời điểm gói tin rời card mạng PC1:\n• Địa chỉ IP Đích (Layer 3) là IP của Server: `192.168.30.50` (đích đến cuối cùng không đổi).\n• Địa chỉ MAC Đích (Layer 2) là MAC của cổng Default Gateway trên Router (`192.168.10.1`).\nLý do là ARP Broadcast không thể đi xuyên qua Router sang subnet khác để hỏi MAC của Server được. PC1 chỉ cần đóng gói MAC đích là Router để Switch chuyển frame tới Router; phần tìm đường tiếp theo là việc của Router.",
          keyPoints: [
            "IP Đích (Layer 3) = IP của thiết bị đích cuối cùng (Server .30.50)",
            "MAC Đích (Layer 2) = MAC của trạm kế tiếp / Default Gateway (Router .10.1)",
            "IP giữ nguyên xuyên suốt, MAC thay đổi theo từng chặng (hop-by-hop)"
          ]
        },
        {
          question: "Hai máy tính nối trực tiếp với nhau qua một chiếc Switch unmanaged (không chia VLAN). Máy A đặt IP 192.168.1.10 Mask 255.255.255.0 (/24). Máy B đặt IP 192.168.1.200 Mask 255.255.255.128 (/25). Hai máy này có ping thông nhau không?",
          wrongAnswer: "Có thông nhau vì cả hai đều cùng dải 192.168.1.x và cắm chung một Switch.",
          rightAnswer: "Không ping thông nhau được! Vì quá trình ping (ICMP Echo Request & Reply) cần thông suốt cả chiều đi lẫn chiều về:\n• Chiều đi (A -> B): Máy A dùng Mask /24 (dải từ .1 đến .254) nên nó coi Máy B (.200) là CÙNG MẠNG. Máy A gửi gói tin trực tiếp qua Switch tới được Máy B.\n• Chiều về (B -> A): Máy B dùng Mask /25 (kích thước khối 128). Vì IP của B là .200 nên nó thuộc nửa sau của dải mạng (từ 192.168.1.128 đến 192.168.1.255). Khi nhìn thấy IP của Máy A là .10 (nằm ở nửa đầu 0..127), Máy B kết luận Máy A KHÁC MẠNG với nó! Thế là thay vì trả lời trực tiếp cho A, Máy B lại tìm cách đẩy gói tin phản hồi cho Default Gateway. Kết quả là gói tin chiều về bị thất lạc, lệnh ping báo Request timed out.",
          keyPoints: [
            "Ping cần cả 2 chiều: Request (A -> B) và Reply (B -> A)",
            "Máy A (/24: .1 -> .254) thấy B (.200) cùng mạng -> gửi tới được B",
            "Máy B (/25: .128 -> .254) thấy A (.10) khác mạng -> đẩy về Gateway thay vì trả trực tiếp cho A"
          ]
        }
      ],
      quizzes: [
        {
          question: "Trong bảng `route print` của Windows, tuyến đường (route) nào đại diện cho Default Gateway?",
          options: [
            "Network Destination: 127.0.0.0 - Netmask: 255.0.0.0",
            "Network Destination: 0.0.0.0 - Netmask: 0.0.0.0",
            "Network Destination: 255.255.255.255 - Netmask: 255.255.255.255",
            "Network Destination: 224.0.0.0 - Netmask: 240.0.0.0"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B (`0.0.0.0` với Netmask `0.0.0.0`). Đây là tuyến đường mặc định (Default Route) khớp với mọi địa chỉ IP đích không có tuyến đường cụ thể hơn trong bảng định tuyến. Còn `127.0.0.0` là Loopback, `255.255.255.255` là Broadcast, và `224.0.0.0` là Multicast."
        },
        {
          question: "Một máy trạm có IP `172.16.10.50/24` không thể truy cập trang web nội bộ `http://portal.company.local`, nhưng khi gõ `http://172.16.20.10` trên trình duyệt thì trang web mở lên ngay lập tức. Nguyên nhân hợp lý nhất là gì?",
          options: [
            "Máy trạm bị cấu hình sai Default Gateway.",
            "Cáp mạng của máy trạm bị đứt hoặc lỏng hạt mạng RJ45.",
            "Máy trạm đang cấu hình sai DNS Server hoặc thiếu bản ghi DNS cho `portal.company.local`.",
            "Firewall giữa VLAN 10 và VLAN 20 đang chặn cổng 80 (HTTP)."
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. Việc truy cập thành công `http://172.16.20.10` (khác subnet) chứng tỏ cáp mạng, IP, Subnet Mask, Default Gateway, Routing và Firewall cổng 80 đều hoạt động hoàn hảo. Chỉ khi dùng tên miền `portal.company.local` mới lỗi, suy ra nguyên nhân nằm ở khâu phân giải tên miền (DNS)."
        },
        {
          question: "Khi một gói tin IP đi từ PC ở VLAN 10, qua Router MikroTik (không bật NAT nội bộ), để đến máy in ở VLAN 20, thông tin nào trong gói tin sẽ THAY ĐỔI sau khi đi qua Router?",
          options: [
            "Địa chỉ IP Nguồn và Địa chỉ IP Đích.",
            "Địa chỉ MAC Nguồn và Địa chỉ MAC Đích (cùng với việc giảm giá trị TTL đi 1).",
            "Chỉ thay đổi cổng TCP/UDP nguồn.",
            "Không có bất kỳ thông tin nào trong khung tin thay đổi."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Khi định tuyến thuần túy (Routing không kèm NAT), header Layer 3 giữ nguyên IP Nguồn và IP Đích (chỉ giảm trường TTL đi 1 để chống lặp vòng), nhưng header Layer 2 (Frame Ethernet) được bóc ra và đóng mới hoàn toàn: MAC Nguồn đổi thành MAC cổng ra của Router, MAC Đích đổi thành MAC của máy in."
        }
      ]
    }
  },

  // ==========================================================================
  // BÀI 02: LAYER 2 / LAYER 3, SWITCH, BRIDGE, VLAN
  // ==========================================================================
  {
    id: 2,
    code: "02",
    week: 1,
    title: "Layer 2 / Layer 3, Switch, Bridge & VLAN",
    subtitle: "Hiểu bản chất Tagged/Untagged, PVID, quản trị Access Point (AP) và Client VLAN trên MikroTik & Switch",
    priority: "P0",
    duration: "90 phút",
    whyThisMatters: "Trong các buổi phỏng vấn vị trí System/Network Admin, đây là phần 'rụng' nhiều nhất của anh em làm thực chiến. Nhiều bạn tạo VLAN trên MikroTik theo thói quen (vào Interfaces tạo VLAN gắn đại vào cổng hoặc Bridge) mà không hiểu bản chất Bridge là gì, khi nào cổng là Access (Untagged + PVID), khi nào là Trunk (Tagged). Đặc biệt, câu hỏi kinh điển: 'Làm sao để cục phát Wifi (AP) nhận IP quản trị ở VLAN 10, nhưng nhân viên bắt Wifi SSID Văn Phòng nhận VLAN 20, khách bắt SSID Guest nhận VLAN 30 chỉ trên 1 sợi dây mạng?' sẽ phân loại ngay lập tức một người thợ bấm dây và một kỹ sư mạng thực thụ.",
    analogy: {
      title: "Tòa nhà Văn phòng, Thang máy chung và Thẻ từ đeo cổ (VLAN Tag)",
      content: "Hãy hình dung một chiếc Switch 24 cổng giống như một sảnh tòa nhà có 24 cánh cửa:\n• Nếu không chia VLAN: Cả 24 cửa thông chung vào một đại sảnh duy nhất. Ai hét lên một tiếng (Broadcast/ARP/Virus quét mạng) là cả 24 phòng đều nghe thấy và bị làm phiền.\n• Chia VLAN (Virtual LAN): Là dựng các bức tường kính vô hình ngăn chiếc Switch vật lý đó thành nhiều khu riêng biệt (VLAN 10: IT, VLAN 20: Nhân sự, VLAN 30: Khách). Ngồi chung 1 Switch nhưng không nhìn thấy nhau ở Layer 2!\n• Cổng Access (Untagged + PVID): Giống như 'Cửa phòng riêng của bộ phận Nhân sự (VLAN 20)'. Máy tính nhân viên đi qua cửa này không cần tự đeo thẻ VLAN. Khi nhân viên bước từ phòng ra hành lang Switch, cửa tự động gắn cho họ cái thẻ 'VLAN 20' (đó là PVID). Khi đi từ hành lang vào lại phòng, cửa tháo thẻ ra trả về bình thường (Untagged) vì máy tính cá nhân thông thường không hiểu thẻ VLAN là gì.\n• Cổng Trunk (Tagged): Giống như 'Cầu nối liên thông giữa 2 tòa nhà' (nối Switch với Router MikroTik hoặc nối với Access Point). Vì có cả người của phòng 10, 20, 30 cùng đi chung trên 1 cây cầu (1 sợi cáp), nên bắt buộc mọi người đi qua cầu này PHẢI ĐEO THẺ MÀU TRÊN NGỰC (802.1Q Tag) để sang đầu bên kia không bị nhầm lẫn!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Layer 2 (Data Link) vs Layer 3 (Network)",
          shortDef: "Layer 2 chuyển tiếp khung tin (Frame) trong CÙNG MỘT MẠNG dựa vào địa chỉ MAC (Switch/Bridge); Layer 3 định tuyến gói tin (Packet) GIỮA CÁC MẠNG KHÁC NHAU dựa vào địa chỉ IP (Router).",
          easyExplain: "Đừng nhớ máy móc tên thiết bị, hãy nhớ theo HÀNH ĐỘNG! Khi dữ liệu chạy giữa các máy trong cùng một VLAN/Subnet, nó chỉ dùng bảng MAC Address Table trên Switch/Bridge -> đó là Layer 2. Khi dữ liệu muốn nhảy từ VLAN 10 sang VLAN 30 hoặc ra Internet, nó phải đi qua một cổng có gắn IP (Gateway) và tra bảng Routing Table -> đó là Layer 3.",
          realExample: "PC1 (192.168.10.5) gửi file cho PC2 (192.168.10.6) chỉ đi qua Switch ở Layer 2. Nếu PC1 gửi sang 192.168.30.10 thì phải leo lên Layer 3 ở Router MikroTik."
        },
        {
          term: "Bridge (trên MikroTik RouterOS)",
          shortDef: "Là một Switch ảo bằng phần mềm (hoặc được tăng tốc phần cứng Hardware Offload) giúp gộp nhiều cổng vật lý/VLAN lại thành một miền Layer 2 chung.",
          easyExplain: "Con Router MikroTik sinh ra vốn dĩ các cổng `ether1`, `ether2`, `ether3`... là các cổng Layer 3 độc lập hoàn toàn. Nếu cậu muốn `ether2`, `ether3`, `ether4` hoạt động giống như các lỗ cắm trên cùng một chiếc Switch, cậu tạo một cái `bridge1` rồi nhét `ether2, 3, 4` vào làm `Bridge Ports`. Từ lúc đó, `bridge1` chính là con Switch ảo nằm bên trong MikroTik!",
          realExample: "Tạo `bridge-lan` gồm `ether2, ether3, ether4, ether5`. Mọi cấu hình IP Gateway hay DHCP Server phải gắn vào `bridge-lan` (hoặc VLAN interface trên `bridge-lan`), TUYỆT ĐỐI không gắn lẻ vào từng cổng `ether2` nữa."
        },
        {
          term: "VLAN (Virtual Local Area Network - Chuẩn 802.1Q)",
          shortDef: "Là công nghệ chia một hạ tầng Switch/Bridge vật lý thành nhiều mạng LAN logic (Broadcast Domain) độc lập hoàn toàn ở Layer 2 bằng cách gắn nhãn VLAN ID (từ 1 đến 4094) vào Ethernet Frame.",
          easyExplain: "Nhiều bạn nhầm: 'Đổi IP khác dải là tách mạng rồi, cần gì chia VLAN?'. Sai lầm chí mạng! Nếu chỉ đổi IP mà vẫn cắm chung một Switch chưa chia VLAN, bất kỳ ai tự đổi IP tĩnh trên máy họ sang dải của phòng Giám đốc là chui vào được ngay, chưa kể gói tin Broadcast/DHCP giả mạo vẫn tràn sang nhau. Chỉ khi chia VLAN ở Layer 2 thì bức tường ngăn cách mới thực sự tồn tại.",
          realExample: "VLAN 10 (Management - 192.168.10.0/24), VLAN 20 (Staff - 192.168.20.0/24), VLAN 30 (Guest Wifi - 192.168.30.0/24)."
        },
        {
          term: "Access Port (Untagged) & PVID (Port VLAN ID)",
          shortDef: "Access Port là cổng kết nối tới thiết bị đầu cuối (PC, máy in, camera) chỉ thuộc về 1 VLAN duy nhất; gói tin đi vào cổng sẽ được gắn nhãn bằng số PVID, và gói tin đi ra khỏi cổng sẽ được gỡ bỏ nhãn (Untagged).",
          easyExplain: "Máy tính Windows hay máy in thông thường KHÔNG hiểu nhãn 802.1Q là gì (nếu nhận được frame có gắn nhãn VLAN là nó vứt đi ngay). Vì vậy:\n• Chiều đi vào Switch (Ingress): PC gửi frame bình thường -> Cổng Switch nhìn vào thông số **PVID** (VD: PVID = 20) để đóng dấu 'Gói này thuộc VLAN 20' khi chạy bên trong Switch.\n• Chiều đi ra khỏi Switch về PC (Egress): Switch tháo con dấu VLAN 20 ra (**Untagged**) rồi mới đưa cho PC.",
          realExample: "Cổng `ether3` cắm máy tính Kế toán: đặt `PVID = 20` và đưa vào danh sách `Untagged` của VLAN 20."
        },
        {
          term: "Trunk Port (Tagged) & Hybrid Port",
          shortDef: "Trunk Port là cổng dùng để vận chuyển đồng thời nhiều VLAN qua một sợi cáp duy nhất bằng cách giữ nguyên nhãn 802.1Q (Tagged) trên từng khung tin.",
          easyExplain: "Khi nối giữa Router MikroTik và Switch Managed, hoặc giữa Switch với Access Point phát nhiều SSID (UniFi, Aruba, Grandstream, Ruijie...), một sợi cáp phải chở cả VLAN 10, 20, 30. Để đầu bên kia phân biệt được gói nào của phòng nào, cổng phát sẽ giữ nguyên tem nhãn VLAN (**Tagged**). Còn **Hybrid Port** (rất phổ biến khi cắm AP) là cổng vừa có 1 VLAN không gắn nhãn (**Untagged / Native VLAN** dùng để quản trị bản thân cục AP) vừa có nhiều VLAN gắn nhãn (**Tagged** cho các SSID của người dùng).",
          realExample: "Cổng cắm bộ phát Wifi UniFi: Untagged VLAN 10 (PVID=10 để cục UniFi nhận IP quản trị 192.168.10.x), đồng thời Tagged VLAN 20 (SSID Staff) và Tagged VLAN 30 (SSID Guest)."
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt: Subnet vs VLAN và Access Port vs Trunk Port",
        headers: ["Tiêu chí", "VLAN (Layer 2)", "Subnet (Layer 3)", "Access Port (Untagged)", "Trunk Port (Tagged)"],
        rows: [
          [
            "Bản chất hoạt động",
            "Ngăn cách miền quảng bá (Broadcast Domain) bằng nhãn 802.1Q (VLAN ID).",
            "Quy hoạch không gian địa chỉ IP bằng Subnet Mask (Network ID).",
            "Cổng dành cho 1 VLAN duy nhất, giao tiếp bằng frame không nhãn.",
            "Cổng chở nhiều VLAN cùng lúc, frame có gắn nhãn 4-byte 802.1Q."
          ],
          [
            "Thiết bị xử lý chính",
            "Switch Managed, Bridge trên MikroTik, Access Point.",
            "Router, Layer 3 Switch, Firewall, OS Network Stack.",
            "Cắm xuống PC, Laptop, Máy in, Camera IP, Điện thoại bàn.",
            "Cắm giữa Router <-> Switch, Switch <-> Switch, Switch <-> AP."
          ],
          [
            "Quy tắc ánh xạ thực tế",
            "Mỗi VLAN là 1 'căn phòng' vật lý ảo.",
            "Mỗi Subnet là 1 'quy định đánh số nhà' trong phòng đó.",
            "Cấu hình PVID = X và Untagged ở VLAN X.",
            "Cấu hình Tagged cho danh sách các VLAN X, Y, Z cần đi qua."
          ],
          [
            "Lưu ý phỏng vấn",
            "2 máy khác VLAN không thể ARP thấy nhau dù đặt cùng dải IP!",
            "Quy tắc vàng thiết kế mạng: **1 VLAN = 1 Subnet (tỷ lệ 1:1)**.",
            "Thiết bị đầu cuối không cần biết sự tồn tại của VLAN ID.",
            "Hai đầu sợi dây cáp Trunk phải khớp cấu hình Tagged/Native VLAN."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Bí quyết làm chủ VLAN trên mọi hãng (MikroTik, Cisco, HP, Ruijie) chỉ gói gọn trong 2 chiều của một cái cổng: <b>Chiều ĐI VÀO cổng (Ingress) nhìn vào PVID</b> để dán tem cho gói tin chưa có tem; <b>Chiều ĐI RA cổng (Egress) nhìn vào bảng VLAN (Tagged hay Untagged)</b> để quyết định giữ nguyên tem hay bóc tem trước khi đẩy ra dây cáp. Đặc biệt, trên MikroTik muốn Router định tuyến được cho một VLAN (Inter-VLAN Routing), bản thân giao diện <code>bridge</code> BẮT BUỘC phải được đưa vào danh sách <b>Tagged</b> của VLAN đó!",
      flowTitle: "Hành trình của Frame 802.1Q: Từ Laptop bắt Wifi (SSID Guest - VLAN 30) về tới Router MikroTik",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Khách kết nối vào SSID 'CongTy_Guest' trên Access Point",
          detail: "Trên sóng vô tuyến (Wi-Fi), khung tin từ điện thoại/laptop của khách gửi lên cục AP hoàn toàn KHÔNG có nhãn VLAN. Nhưng vì trong cấu hình AP, cậu đã gán SSID 'CongTy_Guest' với `VLAN ID = 30`, nên ngay khi nhận gói tin từ SSID này, cục AP lập tức đóng dấu nhãn `802.1Q Tag = 30` vào frame trước khi đẩy ra cổng dây mạng LAN của AP.",
          packetOrState: "Wi-Fi Frame (Untagged) -> Qua AP -> Ethernet Frame [Tag: VLAN 30]"
        },
        {
          step: "Bước 2",
          title: "Đi qua cổng Hybrid/Trunk trên Switch (Cổng số 5 cắm AP)",
          detail: "Cổng số 5 trên Switch nối với AP được cấu hình: `PVID = 10 (Untagged VLAN 10)` cho bản thân cục AP, và `Tagged VLAN 20, 30` cho các SSID. Khi frame của khách đi vào cổng 5, Switch thấy frame ĐÃ CÓ SẴN nhãn `VLAN 30` và cổng 5 cho phép Tagged VLAN 30, nên Switch giữ nguyên nhãn 30 đưa vào bên trong Switch. (Trong khi đó, nếu chính cục AP gửi gói tin quản trị không nhãn đi ra, cổng 5 sẽ dùng PVID=10 để đưa gói của AP vào VLAN 10!).",
          packetOrState: "Ingress Port 5: Frame đã có Tag 30 -> Giữ nguyên trong miền VLAN 30 của Switch"
        },
        {
          step: "Bước 3",
          title: "Đi qua đường Uplink Trunk từ Switch lên Router MikroTik (ether2)",
          detail: "Để đi ra Internet hoặc xin cấp IP DHCP từ Router MikroTik, Switch đẩy frame ra cổng Uplink (Cổng số 1 nối với `ether2` của MikroTik). Cả 2 đầu dây cáp này đều cấu hình `Tagged VLAN 10, 20, 30`. Vì vậy frame đi trên sợi dây nối lên MikroTik vẫn mang nguyên thẻ bài `VLAN 30`.",
          packetOrState: "Uplink Trunk (Switch Port 1 -> MikroTik ether2): Ethernet Frame [Tag: VLAN 30]"
        },
        {
          step: "Bước 4",
          title: "Đi từ Bridge Layer 2 lên VLAN Interface Layer 3 trong MikroTik",
          detail: "Đây là bước 90% người mới cấu hình `Bridge VLAN Filtering` trên MikroTik bị quên! Khi frame `VLAN 30` chui qua cổng `ether2` vào trong `bridge-lan`, nó muốn leo lên giao diện Layer 3 (`vlan30-guest`, nơi đặt IP Gateway 192.168.30.1 và DHCP Server). Để frame từ `bridge-lan` leo lên được CPU/Layer 3 của MikroTik, chính cái tên **`bridge-lan` phải có mặt trong mục Tagged của VLAN 30**!",
          packetOrState: "ether2 (Tagged 30) -> bridge-lan (Tagged 30) -> Giao diện Layer 3 'vlan30-guest' (bóc Tag 30, xử lý IP 192.168.30.x)"
        }
      ],
      asciiDiagram: `
 [Router MikroTik (Bridge VLAN Filtering = YES)]
  +-------------------------------------------------------------------+
  | Layer 3: vlan10-mgmt (192.168.10.1) | vlan20 (20.1) | vlan30 (30.1)|
  |                      ^                      ^              ^       |
  |                      +--- [CPU / Bridge-lan (TAGGED 10,20,30)]     |
  |                                   |                   |            |
  |                         ether2 (Trunk xuống SW)   ether3 (Access)  |
  |                         Tagged: 10, 20, 30        Untagged: 20     |
  +-----------------------------------|-------------------|------------+
                                      | (Dây Trunk)       | (Dây Access PVID=20)
                                      v                   v
                             [Switch Managed]         [PC Nhân Viên]
                              Port 1: Tagged 10,20,30  (Nhận IP 192.168.20.x
                              Port 5 (Cắm AP):          không cần biết VLAN)
                               - Untagged (PVID): 10 ---> Cục AP nhận IP 192.168.10.x
                               - Tagged: 20 ------------> SSID "Staff" nhận 192.168.20.x
                               - Tagged: 30 ------------> SSID "Guest" nhận 192.168.30.x`,
      keyTakeaways: [
        "Quy tắc vàng 1-1: Luôn thiết kế 1 VLAN tương ứng với 1 Subnet IP riêng biệt (VD: VLAN 10 = 192.168.10.0/24, VLAN 20 = 192.168.20.0/24).",
        "Cổng cắm PC/Máy in/Camera = Access Port (Untagged + đặt PVID bằng đúng VLAN ID đó).",
        "Cổng nối Router <-> Switch hoặc Switch <-> Switch = Trunk Port (Tagged các VLAN cần đi qua).",
        "Cổng cắm Access Point (UniFi/Ruijie/Aruba...) thường là Hybrid: Untagged (PVID) cho VLAN Quản trị thiết bị AP, và Tagged cho các VLAN của SSID người dùng.",
        "Trên MikroTik Bridge VLAN Filtering: Hễ VLAN nào cần Router làm Gateway/DHCP (có tạo `/interface vlan`), thì trong `/interface bridge vlan` BẮT BUỘC phải thêm chính tên `bridge` vào mục `tagged`!"
      ]
    },
    level3_practice: {
      scenario: "Cậu được giao cấu hình một con Router MikroTik cho văn phòng gồm: VLAN 10 (Quản trị thiết bị AP: 192.168.10.0/24), VLAN 20 (Nhân viên: 192.168.20.0/24) và VLAN 30 (Khách: 192.168.30.0/24). Trong đó: `ether2` là cổng Trunk nối xuống Switch/AP (chở cả 3 VLAN, riêng bản thân AP nhận Untagged VLAN 10), và `ether3` là cổng Access cắm thẳng máy tính nhân viên (VLAN 20).",
      steps: [
        {
          title: "Bước 1: Tạo Bridge và cấu hình PVID cho các cổng (Bridge Ports)",
          instruction: "Tạo một Bridge duy nhất (`bridge-lan`). Khi thêm `ether2` và `ether3` vào Bridge, ta khai báo luôn PVID (VLAN mặc định cho các gói tin không nhãn đi vào cổng đó). Lưu ý: Chưa bật `vlan-filtering=yes` ở bước này để tránh tự khóa mình khỏi WinBox!",
          commandOrConfig: `/interface bridge
add name=bridge-lan vlan-filtering=no

/interface bridge port
# ether2 cắm AP: gói không nhãn từ bản thân cục AP đi vào sẽ thuộc VLAN 10
add bridge=bridge-lan interface=ether2 pvid=10
# ether3 cắm PC nhân viên: gói từ PC đi vào sẽ thuộc VLAN 20
add bridge=bridge-lan interface=ether3 pvid=20`,
          explanation: "Thông số `pvid=10` trên `ether2` giúp bản thân cục phát Wifi (vốn gửi gói tin quản trị không gắn nhãn) được đưa vào VLAN 10. Còn `pvid=20` trên `ether3` đưa máy tính nhân viên vào VLAN 20."
        },
        {
          title: "Bước 2: Khai báo bảng Bridge VLANs (Tagged & Untagged)",
          instruction: "Vào mục `Bridge -> VLANs` để chỉ định cổng nào giữ nhãn (Tagged) và cổng nào bóc nhãn (Untagged) cho từng VLAN. Đừng quên đưa chính `bridge-lan` vào `tagged` để gói tin leo lên được Layer 3 của MikroTik!",
          commandOrConfig: `/interface bridge vlan
# VLAN 10: Lên CPU (bridge-lan) là Tagged, đi ra ether2 cho cục AP là Untagged
add bridge=bridge-lan vlan-ids=10 tagged=bridge-lan untagged=ether2

# VLAN 20: Lên CPU và ra ether2 (SSID Staff) là Tagged, ra ether3 (PC) là Untagged
add bridge=bridge-lan vlan-ids=20 tagged=bridge-lan,ether2 untagged=ether3

# VLAN 30: Lên CPU và ra ether2 (SSID Guest) đều là Tagged
add bridge=bridge-lan vlan-ids=30 tagged=bridge-lan,ether2`,
          explanation: "Hãy nhìn dòng VLAN 20: Cùng một VLAN 20 nhưng đi ra `ether2` (xuống AP phát SSID Staff) thì giữ nhãn (`tagged=ether2`), còn đi ra `ether3` (cắm thẳng PC) thì bóc nhãn (`untagged=ether3`). Cực kỳ rõ ràng và chuẩn nguyên lý!"
        },
        {
          title: "Bước 3: Tạo giao diện Layer 3 (VLAN Interfaces), gán IP Gateway và bật VLAN Filtering",
          instruction: "Tạo 3 giao diện VLAN gắn trên `bridge-lan`, đặt IP Gateway cho từng VLAN, sau đó mới chính thức bật `vlan-filtering=yes` trên `bridge-lan`.",
          commandOrConfig: `/interface vlan
add interface=bridge-lan name=vlan10-mgmt vlan-id=10
add interface=bridge-lan name=vlan20-staff vlan-id=20
add interface=bridge-lan name=vlan30-guest vlan-id=30

/ip address
add address=192.168.10.1/24 interface=vlan10-mgmt
add address=192.168.20.1/24 interface=vlan20-staff
add address=192.168.30.1/24 interface=vlan30-guest

# BƯỚC CUỐI CÙNG: Bật chế độ Safe Mode (Ctrl+X) trên WinBox rồi kích hoạt VLAN Filtering
/interface bridge set bridge-lan vlan-filtering=yes`,
          explanation: "Khi `vlan-filtering=yes` được bật, `bridge-lan` hoạt động như một chiếc Switch Managed chuẩn 802.1Q thực thụ. Các giao diện `vlan10-mgmt`, `vlan20-staff`, `vlan30-guest` đóng vai trò là các cổng Layer 3 (SVI / Sub-interface) làm Default Gateway cho từng VLAN."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Sau khi bật `vlan-filtering=yes` trên MikroTik, các máy tính ở dưới Switch vẫn nhìn thấy nhau cùng VLAN nhưng mất hoàn toàn kết nối tới Gateway (không xin được DHCP, không ping được 192.168.20.1).",
          hypothesis: "Quên thêm chính giao diện `bridge-lan` vào danh sách `tagged` của VLAN 20 trong bảng `/interface bridge vlan`.",
          testCommand: "/interface bridge vlan print detail",
          fix: "Chỉnh lại rule VLAN trong `/interface bridge vlan`: thêm `bridge-lan` vào trường `tagged` (VD: `tagged=bridge-lan,ether2`). Nếu không có `bridge-lan` ở mục tagged, gói tin VLAN chỉ chạy vòng quanh các cổng Switch ở Layer 2 mà không được đẩy lên CPU Layer 3 của Router."
        },
        {
          symptom: "Cục phát Wifi UniFi cắm vào cổng Switch đã nhận đúng IP quản trị `192.168.10.50` (Online trên Controller), nhưng điện thoại bắt vào SSID 'CongTy_Guest' (đã gắn VLAN 30 trên Controller) lại chỉ xoay vòng 'Obtaining IP address...' rồi báo lỗi không lấy được IP.",
          hypothesis: "Cổng Switch cắm cục AP (hoặc cổng Uplink từ Switch về Router) đã cấu hình đúng Untagged VLAN 10 nhưng QUÊN khai báo `Tagged VLAN 30`.",
          testCommand: "Kiểm tra cấu hình Port VLAN trên Switch tại cổng cắm AP và cổng Uplink (hoặc `/interface bridge vlan print` trên MikroTik).",
          fix: "Bổ sung `VLAN 30` vào danh sách **Tagged** trên cả cổng Switch cắm AP lẫn cổng Trunk Uplink nối về Router MikroTik."
        },
        {
          symptom: "Cắm máy tính trực tiếp vào cổng số 10 của Switch (đã đưa cổng 10 vào Untagged VLAN 20), nhưng khi máy tính xin DHCP hoặc gửi gói tin đi thì vẫn bị rơi vào VLAN 1 mặc định.",
          hypothesis: "Trên một số dòng Switch (như TP-Link JetStream, D-Link, Cisco SMB hoặc MikroTik Bridge), việc thêm cổng vào danh sách Untagged của VLAN 20 KHÔNG tự động đổi thông số PVID của cổng đó từ 1 sang 20.",
          testCommand: "Kiểm tra mục Port Config / PVID Settings trên Switch xem PVID của cổng 10 đang là 1 hay 20.",
          fix: "Đổi `PVID = 20` cho cổng số 10. Nhớ nguyên lý: `Untagged` chỉ quyết định chiều đi ra (Egress), còn chiều đi vào từ PC (Ingress) bắt buộc phải dựa vào `PVID`!"
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Ở văn phòng hiện tại chỉ có 1 Switch thường (Unmanaged Switch). Để tách mạng phòng Kế toán và phòng Kinh doanh cho bảo mật, anh chỉ cần đặt IP phòng Kế toán là 192.168.10.0/24 và phòng Kinh doanh là 192.168.20.0/24 trên cùng Switch đó là đủ đúng không? Tại sao vẫn phải tốn tiền mua Switch Managed chia VLAN?",
          wrongAnswer: "Đặt khác dải IP là hai phòng không ping thấy nhau được rồi nên thế là đủ bảo mật, chỉ khi nào nhiều máy quá mới cần mua Switch chia VLAN.",
          rightAnswer: "Đặt 2 dải IP khác nhau trên cùng một Unmanaged Switch (cùng một miền Layer 2) hoàn toàn KHÔNG đảm bảo cách ly bảo mật và quản trị mạng vì 3 lý do cốt lõi:\n1) Về bảo mật: Bất kỳ nhân viên nào ở phòng Kinh doanh chỉ cần mở cài đặt card mạng, tự gõ thêm 1 IP tĩnh thuộc dải `192.168.10.x` là truy cập thẳng vào máy tính/máy in của phòng Kế toán ngay lập tức vì không có rào cản Layer 2.\n2) Về cấp phát DHCP: Cả 2 phòng chung một Broadcast Domain, nên bản tin `DHCP Discover` (Broadcast) sẽ bay lung tung; một Router không thể biết máy nào thuộc phòng nào để cấp đúng dải IP `.10.x` hay `.20.x` trên cùng một cổng vật lý.\n3) Về hiệu năng và an toàn: Nếu một máy bị nhiễm mã độc phát tán ARP Spoofing hoặc Broadcast Storm, toàn bộ các phòng ban khác trên Switch đó sẽ sập mạng theo. Vì vậy bắt buộc phải chia VLAN ở Layer 2 theo quy tắc 1 VLAN = 1 Subnet.",
          keyPoints: [
            "Khác Subnet nhưng chung Layer 2 thì người dùng tự đổi IP tĩnh là vượt rào được ngay",
            "Chung Broadcast Domain nên không thể tách DHCP Server tự động cho từng phòng ban",
            "Không cô lập được Broadcast Storm / ARP Spoofing ở tầng 2"
          ]
        },
        {
          question: "Hãy giải thích cách cấu hình một cổng Switch cắm vào bộ phát Wifi (Access Point) sao cho: bản thân thiết bị AP nhận IP quản trị thuộc VLAN 10, nhân viên bắt SSID 'Staff' nhận IP thuộc VLAN 20, và khách bắt SSID 'Guest' nhận IP thuộc VLAN 30.",
          wrongAnswer: "Em cấu hình cổng Switch đó là cổng Access thuộc VLAN 10 để AP nhận IP, hoặc chia 3 dây mạng cắm vào AP cho 3 VLAN.",
          rightAnswer: "Cổng Switch nối với Access Point phải được cấu hình ở chế độ Trunk (có Native VLAN) hoặc Hybrid Port trên 1 sợi cáp duy nhất như sau:\n• Với VLAN 10 (Quản trị AP): Cấu hình cổng đó là **Untagged VLAN 10** và đặt **PVID = 10** (hay gọi là Native VLAN 10). Lý do là bản thân hệ điều hành của cục AP mặc định gửi các gói tin quản trị/xin DHCP mà không gắn nhãn VLAN, nên khi đi vào cổng có PVID=10 nó sẽ rơi đúng vào VLAN 10.\n• Với VLAN 20 và VLAN 30 (Người dùng Wifi): Cấu hình cổng đó là **Tagged cho cả VLAN 20 và VLAN 30**. Đồng thời trên giao diện quản trị của AP (Controller), ta gán SSID 'Staff' với `VLAN ID = 20` và SSID 'Guest' với `VLAN ID = 30`. Khi đó, AP sẽ tự đóng nhãn 802.1Q tương ứng cho từng SSID trước khi đẩy qua cổng Switch.",
          keyPoints: [
            "Cổng Switch cấu hình Hybrid / Trunk với Native VLAN",
            "VLAN 10 (Management AP): Untagged + PVID = 10 (Native VLAN)",
            "VLAN 20 (SSID Staff) & VLAN 30 (SSID Guest): Tagged trên cả cổng Switch và cấu hình SSID của AP"
          ]
        },
        {
          question: "Khi cấu hình Bridge VLAN Filtering trên Router MikroTik, tại sao trong bảng `/interface bridge vlan` ta lại phải thêm chính cái tên `bridge` vào mục `tagged` của các VLAN?",
          wrongAnswer: "Em thấy trên mạng hướng dẫn tích vào hết các ô hoặc thêm vào cho chắc chứ không rõ tại sao.",
          rightAnswer: "Trong kiến trúc của MikroTik RouterOS, một `Bridge` thực chất gồm 2 phần: phần Switch ảo ở Layer 2 (nối các cổng `ether2, ether3...`) và một cổng ẩn nối lên **CPU của Router ở Layer 3** mang tên chính là cái `bridge` đó.\nNếu ta chỉ khai báo `tagged=ether2` mà không có `bridge` trong mục `tagged`, khung tin VLAN sẽ chỉ chạy qua lại giữa các cổng vật lý ở Layer 2 mà bị chặn lại không được đi qua cổng ẩn để leo lên giao diện `/interface vlan` trên CPU. Do đó, bất cứ VLAN nào cần Router MikroTik làm Default Gateway, cấp DHCP hoặc định tuyến Layer 3 thì bắt buộc phải có mặt `bridge` trong danh sách `tagged`.",
          keyPoints: [
            "Giao diện `bridge` đại diện cho đường nối nội bộ từ Switch ảo (Layer 2) lên CPU của Router (Layer 3)",
            "Cần `tagged=bridge` để gói tin đi tới được các `/interface vlan` gắn trên bridge đó",
            "Nếu thiếu `tagged=bridge`, các máy dưới Switch không thể ping Gateway hay xin DHCP từ MikroTik"
          ]
        }
      ],
      quizzes: [
        {
          question: "Khi một khung tin Ethernet thông thường (không có nhãn VLAN) từ máy tính bàn đi VÀO một cổng Access trên Switch đang có `PVID = 20`, chuyện gì sẽ xảy ra?",
          options: [
            "Switch từ chối và hủy khung tin vì máy tính không tự gắn nhãn VLAN 20.",
            "Switch nhận khung tin và gắn nhãn VLAN 20 cho khung tin đó khi xử lý bên trong Switch.",
            "Switch tự động chuyển khung tin đó sang VLAN 1 mặc định bất kể PVID là bao nhiêu.",
            "Switch yêu cầu máy tính phải cài thêm phần mềm đọc nhãn 802.1Q."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Thông số PVID (Port VLAN ID) quy định rằng: khi một khung tin chưa có nhãn (Untagged) đi từ thiết bị đầu cuối VÀO cổng Switch (Ingress), Switch sẽ tự động phân loại và gắn nhãn cho khung tin đó theo số PVID của cổng (ở đây là VLAN 20)."
        },
        {
          question: "Hai chiếc Switch Managed được nối với nhau bằng 1 sợi cáp mạng tại cổng số 24 của mỗi Switch. Để các máy tính thuộc cả VLAN 10, VLAN 20 và VLAN 30 ở hai Switch đều giao tiếp được với nhau qua sợi cáp này, cổng 24 ở cả hai Switch phải cấu hình như thế nào?",
          options: [
            "Cấu hình cổng 24 là Access Port với PVID = 1.",
            "Bấm 3 sợi cáp mạng riêng cho 3 VLAN vì 1 sợi cáp không thể truyền nhiều VLAN.",
            "Cấu hình cổng 24 ở cả hai Switch là Trunk Port, cho phép Tagged cả 3 VLAN 10, 20 và 30.",
            "Cấu hình cổng 24 là Untagged đồng thời cho cả 3 VLAN 10, 20, 30."
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. Đường nối giữa 2 Switch cần chở nhiều VLAN đồng thời nên phải cấu hình là Trunk Port (Tagged VLAN 10, 20, 30) để giữ nguyên nhãn 802.1Q khi đi qua cáp, giúp Switch bên kia phân biệt được gói tin thuộc VLAN nào. (Một cổng không thể Untagged cho nhiều VLAN chuẩn cùng lúc vì đầu nhận sẽ không biết gói tin không nhãn đó thuộc VLAN nào)."
        },
        {
          question: "Trên MikroTik RouterOS, khi đã gộp `ether2`, `ether3`, `ether4` vào trong `bridge-lan` (không chia VLAN), địa chỉ IP Default Gateway của mạng LAN (`192.168.1.1/24`) và DHCP Server phải được gắn vào đâu là ĐÚNG chuẩn?",
          options: [
            "Gắn vào cổng `ether2` vì `ether2` là cổng đầu tiên trong nhóm.",
            "Gắn lần lượt vào cả 3 cổng `ether2`, `ether3` và `ether4`.",
            "Gắn vào giao diện `bridge-lan`.",
            "Gắn vào cổng WAN `ether1`."
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. Khi các cổng vật lý (`ether2, 3, 4`) đã được đưa vào làm port con (slave) của `bridge-lan`, giao diện đại diện cho toàn bộ miền Layer 2 đó là `bridge-lan`. Mọi cấu hình Layer 3 như IP Address, DHCP Server, Hotspot... bắt buộc phải gắn trên `bridge-lan`."
        }
      ]
    }
  },

  // ==========================================================================
  // BÀI 03: ROUTING, NAT, FIREWALL
  // ==========================================================================
  {
    id: 3,
    code: "03",
    week: 1,
    title: "Routing, NAT & Firewall trên MikroTik",
    subtitle: "Giải quyết triệt để: Khi nào cần Routing, khi nào cần NAT? Phân biệt srcnat/dstnat và 3 chain input/forward/output",
    priority: "P0",
    duration: "90 phút",
    whyThisMatters: "Đây chính là 'tử huyệt' lớn nhất khiến nhiều anh em làm mạng lâu năm trượt phỏng vấn Senior! Khi được hỏi: 'Tại sao máy tính ở VLAN 30 muốn ping sang Server ở VLAN 10 lại cần Routing nhưng KHÔNG CẦN NAT? Còn khi đi ra Internet lại bắt buộc phải có NAT?', rất nhiều người ấp úng hoặc có thói quen cứ thấy không ping được là vào MikroTik tích bừa một cái rule `masquerade` cho thông mạng! Bài 03 này sẽ mổ xẻ tận gốc bản chất của Định tuyến (Routing), Dịch địa chỉ (NAT) và Tường lửa (Firewall Chains) để cậu làm chủ hoàn toàn luồng gói tin.",
    analogy: {
      title: "Chuyện đi lại giữa các Phòng ban trong Công ty vs Đi giao dịch với Thế giới bên ngoài",
      content: "Hãy tưởng tượng Công ty của cậu là một tòa nhà lớn có tổng đài nội bộ (Router MikroTik):\n• ROUTING (Định tuyến - Chỉ đường): Nhân viên phòng Guest/Kho (VLAN 30 - số nội bộ 305) muốn gửi hồ sơ cho Server phòng IT (VLAN 10 - số nội bộ 102). Tổng đài (Router) biết rõ cả phòng 30 lẫn phòng 10 nằm ở tầng nào trong công ty! Vì vậy, anh nhân viên 305 cứ ghi nguyên tên thật của mình là 'Người gửi: 305 -> Người nhận: 102'. Khi Server 102 nhận được, nó nhìn thấy chữ 'Người gửi: 305' thì biết ngay đường để gửi phản hồi về lại phòng 30. Đó là **Routing thuần túy — KHÔNG HỀ CẦN NAT**!\n• SRC-NAT / Masquerade (Đổi tên người gửi khi ra Internet): Bây giờ anh nhân viên số nội bộ 305 muốn gửi thư ra ngoài xã hội cho Google (IP Public 8.8.8.8). Khổ nỗi, số nội bộ '305' (IP Private 192.168.30.5) chỉ có giá trị trong phạm vi công ty, bưu điện thế giới (Internet) không hề biết cái số 192.168.30.5 nằm ở đâu để hồi âm! Vì thế, trước khi bức thư rời khỏi cổng công ty (cổng WAN), bác bảo vệ ở cổng (Router) phải xóa dòng 'Người gửi: 192.168.30.5' và đóng dấu đè lên thành **'Người gửi: Địa chỉ trụ sở chính Công ty (IP Public WAN)'** đồng thời ghi sổ theo dõi. Khi Google trả lời về địa chỉ Công ty, bác bảo vệ tra sổ rồi đưa lại cho số 305. Đó là bản chất của **Source NAT**!\n• DST-NAT / Port Forwarding (Đổi tên người nhận từ ngoài vào): Khách hàng ngoài Internet chỉ biết địa chỉ trụ sở chính Công ty (IP Public WAN), muốn xem Camera hoặc Web Server đặt bên trong phòng IT (192.168.10.50). Khách cứ gửi tới địa chỉ Công ty kèm số cửa (Port 8080), bác bảo vệ nhận được sẽ sửa 'Người nhận' thành `192.168.10.50` rồi đẩy vào trong. Đó là **Destination NAT**!\n• FIREWALL (An ninh kiểm soát): Dù tổng đài đã biết đường đi (Routing thông), nhưng Giám đốc ra lệnh: 'Cấm phòng Guest (VLAN 30) bước vào phòng Server (VLAN 10)!'. Anh an ninh đứng chặn lại -> Đó là **Firewall Filter**."
    },
    level1_definitions: {
      concepts: [
        {
          term: "Routing (Định tuyến) & Connected Route",
          shortDef: "Routing là quá trình Router tra cứu bảng định tuyến (Routing Table) dựa vào địa chỉ IP Đích để chuyển tiếp gói tin từ mạng này sang mạng khác mà KHÔNG làm thay đổi địa chỉ IP Nguồn hay IP Đích.",
          easyExplain: "Mỗi khi cậu gắn một địa chỉ IP lên một cổng của Router MikroTik (VD: gắn `192.168.10.1/24` vào `vlan10` và `192.168.30.1/24` vào `vlan30`), Router sẽ tự động sinh ra các tuyến đường nối trực tiếp gọi là **DAC (Dynamic Active Connected)** trong `/ip route`. Nhờ vậy, bản thân con Router ĐÃ TỰ ĐỘNG ĐỊNH TUYẾN giữa VLAN 10 và VLAN 30 ngay lập tức mà cậu không cần gõ thêm bất kỳ câu lệnh route hay NAT nào cả! Còn nếu mạng đích nằm ở một con Router khác (VD: chi nhánh Đà Nẵng), cậu mới cần khai báo **Static Route** chỉ định `Gateway (Next-hop)` là IP của con Router bên kia.",
          realExample: "Trong `/ip route print`: tuyến `0.0.0.0/0 gateway=IP_Nha_Mang` là Default Route đi Internet; các tuyến có cờ `DAC` là các mạng LAN/VLAN gắn trực tiếp trên Router."
        },
        {
          term: "NAT (Network Address Translation)",
          shortDef: "Là kỹ thuật sửa đổi thông tin địa chỉ IP (và Port) Nguồn hoặc Đích trong phần Header của gói tin khi gói tin đi qua Router.",
          easyExplain: "Hãy nhớ: NAT là hành động 'GIẢ DANH / ĐỔI TÊN'. Ta chỉ cần dùng NAT khi:\n1) Thiết bị dùng IP Private (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) muốn đi ra Internet (vì Router ngoài Internet không định tuyến cho IP Private).\n2) Hoặc khi thiết bị ở đầu bên kia KHÔNG có đường định tuyến (Route) quay về mạng nguồn của ta.\nCòn trong mạng nội bộ của công ty, nơi Router biết rõ mọi VLAN, hãy để nguyên IP thật (Routing thuần) để Server còn biết chính xác IP máy nào đang truy cập, log lại ai làm gì và áp dụng Firewall chính xác!",
          realExample: "Nếu bật nhầm Masquerade giữa VLAN 30 sang VLAN 10, Server ở VLAN 10 sẽ thấy mọi kết nối từ VLAN 30 đều mang IP nguồn là `192.168.10.1` (IP của Router), làm mất hoàn toàn dấu vết IP thật của kẻ tấn công!"
        },
        {
          term: "SRCNAT & Masquerade (Source NAT)",
          shortDef: "Là cơ chế thay đổi Địa chỉ IP Nguồn (Source IP) của gói tin trước khi gói tin đi ra khỏi một cổng (thường là cổng WAN ra Internet).",
          easyExplain: "• `action=src-nat`: Dùng khi đường truyền WAN của công ty có **IP Public tĩnh** (VD: `113.160.x.x`). Ta chỉ định rõ đổi Src IP thành IP tĩnh đó.\n• `action=masquerade`: Là trường hợp đặc biệt của `src-nat` dành cho đường truyền WAN có **IP động** (như PPPoE Viettel/VNPT/FPT mỗi lần quay số lại đổi IP khác). Router sẽ tự động lấy IP hiện hành trên cổng `out-interface` (VD: `pppoe-out1`) để thay vào làm IP Nguồn.",
          realExample: "`/ip firewall nat add chain=srcnat out-interface=pppoe-out1 action=masquerade` -> Đổi mọi IP LAN khi đi ra cổng `pppoe-out1` thành IP Public của nhà mạng."
        },
        {
          term: "DSTNAT (Destination NAT / Port Forwarding)",
          shortDef: "Là cơ chế thay đổi Địa chỉ IP Đích (và Port Đích) của gói tin ngay khi gói tin đi từ bên ngoài vào cổng Router, giúp chuyển hướng truy cập từ IP Public vào một máy chủ nội bộ.",
          easyExplain: "Ngược lại với SRCNAT (xảy ra lúc gói tin sắp đi ra ngoài), DSTNAT xảy ra ngay lúc gói tin vừa chạm vào cổng WAN (`in-interface=pppoe-out1`). Người ngoài Internet gọi vào `IP_Public:8080`, rule `dstnat` sẽ sửa `Dst IP:Dst Port` thành `192.168.10.50:80` trước khi Router tra bảng định tuyến để đẩy gói tin vào LAN.",
          realExample: "Mở port đầu ghi Camera hoặc Web Server nội bộ (192.168.10.50:80) ra ngoài Internet qua cổng 8080."
        },
        {
          term: "Firewall Filter Chains: INPUT vs FORWARD vs OUTPUT",
          shortDef: "Là 3 chốt kiểm soát an ninh trên MikroTik được phân chia dựa theo ĐÍCH ĐẾN và NGUỒN GỐC của gói tin so với bản thân con Router.",
          easyExplain: "Rất nhiều bạn tạo rule chặn VLAN 30 sang VLAN 10 nhưng lại chọn nhầm `chain=input` nên chặn mãi không có tác dụng! Hãy nhớ quy tắc cực dễ này bằng cách lấy **BẢN THÂN CON ROUTER MIKROTIK** làm trung tâm:\n• **INPUT**: Gói tin gửi ĐẾN CHÍNH CON ROUTER (Dst IP là một trong các IP của самой Router: WinBox port 8291, SSH, WebFig, Ping IP Gateway, DNS request tới Router).\n• **FORWARD**: Gói tin ĐI XUYÊN QUA ROUTER từ mạng này sang mạng khác (VLAN 10 <-> VLAN 30, LAN <-> Internet). Đây là nơi 90% các rule phân quyền phòng ban và chặn truy cập liên mạng được đặt!\n• **OUTPUT**: Gói tin do CHÍNH CON ROUTER tự phát sinh đi ra ngoài (Router tự ping, tự cập nhật giờ NTP, tự gửi backup).",
          realExample: "Chặn hacker ngoài Internet dò mật khẩu WinBox -> dùng `chain=input`. Chặn phòng Guest (VLAN 30) truy cập Server phòng IT (VLAN 10) -> BẮT BUỘC dùng `chain=forward`!"
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt cốt lõi: Routing vs SRCNAT vs DSTNAT vs Firewall Filter",
        headers: ["Tiêu chí", "Routing (Định tuyến)", "SRCNAT / Masquerade", "DSTNAT (Port Forward)", "Firewall Filter"],
        rows: [
          [
            "Mục đích chính",
            "Tìm đường đi tới mạng đích (Next-hop & Out-interface).",
            "Đổi IP Nguồn (thường từ IP Private LAN -> IP Public WAN).",
            "Đổi IP/Port Đích (thường từ IP Public WAN -> IP Server LAN).",
            "Cho phép (Accept) hoặc Chặn (Drop/Reject) gói tin."
          ],
          [
            "Gói tin có bị sửa IP không?",
            "**KHÔNG!** Giữ nguyên cả Src IP và Dst IP.",
            "**CÓ!** Sửa `Src IP` (và `Src Port`) lúc đi ra.",
            "**CÓ!** Sửa `Dst IP` (và `Dst Port`) lúc đi vào.",
            "**KHÔNG!** Chỉ kiểm tra điều kiện rồi cho qua hoặc hủy."
          ],
          [
            "Khi nào dùng?",
            "Giao tiếp giữa các VLAN nội bộ hoặc giữa các Router đã biết đường về.",
            "Khi mạng nội bộ (IP Private) đi ra Internet.",
            "Khi cần Publish dịch vụ nội bộ (Web, Cam, RDP) ra ngoài WAN.",
            "Khi cần cô lập các VLAN, chống tấn công vào Router."
          ],
          [
            "Trạng thái gói phản hồi (Return traffic)",
            "Cần thiết bị đích có Route (hoặc Default Gateway) chỉ đường quay về mạng nguồn.",
            "Tự động đổi ngược lại nhờ bảng `Connection Tracking`.",
            "Tự động đổi ngược lại nhờ bảng `Connection Tracking`.",
            "Thường cho phép gói trả về bằng rule `established, related` ở đầu bảng."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Hãy trả lời dứt khoát câu hỏi kinh điển: <b>Tại sao từ VLAN 30 (192.168.30.0/24) sang VLAN 10 (192.168.10.0/24) trên cùng một Router cần Routing nhưng KHÔNG CẦN NAT?</b><br>Bởi vì: (1) Router có cả 2 mạng này trong bảng định tuyến (Connected Routes) nên biết đường chuyển gói tin đi và về; (2) Máy ở VLAN 10 có Default Gateway trỏ về chính Router đó (192.168.10.1), nên khi nhận gói tin có <code>Src IP = 192.168.30.5</code>, nó biết đẩy gói trả lời về cho Router để Router trả về VLAN 30. Ngược lại, khi đi ra <b>Internet (8.8.8.8)</b>, các Router ngoài Internet không hề biết mạng Private <code>192.168.30.0/24</code> của cậu nằm ở đâu trên trái đất (và theo chuẩn RFC 1918, IP Private bị cấm định tuyến trên Internet), nên bắt buộc phải dùng <b>SRCNAT/Masquerade</b> để mượn danh nghĩa IP Public của cổng WAN!",
      flowTitle: "So sánh trực diện 2 luồng gói tin: Liên VLAN nội bộ (Routing thuần) vs Đi ra Internet (Routing + SRCNAT)",
      flowSteps: [
        {
          step: "Tình huống A - Bước 1",
          title: "[Nội bộ Inter-VLAN] PC VLAN 30 (192.168.30.5) gửi gói tin tới Server VLAN 10 (192.168.10.50)",
          detail: "PC thấy đích khác subnet nên đẩy gói tin lên Default Gateway (`192.168.30.1`). Gói tin đi vào giao diện `vlan30` trên MikroTik.",
          packetOrState: "Vào vlan30: Src IP = 192.168.30.5 -> Dst IP = 192.168.10.50"
        },
        {
          step: "Tình huống A - Bước 2",
          title: "[Nội bộ Inter-VLAN] MikroTik Routing -> Firewall Forward -> Đẩy xuống VLAN 10 (KHÔNG NAT)",
          detail: "MikroTik tra bảng `/ip route`, thấy `192.168.10.0/24` gắn trực tiếp ở `vlan10`. Gói tin đi qua chốt kiểm duyệt **Firewall Chain = FORWARD** (vì đi xuyên qua Router). Nếu Firewall cho phép, gói tin đi ra `vlan10` xuống Server với **nguyên vẹn IP nguồn 192.168.30.5**.",
          packetOrState: "Ra vlan10 (Không NAT): Src IP = 192.168.30.5 -> Dst IP = 192.168.10.50"
        },
        {
          step: "Tình huống B - Bước 1",
          title: "[Đi ra Internet] PC VLAN 30 (192.168.30.5) truy cập Google DNS (8.8.8.8)",
          detail: "Gói tin cũng được đẩy lên Gateway `192.168.30.1`. MikroTik tra bảng `/ip route`, khớp với tuyến Default Route `0.0.0.0/0` đi ra cổng WAN `pppoe-out1` (đang có IP Public `113.160.22.33`). Gói tin đi qua chốt **Firewall Chain = FORWARD**.",
          packetOrState: "Trước khi ra WAN: Src IP = 192.168.30.5 (Private) -> Dst IP = 8.8.8.8"
        },
        {
          step: "Tình huống B - Bước 2",
          title: "[Đi ra Internet] Thực thi SRCNAT (Masquerade) tại bước Postrouting trước khi rời cổng WAN",
          detail: "Ngay trước khi gói tin bước ra khỏi cổng `pppoe-out1`, nó khớp với rule `chain=srcnat out-interface=pppoe-out1 action=masquerade`. MikroTik lưu trạng thái vào bảng **Connection Tracking**, rồi đổi `Src IP` từ `192.168.30.5` thành `113.160.22.33`. Nhờ vậy `8.8.8.8` mới biết đường trả lời về `113.160.22.33`!",
          packetOrState: "Sau khi qua SRCNAT ra WAN: Src IP = 113.160.22.33 (Public) -> Dst IP = 8.8.8.8"
        }
      ],
      asciiDiagram: `
                       +---------------- [ROUTER MIKROTIK] ----------------+
                       |                                                   |
                       |              (Gói tin gửi ĐẾN Router)             |
                       |              WinBox / Ping GW / DNS               |
                       |                        ^                          |
                       |                        | [Chain: INPUT]           |
 [PC VLAN 30]          |                        |                          |         [Server VLAN 10]
 192.168.30.5  =======>|--> (In: vlan30) -> [ROUTING] --- [Chain: FORWARD] |========> 192.168.10.50
                       |                        |         (Xuyên qua Router)         (Routing thuần:
                       |                        |                          |          Src IP vẫn là .30.5
                       |                        v [Chain: FORWARD]         |          KHÔNG CẦN NAT!)
                       |                 (Out: pppoe-out1)                 |
                       |                        |                          |
                       |            [SRCNAT / MASQUERADE]                  |
                       |         (Đổi Src IP -> 113.160.22.33)             |
                       +------------------------|--------------------------+
                                                |
                                                v
                                       [INTERNET: 8.8.8.8]`,
      keyTakeaways: [
        "Routing giúp tìm đường đi (giữ nguyên IP Nguồn/Đích); NAT dùng để đổi IP Nguồn/Đích (chỉ dùng khi ra WAN hoặc khi bên kia không có route quay về).",
        "Không bao giờ cấu hình `masquerade` tràn lan không có điều kiện `out-interface=WAN`! Nếu quên chỉ định `out-interface=WAN`, mọi lưu lượng giữa các VLAN nội bộ cũng bị NAT hết thành IP của Router.",
        "Phân biệt 3 Firewall Chains: `INPUT` = vào chính Router; `FORWARD` = đi xuyên qua Router (LAN <-> LAN, LAN <-> WAN); `OUTPUT` = từ chính Router đi ra.",
        "Firewall MikroTik đọc rule **từ trên xuống dưới (Top-Down)**, khớp rule nào trước là thực thi ngay (trừ passthrough). Luôn đặt rule `accept established,related` lên đầu để tối ưu tải CPU và cho phép gói tin phản hồi."
      ]
    },
    level3_practice: {
      scenario: "Tiếp nối hệ thống 3 VLAN ở Bài 02 (VLAN 10 Server/Mgmt: `192.168.10.0/24`, VLAN 20 Staff: `192.168.20.0/24`, VLAN 30 Guest: `192.168.30.0/24`) và cổng WAN là `pppoe-out1`. Yêu cầu của Sếp: (1) Cho cả 3 VLAN đi ra Internet; (2) Cho phép VLAN 20 truy cập Server ở VLAN 10, nhưng CẤM tuyệt đối VLAN 30 (Guest) truy cập sang VLAN 10 và VLAN 20; (3) Cấm VLAN 30 đăng nhập WinBox vào Router; (4) Mở port 8080 từ ngoài WAN vào Web Server `192.168.10.50:80`.",
      steps: [
        {
          title: "Bước 1: Kiểm tra bảng Routing và cấu hình NAT chuẩn (SRCNAT & DSTNAT)",
          instruction: "Kiểm tra `/ip route print` để thấy các Connected Routes (DAC) đã tự động thông giữa các VLAN, sau đó cấu hình Masquerade CÓ ĐIỀU KIỆN `out-interface=pppoe-out1` và rule Port Forwarding (`dstnat`).",
          commandOrConfig: `# 1. Kiểm tra bảng định tuyến (sẽ thấy DAC cho .10.0/24, .20.0/24, .30.0/24 và 0.0.0.0/0 ra pppoe-out1)
/ip route print

# 2. Cấu hình SRCNAT ra Internet (BẮT BUỘC chỉ định rõ out-interface=pppoe-out1)
/ip firewall nat
add chain=srcnat out-interface=pppoe-out1 action=masquerade comment="NAT LAN ra Internet"

# 3. Cấu hình DSTNAT (Port Forwarding từ cổng WAN 8080 vào Web Server 192.168.10.50:80)
add chain=dstnat in-interface=pppoe-out1 protocol=tcp dst-port=8080 \\
    action=dst-nat to-addresses=192.168.10.50 to-ports=80 comment="Forward Web Server"`,
          explanation: "Chú ý thông số `out-interface=pppoe-out1` ở rule `masquerade`! Nhờ có điều kiện này, chỉ những gói tin đi ra ngoài Internet mới bị đổi IP nguồn; còn gói tin đi từ VLAN 20 sang VLAN 10 (ra cổng `vlan10-mgmt`) sẽ đi theo cơ chế Routing thuần túy, giữ nguyên IP thật của nhân viên."
        },
        {
          title: "Bước 2: Cấu hình Firewall Filter bảo vệ chính con Router (Chain INPUT)",
          instruction: "Thiết lập chốt chặn cho các kết nối nhắm thẳng vào Router (`chain=input`): Cho phép các kết nối phản hồi, cấm khách ở VLAN 30 và người lạ ngoài Internet chọc vào WinBox/SSH của Router.",
          commandOrConfig: `/ip firewall filter
# Rule 1: Luôn cho phép các gói tin thuộc phiên kết nối đã thiết lập (chiều trả về)
add chain=input connection-state=established,related action=accept comment="Accept Established/Related Input"

# Rule 2: Cấm mạng Guest (VLAN 30) truy cập WinBox (8291), SSH (22), WebFig (80) của Router
add chain=input in-interface=vlan30-guest protocol=tcp dst-port=8291,22,80,23 action=drop comment="Block Guest to Router Mgmt"

# Rule 3: Cấm mọi kết nối lạ từ ngoài cổng WAN chọc trực tiếp vào Router
add chain=input in-interface=pppoe-out1 action=drop comment="Drop all Input from WAN"`,
          explanation: "Tại sao ở Rule 2 ta không `drop` toàn bộ `in-interface=vlan30-guest` ở `chain=input`? Vì nếu chặn sạch sành sanh `input` từ VLAN 30, khách sẽ không thể hỏi DNS của Router (port 53 UDP/TCP) hoặc xin DHCP! Do đó ta chỉ chặn các cổng quản trị, hoặc chỉ cho phép port 53, 67 rồi drop phần còn lại."
        },
        {
          title: "Bước 3: Cấu hình Firewall Filter kiểm soát đi xuyên qua các VLAN (Chain FORWARD)",
          instruction: "Vì mặc định MikroTik tự định tuyến thông tất cả các VLAN với nhau, ta dùng `chain=forward` để cô lập VLAN 30 (Guest) chỉ được phép đi ra cổng WAN (`pppoe-out1`), không được rẽ sang VLAN 10 hay VLAN 20.",
          commandOrConfig: `/ip firewall filter
# Rule 4: Cho phép chiều trả về của mọi kết nối hợp lệ đi xuyên qua Router (BẮT BUỘC đặt lên đầu Forward!)
add chain=forward connection-state=established,related action=accept comment="Accept Established/Related Forward"

# Rule 5: Hủy các gói tin lỗi trạng thái
add chain=forward connection-state=invalid action=drop comment="Drop Invalid Forward"

# Rule 6: Cấm VLAN 30 (Guest) đi sang bất kỳ nơi nào KHÁC NGOÀI cổng WAN (tức chặn sang VLAN 10, VLAN 20...)
add chain=forward in-interface=vlan30-guest out-interface=!pppoe-out1 action=drop comment="Isolate Guest VLAN - WAN Only"`,
          explanation: "Hãy thưởng thức vẻ đẹp của Rule 4 và Rule 6!\n• Nhờ có **Rule 4 (`established,related`)** nằm trên cùng: Khi Admin ngồi ở VLAN 10 chủ động ping hoặc remote xuống một máy ở VLAN 30, gói đi từ 10 -> 30 được phép qua, và gói phản hồi từ 30 -> 10 sẽ khớp ngay với Rule 4 ở trên nên vẫn trả về được!\n• Nhưng nếu một người ngồi ở VLAN 30 chủ động khởi tạo kết nối mới (`connection-state=new`) sang VLAN 10 hoặc VLAN 20, nó không khớp Rule 4 mà rơi xuống **Rule 6** (`in-interface=vlan30-guest` và `out-interface` không phải `pppoe-out1`) -> Bị `drop` ngay lập tức!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Trên File Server ở VLAN 10 (192.168.10.50), khi kiểm tra log truy cập từ các máy nhân viên VLAN 20 (192.168.20.x), tất cả các máy đều hiện chung một địa chỉ IP duy nhất là `192.168.10.1` (IP của Router MikroTik).",
          hypothesis: "Rule `srcnat / masquerade` trên MikroTik bị cấu hình thiếu điều kiện `out-interface=WAN`, dẫn đến việc Router thực hiện Source NAT cho cả lưu lượng đi giữa các VLAN nội bộ.",
          testCommand: "/ip firewall nat print detail",
          fix: "Mở rule `masquerade` trong `IP -> Firewall -> NAT` và bổ sung điều kiện `Out. Interface = pppoe-out1` (hoặc `Out. Interface List = WAN`). Ngay lập tức lưu lượng giữa các VLAN sẽ trở về Routing thuần và hiện đúng IP thật của từng máy."
        },
        {
          symptom: "Đã tạo Firewall Filter Rule: `chain=input src-address=192.168.30.0/24 dst-address=192.168.10.0/24 action=drop` để chặn VLAN 30 truy cập sang VLAN 10, nhưng các máy ở VLAN 30 vẫn ping và vào được Server `192.168.10.50` bình thường, bộ đếm Bytes/Packets của rule đứng im ở số 0.",
          hypothesis: "Chọn sai Chain! Lưu lượng đi từ VLAN 30 sang VLAN 10 là lưu lượng đi XUYÊN QUA Router (`forward`), không phải đi vào chính con Router (`input`).",
          testCommand: "/ip firewall filter print stats",
          fix: "Đổi `Chain` của rule đó từ `input` sang `forward`. Kiểm tra lại thứ tự rule (đảm bảo rule chặn này không nằm dưới một rule `accept` rộng hơn)."
        },
        {
          symptom: "Mới tạo thêm VLAN 40 (192.168.40.0/24) trên Router MikroTik số 1. Các máy ở VLAN 40 lên được Internet, nhưng khi ping sang một Server nằm sau Router số 2 (10.10.20.50, nối với Router 1 qua dải 172.16.0.0/30) thì báo Request timed out, dù trên Router 1 đã có Static Route tới 10.10.20.0/24.",
          hypothesis: "Thiếu đường về (Return Route) trên Router số 2! Gói tin từ `192.168.40.x` đã đi tới được Server `10.10.20.50`, nhưng khi Server trả lời lại cho `192.168.40.x`, con Router số 2 chưa được khai báo route cho mạng mới `192.168.40.0/24` nên đẩy gói trả lời ra ngoài Internet hoặc hủy bỏ.",
          testCommand: "/tool traceroute 10.10.20.50 src-address=192.168.40.1 (trên Router 1) và kiểm tra `/ip route print` trên Router 2.",
          fix: "Bổ sung Static Route trên Router số 2: `dst-address=192.168.40.0/24 gateway=172.16.0.1` (IP của Router 1) để thông suốt cả đường đi lẫn đường về."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Tại sao máy tính ở VLAN 30 muốn giao tiếp với máy chủ ở VLAN 10 (cùng đấu nối vào một Router MikroTik) lại cần Routing nhưng KHÔNG nhất thiết cần NAT? Trong trường hợp nào giữa 2 mạng nội bộ người ta lại buộc phải dùng NAT?",
          wrongAnswer: "Vì cùng nằm trong một cục Router nên nó tự thông bằng NAT sẵn rồi, hoặc muốn thông từ VLAN 30 sang VLAN 10 thì phải bật Masquerade cho từng VLAN.",
          rightAnswer: "1) **Tại sao chỉ cần Routing mà không cần NAT?**\nVì cả VLAN 30 (`192.168.30.0/24`) và VLAN 10 (`192.168.10.0/24`) đều là các mạng gắn trực tiếp (Connected Routes) trên cùng con Router MikroTik, và các máy ở cả hai VLAN đều trỏ Default Gateway về chính con Router này. Do đó, khi gói tin giữ nguyên IP nguồn `192.168.30.x` đi sang `192.168.10.x`, máy chủ ở VLAN 10 biết gửi trả lại cho Gateway để Router định tuyến ngược về VLAN 30 một cách trọn vẹn. Việc không dùng NAT giúp giữ nguyên IP nguồn thật để phục vụ kiểm soát quyền hạn (ACL/Firewall) và ghi nhận Log.\n2) **Khi nào giữa 2 mạng nội bộ lại buộc phải dùng NAT?**\nChỉ khi thiết bị ở mạng đích **không có Default Gateway** hoặc **không có Route chỉ đường quay về mạng nguồn** (ví dụ: một chiếc máy chấm công / PLC dây chuyền nhà máy đời cũ không cho đặt Gateway hoặc đang trỏ Gateway đi hướng khác mà ta không có quyền sửa). Khi đó ta mới dùng SRCNAT (Masquerade) để giả danh gói tin thành IP cùng lớp mạng với thiết bị đó.",
          keyPoints: [
            "Router đã biết cả 2 mạng (Connected Routes) và thiết bị 2 đầu đều trỏ Gateway về Router -> Đủ cả chiều đi lẫn chiều về",
            "Giữ nguyên IP gốc (Routing thuần) giúp tường lửa lọc chính xác và Server ghi log đúng IP người truy cập",
            "Chỉ dùng NAT nội bộ như giải pháp tình thế khi thiết bị đích không có Gateway/Route trả về mạng nguồn"
          ]
        },
        {
          question: "Trên MikroTik Firewall Filter, sự khác biệt bản chất giữa `chain=input` và `chain=forward` là gì? Nếu người dùng ở mạng LAN gõ `ping 8.8.8.8` và `ping 192.168.1.1` (IP của chính Router MikroTik), mỗi lệnh ping đó sẽ đi vào chain nào?",
          wrongAnswer: "`input` là gói tin từ ngoài đi vào cổng của Router, còn `forward` là gói tin từ Router đi ra cổng khác. Cả 2 lệnh ping từ LAN gửi lên đều đi vào cổng LAN của Router nên đều thuộc `chain=input`.",
          rightAnswer: "Sự phân biệt giữa `input` và `forward` KHÔNG phụ thuộc vào việc gói tin đi vào cổng vật lý nào, mà phụ thuộc vào **Địa chỉ IP Đích (Destination IP) có phải là của chính con Router hay không** (sau bước Routing Decision):\n• `chain=input`: Dành cho các gói tin có IP Đích là một trong các địa chỉ IP gắn trên chính con Router đó (gói tin kết thúc hành trình tại CPU của Router).\n• `chain=forward`: Dành cho các gói tin chỉ mượn Router làm trạm trung chuyển để đi từ mạng này sang mạng khác (IP Đích là của một thiết bị khác).\nDo đó:\n- Khi máy LAN gõ `ping 192.168.1.1` (IP của Router): Gói tin đi vào **`chain=input`**.\n- Khi máy LAN gõ `ping 8.8.8.8` (IP ngoài Internet): Gói tin đi xuyên qua Router nên đi vào **`chain=forward`**.",
          keyPoints: [
            "Phân biệt dựa trên Đích đến của gói tin so với bản thân Router (sau khi tra bảng định tuyến)",
            "Ping 192.168.1.1 (IP của Router) -> đi vào `chain=input`",
            "Ping 8.8.8.8 (đi xuyên qua Router ra Internet) -> đi vào `chain=forward`"
          ]
        },
        {
          question: "Tại sao trong danh sách Firewall Filter của MikroTik, người ta luôn đặt rule `Accept connection-state=established,related` ở vị trí đầu tiên (trên cùng) trước các rule `Drop`?",
          wrongAnswer: "Để cho mạng chạy ổn định không bị rớt kết nối, đó là rule mặc định của hãng.",
          rightAnswer: "Có 2 lý do quan trọng bậc nhất về mặt **bảo mật một chiều (Stateful Firewall)** và **hiệu năng xử lý (CPU Performance)**:\n1) **Cho phép giao tiếp một chiều (Chiều trả về)**: Giả sử ta cấm VLAN 30 khởi tạo kết nối sang VLAN 10, nhưng muốn VLAN 10 vẫn chủ động kết nối sang được VLAN 30. Khi VLAN 10 gửi gói đầu tiên (`state=new`) sang VLAN 30 thì được đi qua; khi máy ở VLAN 30 trả lời ngược lại cho VLAN 10, gói trả lời đó mang trạng thái `established`. Nhờ rule `Accept established,related` nằm ở trên cùng, gói trả lời được cho qua ngay lập tức mà không bị chặn bởi rule `Drop VLAN 30 -> VLAN 10` nằm ở bên dưới!\n2) **Tối ưu hiệu năng CPU**: Trong một phiên truyền file hàng triệu gói tin, chỉ có gói đầu tiên (`new`) phải đi duyệt qua toàn bộ danh sách hàng chục rule Firewall bên dưới. Từ gói thứ 2 trở đi (`established`), nó khớp ngay ở dòng số 1 và đi thẳng, giúp giảm tải CPU của Router xuống mức tối thiểu.",
          keyPoints: [
            "Cơ chế Stateful Firewall: phân biệt ai là người chủ động khởi tạo (`new`) và ai là người phản hồi (`established, related`)",
            "Giúp chiều phản hồi của các kết nối hợp lệ không bị các rule Drop bên dưới chặn nhầm",
            "Tối ưu hiệu năng: 99% gói tin thuộc phiên đang chạy khớp ngay ở dòng đầu tiên, không tốn CPU duyệt hết bảng Firewall"
          ]
        }
      ],
      quizzes: [
        {
          question: "Bạn muốn cấu hình Port Forwarding trên MikroTik để nhân viên làm việc từ xa có thể truy cập Remote Desktop (TCP Port 3389) vào máy chủ nội bộ `192.168.10.100` thông qua cổng `33389` trên IP Public của công ty. Bạn phải sử dụng Chain nào và Action nào trong `/ip firewall nat`?",
          options: [
            "Chain = srcnat, Action = masquerade",
            "Chain = dstnat, Action = dst-nat",
            "Chain = forward, Action = accept",
            "Chain = input, Action = dst-nat"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Khi gói tin từ ngoài Internet gọi vào IP Public của công ty, ta cần đổi Địa chỉ IP Đích (và Port Đích từ 33389 -> 3389 của máy 192.168.10.100) ngay khi gói tin đi vào Router, nên phải dùng `chain=dstnat` và `action=dst-nat`."
        },
        {
          question: "Trong bảng `/ip route print` của MikroTik, ký hiệu cờ (Flags) **`DAC`** ở đầu một tuyến đường có ý nghĩa là gì?",
          options: [
            "Dynamic - Active - Connected: Tuyến đường được tạo tự động, đang hoạt động và nối trực tiếp với một cổng có gắn IP trên Router.",
            "Default - Admin - Configured: Tuyến đường mặc định do người quản trị tự gõ bằng tay.",
            "Disabled - Address - Conflict: Tuyến đường đang bị vô hiệu hóa do trùng địa chỉ IP.",
            "DHCP - Assigned - Client: Tuyến đường chỉ dành riêng cho các máy trạm nhận DHCP."
          ],
          correctIndex: 0,
          explanation: "Đáp án đúng là A (`Dynamic Active Connected`). Hễ bạn gán một địa chỉ IP kèm Subnet Mask lên một interface đang hoạt động của MikroTik, RouterOS tự động tạo ra tuyến DAC cho subnet đó."
        },
        {
          question: "Để chặn các máy tính thuộc mạng Khách (`192.168.30.0/24`) không được phép ping hay truy cập vào mạng Server (`192.168.10.0/24`), câu lệnh Firewall nào sau đây trên MikroTik là ĐÚNG?",
          options: [
            "`/ip firewall filter add chain=input src-address=192.168.30.0/24 dst-address=192.168.10.0/24 action=drop`",
            "`/ip firewall filter add chain=output src-address=192.168.30.0/24 dst-address=192.168.10.0/24 action=drop`",
            "`/ip firewall filter add chain=forward src-address=192.168.30.0/24 dst-address=192.168.10.0/24 action=drop`",
            "`/ip firewall nat add chain=srcnat src-address=192.168.30.0/24 dst-address=192.168.10.0/24 action=masquerade`"
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. Gói tin đi từ mạng `192.168.30.0/24` sang mạng `192.168.10.0/24` là gói tin đi xuyên qua Router từ cổng này sang cổng khác, do đó bắt buộc phải lọc tại `chain=forward`."
        }
      ]
    }
  },

  // ==========================================================================
  // BÀI 04: DHCP, DNS, APIPA
  // ==========================================================================
  {
    id: 4,
    code: "04",
    week: 1,
    title: "DHCP (Tiến trình DORA), DNS Resolution & APIPA",
    subtitle: "Hiểu sâu 4 bước Discover-Offer-Request-Ack, Lease Time, phân giải DNS và chẩn đoán lỗi 169.254.x.x bằng bằng chứng",
    priority: "P0",
    duration: "75 phút",
    whyThisMatters: "Khi đi làm, hễ thấy máy tính hiện dấu chấm than vàng kèm IP `169.254.x.x`, cậu biết ngay là 'Lỗi không nhận được DHCP rồi!' và thường xử lý bằng cách đặt đại IP tĩnh hoặc rút dây cắm lại. Nhưng nhà tuyển dụng sẽ hỏi sâu hơn: 'Tại sao máy tính lại tự sinh ra con số 169.254.x.x? Trong 4 bước DORA của DHCP, bước nào là Broadcast và tại sao bước thứ 3 (Request) vẫn phải phát Broadcast dù đã biết IP của DHCP Server rồi? Nếu trong mạng có người cắm nhầm cục Wifi phát DHCP giả mạo (Rogue DHCP) thì chuyện gì xảy ra và bắt tận tay nó bằng cách nào?'. Nắm vững bài này, cậu sẽ trả lời sắc bén như một chuyên gia.",
    analogy: {
      title: "Chuyện người khách mới đến Hội trường tìm chỗ ngồi (Tiến trình DORA)",
      content: "Hãy tưởng tượng một nhân viên mới (DHCP Client) vừa bước chân vào một hội trường lớn (Mạng LAN/VLAN) khi chưa có số ghế ngồi (chưa có IP: 0.0.0.0):\n• Bước 1 - DISCOVER (Khám phá): Vì chưa biết ai là ban tổ chức, anh ta cầm loa phóng thanh hét vang khắp hội trường (Broadcast): 'Alo! Có ai là Ban Tổ Chức (DHCP Server) ở đây không? Cho tôi xin một chỗ ngồi với!'.\n• Bước 2 - OFFER (Chào mời): Trong hội trường có thể có 1 hoặc nhiều người làm Ban Tổ Chức (hoặc có cả kẻ mạo danh - Rogue DHCP). Họ nghe thấy liền giơ biển mời: 'Về đội của tôi này! Tôi giữ cho cậu ghế số 192.168.20.55 nhé, kèm bản đồ lối thoát hiểm (Gateway) và danh bạ (DNS) luôn!'.\n• Bước 3 - REQUEST (Yêu cầu chính thức): Đây là điểm cực kỳ thú vị! Dù đã chọn lời mời của Ban Tổ Chức A (thường là người phản hồi nhanh nhất), anh nhân viên VẪN CẦM LOA HÉT LỚN CHO CẢ HỘI TRƯỜNG NGHE (Broadcast): 'Tôi chính thức nhận ghế 192.168.20.55 của anh A nhé!'. Tại sao phải hét to cho tất cả cùng nghe? Để nếu có anh Ban Tổ Chức B nào khác lúc nãy cũng định giữ ghế cho anh ta thì nghe thấy mà thu hồi ghế đó lại cho người khác!\n• Bước 4 - ACK (Xác nhận chốt sổ): Anh Ban Tổ Chức A ghi vào sổ (DHCP Leases): 'Chốt! Ghế .20.55 giao cho cậu trong vòng 8 tiếng (Lease Time) nhé!'.\n• Còn nếu hét khản cổ ở Bước 1 mà không một ai trả lời? Anh nhân viên đành tự lấy phấn viết bừa một con số tạm bợ `169.254.x.x` (APIPA) dán lên áo để ngồi nói chuyện tạm với mấy người cũng bị bỏ rơi ngay cạnh mình!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "DHCP (Dynamic Host Configuration Protocol) & Tiến trình DORA",
          shortDef: "Là giao thức tự động cấp phát địa chỉ IP và các thông số mạng (Subnet Mask, Default Gateway, DNS Server) cho máy trạm thông qua quy trình 4 bước: Discover -> Offer -> Request -> Acknowledge (sử dụng UDP Port 67 cho Server và Port 68 cho Client).",
          easyExplain: "Nhớ kỹ cặp cổng UDP: **Server nghe ở Port 67, Client dùng Port 68**. Vì bản tin DHCP sử dụng Broadcast ở Layer 2 (`FF:FF:FF:FF:FF:FF`) và Layer 3 (`255.255.255.255`), nên mặc định gói tin DHCP **KHÔNG THỂ tự đi xuyên qua Router sang subnet khác**. Muốn 1 DHCP Server cấp cho nhiều VLAN thì hoặc là trên Router phải tạo giao diện ở từng VLAN, hoặc phải cấu hình **DHCP Relay (IP Helper)** để biến gói Broadcast thành Unicast gửi tới DHCP Server trung tâm.",
          realExample: "DHCP Server trên MikroTik gắn vào `vlan20-staff` cấp dải Pool `192.168.20.50 - 192.168.20.250`, Gateway `192.168.20.1`, DNS `192.168.20.1`."
        },
        {
          term: "APIPA (Automatic Private IP Addressing - 169.254.0.0/16)",
          shortDef: "Là cơ chế tự động gán một địa chỉ IP trong dải `169.254.0.1 - 169.254.255.254` (Mask `255.255.0.0`, không có Default Gateway) khi một máy trạm đang bật DHCP Client nhưng gửi bản tin DHCP Discover mà không nhận được bất kỳ phản hồi DHCP Offer nào.",
          easyExplain: "Khi nhìn thấy `169.254.x.x` trong `ipconfig`, hãy đọc vị ngay bằng chứng kỹ thuật: Card mạng của máy tính đã bật (Link Up), đang để chế độ nhận IP động (DHCP Enabled = Yes), máy ĐÃ GỬI `DHCP Discover` đi nhưng **bị đứt đường truyền từ máy tới DHCP Server hoặc DHCP Server không trả lời**. Hai máy cùng bị APIPA cắm chung 1 Switch vẫn ping được nhau bằng IP 169.254.x.x, nhưng không bao giờ đi ra ngoài được vì không có Gateway!",
          realExample: "Cắm máy tính vào cổng Switch bị cấu hình sai VLAN (VD: VLAN 99 chưa có DHCP Server) -> Sau vài giây chờ đợi, Windows tự gán `Autoconfiguration IPv4 Address: 169.254.120.45`."
        },
        {
          term: "DHCP Lease Time & Quy tắc gia hạn 50% (T1) - 87.5% (T2)",
          shortDef: "Lease Time là thời hạn cho thuê một địa chỉ IP; khi hết 50% thời gian thuê, máy trạm sẽ chủ động gửi bản tin Unicast DHCP Request để xin gia hạn trực tiếp với DHCP Server cũ.",
          easyExplain: "Không phải đợi hết sạch 100% thời gian thuê máy tính mới đi xin lại IP! Theo nguyên lý chuẩn:\n• Tại mốc **50% Lease Time (T1)**: Máy trạm gửi gói **Unicast** `DHCP Request` thẳng tới DHCP Server đang cấp cho nó để xin gia hạn. Nếu Server trả lời `ACK`, bộ đếm thời gian reset lại từ đầu.\n• Nếu Server im lặng, máy vẫn dùng tiếp IP đó đến mốc **87.5% Lease Time (T2)**: Lúc này máy phát **Broadcast** `DHCP Request` hỏi bất kỳ DHCP Server nào trong mạng. Nếu hết 100% mà vẫn không ai trả lời, máy mới nhả IP và quay về 169.254.x.x.",
          realExample: "Mạng văn phòng cố định nên để Lease Time từ `8h` đến `1d` (24h). Mạng Wifi quán cafe hoặc VLAN Guest khách ra vào liên tục chỉ nên để `30m` đến `1h` để tránh cạn kiệt IP Pool (Exhausted Pool)."
        },
        {
          term: "Rogue DHCP Server & DHCP Snooping",
          shortDef: "Rogue DHCP là một thiết bị phát DHCP trái phép trong mạng LAN (thường do nhân viên cắm nhầm cổng LAN của cục phát Wifi gia đình vào mạng công ty), tranh chấp cấp IP sai Gateway/DNS cho các máy trạm; được khắc phục triệt để bằng tính năng DHCP Snooping trên Switch.",
          easyExplain: "Khi máy tính gửi `DHCP Discover`, cả Router MikroTik xịn lẫn cục Wifi TP-Link cắm nhầm đều nhận được. Nếu cục TP-Link phản hồi `DHCP Offer` nhanh hơn (mili-giây), máy tính sẽ nhận IP từ cục TP-Link với Gateway là `192.168.0.1` (trong khi cục TP-Link không cắm dây WAN) -> Mất mạng! Để trị tận gốc, trên Switch Managed ta bật **DHCP Snooping**: chỉ đánh dấu cổng nối lên Router MikroTik là **Trusted Port** (cho phép trả lời Offer/ACK), còn tất cả các cổng cắm xuống phòng ban là **Untrusted Port** (cấm tuyệt đối gói Offer/ACK đi vào từ các cổng này).",
          realExample: "Bật `DHCP Snooping` trên Switch hoặc trên MikroTik Bridge (`dhcp-snooping=yes` và tích `trusted=yes` duy nhất trên cổng Uplink)."
        },
        {
          term: "DNS Resolution Flow (Trình tự phân giải tên miền)",
          shortDef: "Là thứ tự các bước mà hệ điều hành thực hiện để tìm địa chỉ IP của một tên miền: Kiểm tra bộ nhớ đệm (DNS Cache) -> Kiểm tra file Hosts cục bộ -> Hỏi DNS Server nội bộ (Recursive Resolver) -> Truy vấn phân cấp ra Root / TLD / Authoritative DNS.",
          easyExplain: "Hiểu trình tự này giúp cậu giải thích tại sao: Sếp vừa bảo đổi IP của Web Server nội bộ trên DNS Server xong, các máy khác vào được ngay nhưng riêng máy của Sếp vẫn vào IP cũ! Đó là vì máy của Sếp vẫn còn lưu kết quả cũ trong **DNS Client Cache** (phải gõ `ipconfig /flushdns` để xóa cache) hoặc trước đó có ai từng gõ cứng IP cũ vào file `C:\\Windows\\System32\\drivers\\etc\\hosts`!",
          realExample: "Thứ tự ưu tiên trên Windows: `1. Browser/OS DNS Cache` (`ipconfig /displaydns`) -> `2. File hosts` -> `3. DNS Server cấu hình trong card mạng`."
        }
      ],
      comparisonTable: {
        title: "Bảng giải phẫu chi tiết 4 bước tiến trình DORA (Câu hỏi phỏng vấn kinh điển)",
        headers: ["Bước", "Hướng gửi", "Src IP -> Dst IP", "Cơ chế truyền", "Mục đích bản chất"],
        rows: [
          [
            "1. DHCP Discover",
            "Client -> Server",
            "`0.0.0.0` -> `255.255.255.255`\n(UDP 68 -> 67)",
            "**Broadcast** toàn VLAN (`FF:FF:FF:FF:FF:FF`)",
            "Client chưa có IP nên phát loa tìm kiếm mọi DHCP Server hiện có trong mạng."
          ],
          [
            "2. DHCP Offer",
            "Server -> Client",
            "`IP_DHCP_Server` -> `255.255.255.255` (hoặc IP đề xuất)",
            "Broadcast hoặc Unicast (tùy Broadcast Flag của Client)",
            "Server đề xuất 1 địa chỉ IP rảnh trong Pool kèm Mask, Gateway, DNS, Lease Time."
          ],
          [
            "3. DHCP Request",
            "Client -> Server",
            "`0.0.0.0` -> `255.255.255.255`\n(Kèm Option 54: Server ID)",
            "**BẮT BUỘC Broadcast** (ở lần xin mới đầu tiên)",
            "Chấp nhận lời mời của 1 Server cụ thể VÀ thông báo cho các Server khác thu hồi lại lời mời của họ."
          ],
          [
            "4. DHCP ACK",
            "Server -> Client",
            "`IP_DHCP_Server` -> `255.255.255.255` (hoặc IP được cấp)",
            "Broadcast hoặc Unicast",
            "Xác nhận chính thức giao IP cho Client; Client kiểm tra trùng IP (Gratuitous ARP) rồi gắn vào card mạng."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Hai nguyên lý cốt lõi cần nắm chắc: <br>1) <b>Lỗi APIPA (169.254.x.x) là bằng chứng cho thấy tiến trình DORA bị đứt ngay từ bước 1 (Discover) và bước 2 (Offer)</b> — tức gói Broadcast từ Client không chạm tới được DHCP Server, hoặc DHCP Server đã hết sạch IP trong Pool.<br>2) <b>DHCP và DNS hoàn toàn độc lập về mặt giao thức nhưng gắn kết thông qua DHCP Options</b>: DHCP chỉ là người 'giao tờ giấy cấu hình' (trong đó có ghi dòng DNS Server là ai - Option 6), còn việc dịch tên miền ra IP sau đó là cuộc nói chuyện riêng giữa máy trạm và DNS Server ở cổng 53.",
      flowTitle: "Quy trình DORA kết hợp DNS Resolution khi một máy trạm vừa cắm dây mạng",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Cắm cáp mạng (Link Up) & Phát bản tin DHCP Discover",
          detail: "Ngay khi đèn cổng mạng sáng, card mạng Windows (đang để Obtain an IP address automatically) đóng gói bản tin `DHCP Discover` từ `0.0.0.0:68` gửi tới `255.255.255.255:67` với MAC đích là `FF:FF:FF:FF:FF:FF`. Switch nhận frame này và nhân bản ra tất cả các cổng thuộc cùng VLAN đó.",
          packetOrState: "[1. DISCOVER] Src: 0.0.0.0:68 (MAC-PC) -> Dst: 255.255.255.255:67 (FF:FF:FF:FF:FF:FF)"
        },
        {
          step: "Bước 2",
          title: "MikroTik DHCP Server kiểm tra Pool và gửi DHCP Offer",
          detail: "Giao diện VLAN trên MikroTik nhận được `Discover`, kiểm tra trong `/ip pool` thấy IP `192.168.20.105` đang rảnh (và ping thử xem có ai đang chiếm dụng không). MikroTik gửi trả bản tin `DHCP Offer` chứa: IP đề xuất `.20.105`, Mask `/24` (Option 1), Gateway `.20.1` (Option 3), và DNS Server `.20.1` (Option 6).",
          packetOrState: "[2. OFFER] Src: 192.168.20.1:67 -> Offer IP: 192.168.20.105, GW: .20.1, DNS: .20.1"
        },
        {
          step: "Bước 3",
          title: "Client phát DHCP Request và nhận DHCP ACK (Chốt trạng thái Bound)",
          detail: "Client phát Broadcast `DHCP Request` xác nhận xin nhận IP `.20.105` từ Server `192.168.20.1`. MikroTik trả về `DHCP ACK` và ghi MAC của PC vào bảng `/ip dhcp-server lease` với trạng thái **Bound**. Lúc này PC vẫn cẩn thận phát 1 gói *Gratuitous ARP* hỏi 'Có ai trong LAN đang dùng 192.168.20.105 không?', nếu không ai trả lời thì PC chính thức gắn IP.",
          packetOrState: "[3. REQUEST -> 4. ACK] Lease Status = Bound (IP: 192.168.20.105/24)"
        },
        {
          step: "Bước 4",
          title: "Phân giải tên miền qua chuỗi DNS (Cache -> Hosts -> DNS Server)",
          detail: "Khi người dùng mở trình duyệt gõ `erp.congty.vn`: Windows tìm trong RAM Cache (`ipconfig /displaydns`) -> tìm trong file `hosts` -> nếu chưa có mới gửi gói UDP/TCP Port 53 tới DNS Server `192.168.20.1` (vừa nhận được từ DHCP ở bước trên) để lấy IP đích.",
          packetOrState: "[DNS QUERY] Src: 192.168.20.105 -> Dst: 192.168.20.1:53 (A Record: erp.congty.vn?)"
        }
      ],
      asciiDiagram: `
 [PC Client (MAC: 00:11:22:AA:BB:CC)]                         [MikroTik DHCP & DNS Server]
 Chưa có IP (0.0.0.0)                                         IP: 192.168.20.1 (VLAN 20)
         |                                                                 |
         |--- (1) DHCP DISCOVER (Broadcast 0.0.0.0 -> 255.255.255.255) --->| (Kiểm tra IP Pool)
         |                                                                 |
         |<-- (2) DHCP OFFER (Đề xuất 192.168.20.105, GW .20.1, DNS .20.1)-| (Trạng thái: Offered)
         |                                                                 |
         |--- (3) DHCP REQUEST (Broadcast: "Tôi chọn Offer của .20.1!") -->|
         |                                                                 |
         |<-- (4) DHCP ACK (Chốt cấp phát, Lease Time = 8h) ---------------| (Trạng thái: Bound)
         |                                                                 |
    [Đã có IP 192.168.20.105]                                              |
         |                                                                 |
         |--- (5) DNS Query (UDP 53): "erp.congty.vn là IP nào?" --------->| (Tra Static DNS / Forwarder)
         |<-- (6) DNS Response: "erp.congty.vn = 192.168.10.50" -----------|`,
      keyTakeaways: [
        "Tiến trình DORA gồm 4 bước: Discover (Broadcast) -> Offer -> Request (Broadcast) -> Ack (UDP Port 68 <-> 67).",
        "Bước 3 (DHCP Request) trong lần xin mới bắt buộc là Broadcast vì Client chưa chính thức sở hữu IP (Src IP vẫn là 0.0.0.0) và cần thông báo cho các DHCP Server khác rút lại lời mời Offer.",
        "Nhìn thấy IP `169.254.x.x` (APIPA) = Client không nhận được gói `DHCP Offer` nào (do sai VLAN trên Switch, đứt thông kết nối Layer 2 về Router, DHCP Server bị tắt hoặc hết sạch IP trong Pool).",
        "Để săn lùng Rogue DHCP Server (cục Wifi cắm nhầm) trên Windows: gõ `ipconfig /all` tìm dòng **DHCP Server** xem IP của kẻ cấp láo là bao nhiêu, rồi dùng `arp -a` lấy địa chỉ MAC của nó để tra trên Switch/MikroTik."
      ]
    },
    level3_practice: {
      scenario: "Sáng thứ Hai đầu tuần, hàng loạt nhân viên ở tầng 2 báo mất mạng. Một số máy hiện IP `169.254.88.12`, một số máy khác lại nhận IP lạ `192.168.0.105` (trong khi mạng công ty là `192.168.20.0/24`). Cậu cần kiểm tra, chẩn đoán bằng bằng chứng kỹ thuật và cấu hình bảo vệ trên MikroTik.",
      steps: [
        {
          title: "Bước 1: Chẩn đoán trên máy trạm Windows và tìm thủ phạm bằng ipconfig /all & arp -a",
          instruction: "Trên máy bị nhận IP lạ `192.168.0.105`, mở CMD chạy `ipconfig /all` để xem ai là người đã cấp cái IP đó (trường `DHCP Server`), sau đó tìm địa chỉ MAC của thiết bị phát DHCP láo đó.",
          commandOrConfig: `C:\\> ipconfig /all
   IPv4 Address. . . . . . . . . . . : 192.168.0.105(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.0.1
   DHCP Server . . . . . . . . . . . : 192.168.0.1   <-- THỦ PHẠM ĐÂY RỒI!

C:\\> ping 192.168.0.1 -n 1
C:\\> arp -a
  Interface: 192.168.0.105 --- 0x6
  Internet Address      Physical Address      Type
  192.168.0.1           f4-f2-6d-aa-bb-cc     dynamic  <-- MAC CỦA CỤC WIFI CẮM NHẦM (TP-Link)`,
          explanation: "Bằng chứng không thể chối cãi! Dòng `DHCP Server: 192.168.0.1` kèm MAC `F4:F2:6D:AA:BB:CC` (OUI của TP-Link) chứng tỏ có nhân viên tự mang cục Router Wifi ở nhà lên cắm dây mạng công ty vào cổng LAN của cục TP-Link. Có được MAC này rồi, cậu chỉ cần lên Switch hoặc MikroTik (`/interface bridge host print where mac-address=F4:F2:6D:AA:BB:CC`) là biết chính xác nó đang cắm ở cổng số mấy để ra rút dây!"
        },
        {
          title: "Bước 2: Cấu hình DHCP Alert và DHCP Snooping trên MikroTik để tự động chặn Rogue DHCP",
          instruction: "Trên MikroTik, bật tính năng `DHCP Alert` để cảnh báo ngay vào Log khi có thiết bị phát DHCP láo, đồng thời bật `DHCP Snooping` trên Bridge và chỉ tin cậy (Trusted) cổng Uplink.",
          commandOrConfig: `# 1. Bật cảnh báo phát hiện Rogue DHCP Server trong mạng LAN
/ip dhcp-server alert
add interface=vlan20-staff valid-server=AA:AA:AA:11:22:33 disabled=no \\
    on-alert=":log warning \\"PHAT HIEN ROGUE DHCP TREN VLAN 20!\\""

# 2. Nếu MikroTik đóng vai trò Switch trung tâm, bật DHCP Snooping trên Bridge:
/interface bridge
set bridge-lan dhcp-snooping=yes

# Chỉ đánh dấu cổng nối lên DHCP Server chính là trusted=yes, các cổng xuống phòng ban để trusted=no
/interface bridge port
set [find interface=ether2] trusted=no
set [find interface=ether3] trusted=no`,
          explanation: "Khi `dhcp-snooping=yes` được bật trên Bridge/Switch, bất kỳ gói tin `DHCP Offer` hoặc `DHCP ACK` nào đi vào từ cổng có `trusted=no` sẽ bị Switch hủy bỏ ngay tại cổng, bảo vệ tuyệt đối các máy trạm trong mạng."
        },
        {
          title: "Bước 3: Xử lý lỗi máy nhận 169.254.x.x do đầy Pool DHCP hoặc sai cấu hình DHCP Network",
          instruction: "Kiểm tra trạng thái cấp phát DHCP trên MikroTik bằng `/ip dhcp-server lease print`, kiểm tra Pool còn trống không và làm mới IP trên máy trạm.",
          commandOrConfig: `# Trên MikroTik: Kiểm tra xem Pool còn IP trống không và có nhiều lease bị kẹt ở trạng thái 'offered' không
/ip pool used print
/ip dhcp-server lease print where status!="bound"

# Kiểm tra mục DHCP Networks xem đã khai báo đúng Gateway và DNS cho dải mạng chưa
/ip dhcp-server network print

# Trên máy tính Windows: Thu hồi IP cũ và kích hoạt lại tiến trình DORA mới + xóa cache DNS
C:\\> ipconfig /release
C:\\> ipconfig /renew
C:\\> ipconfig /flushdns`,
          explanation: "• Lệnh `ipconfig /release` gửi bản tin `DHCP Release` trả lại IP cũ và đưa máy về `0.0.0.0`.\n• Lệnh `ipconfig /renew` ép máy thực hiện lại từ đầu 4 bước `Discover -> Offer -> Request -> Ack`.\n• Lưu ý trên MikroTik: Rất nhiều bạn tạo `/ip dhcp-server` nhưng quên khai báo hoặc gõ sai trong `/ip dhcp-server network`, khiến máy trạm nhận được mỗi IP và Mask mà bị trống Gateway/DNS!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Máy tính cắm dây mạng đèn vẫn sáng xanh, nhưng hiện biểu tượng quả địa cầu 'No Internet', gõ `ipconfig` thấy `Autoconfiguration IPv4 Address: 169.254.45.120` và `Default Gateway` trống trơn.",
          hypothesis: "Máy trạm gửi `DHCP Discover` nhưng không nhận được `DHCP Offer` (do cổng Switch cấu hình sai PVID/VLAN, đứt cáp Uplink từ Switch về Router, dịch vụ DHCP Server bị tắt hoặc hết sạch IP trong Pool).",
          testCommand: "Đặt thử IP tĩnh đúng dải mạng (VD: `192.168.20.222/24`, GW `192.168.20.1`) rồi `ping 192.168.20.1`.",
          fix: "• Nếu đặt IP tĩnh mà **KHÔNG ping được Gateway** -> Lỗi nằm ở Layer 1/Layer 2 (sai VLAN/PVID trên cổng Switch hoặc mất kết nối từ Switch về Router).\n• Nếu đặt IP tĩnh mà **ping thông Gateway và vào mạng bình thường** -> Đường truyền Layer 2 tốt 100%, lỗi nằm ở dịch vụ DHCP Server trên Router (hết IP trong `/ip pool`, DHCP Server bị disabled, hoặc Bridge quên thêm `bridge` vào `tagged` của VLAN)."
        },
        {
          symptom: "Trên MikroTik (`IP -> DHCP Server -> Leases`), địa chỉ IP cứ hiện trạng thái `offered` vài giây rồi biến mất lặp đi lặp lại, kèm theo dòng log: `dhcp2 offering lease 192.168.20.50 for xx:xx:xx:xx:xx:xx without success`.",
          hypothesis: "MikroTik đã nhận được `Discover` và gửi trả `Offer`, nhưng máy trạm không nhận được gói `Offer` đó hoặc gói `Request` không quay lại được (thường gặp trên sóng Wifi yếu, tính năng Client Isolation/Multicast Helper trên AP chặn gói Broadcast chiều về, hoặc do VLAN Tagging bị lệch 1 chiều: Ingress đúng PVID nhưng Egress sai Tagged/Untagged).",
          testCommand: "/ip bridge vlan print detail (kiểm tra cả cột tagged và untagged của cổng đó).",
          fix: "Kiểm tra lại cấu hình Tagged/Untagged tại cổng Switch/Bridge (đảm bảo chiều đi ra khỏi Switch về Client đã được đặt đúng Untagged cho cổng Access hoặc Tagged cho cổng Trunk AP); trên Wifi MikroTik/UniFi kiểm tra tính năng DHCP Broadcast/Multicast enhancement."
        },
        {
          symptom: "Admin vừa đổi IP của máy chủ nội bộ `fileserver.congty.local` từ `192.168.10.50` sang `192.168.10.99` trong mục `/ip dns static` của MikroTik. Tuy nhiên một số máy nhân viên khi ping `fileserver.congty.local` vẫn ra IP cũ `.10.50`.",
          hypothesis: "Máy tính nhân viên vẫn đang lưu kết quả phân giải cũ trong bộ nhớ đệm DNS Cache của Windows (vì TTL của bản ghi chưa hết hạn) hoặc bị gán cứng trong file `hosts`.",
          testCommand: "ipconfig /displaydns | findstr /i \"fileserver\" && type C:\\Windows\\System32\\drivers\\etc\\hosts",
          fix: "Chạy lệnh `ipconfig /flushdns` trên máy trạm để xóa sạch bộ nhớ đệm DNS (và xóa dòng gán cứng trong file `hosts` nếu có), sau đó kiểm tra lại bằng `ping fileserver.congty.local`."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Trong tiến trình 4 bước DORA của DHCP (Discover - Offer - Request - Acknowledge), ở Bước 2 (Offer) máy trạm đã biết địa chỉ IP và MAC của DHCP Server rồi, vậy tại sao sang Bước 3 (DHCP Request) máy trạm vẫn phát bản tin dưới dạng Broadcast (255.255.255.255) mà không gửi Unicast trực tiếp cho Server đó?",
          wrongAnswer: "Tại bước 3 máy trạm gửi Unicast thẳng cho DHCP Server chứ không phải Broadcast, chỉ có bước 1 Discover mới là Broadcast thôi ạ.",
          rightAnswer: "Ở lần xin cấp IP mới đầu tiên, bản tin **Bước 3 (DHCP Request) BẮT BUỘC phải là Broadcast** (`Src IP: 0.0.0.0 -> Dst IP: 255.255.255.255`) vì 2 lý do kỹ thuật rất quan trọng:\n1) **Cơ chế 'Một mũi tên trúng hai đích' trong môi trường có nhiều DHCP Server**: Khi Client phát `Discover` ở bước 1, có thể có 2 hoặc 3 DHCP Server (chạy dự phòng Failover) cùng gửi lời mời `Offer` tới Client ở bước 2. Ở bước 3, Client chỉ chọn 1 Server (ghi rõ IP của Server được chọn vào trường *Option 54 - Server Identifier*) và hét lên bằng **Broadcast** để: Server được chọn biết mà chuẩn bị chốt sổ (`ACK`), ĐỒNG THỜI các DHCP Server còn lại cũng nghe thấy để biết mình không được chọn và giải phóng địa chỉ IP đã tạm giữ đó cho máy khác thuê.\n2) **Bản thân Client chưa được phép dùng IP mới**: Trước khi nhận được bản tin chốt sổ `DHCP ACK` ở bước 4, Client vẫn chưa chính thức sở hữu địa chỉ IP đó (Src IP của nó vẫn là `0.0.0.0`). Chỉ khi nào gia hạn IP (Renewal ở mốc 50% Lease Time), khi Client đã có IP hợp lệ rồi thì `DHCP Request` mới gửi bằng Unicast!",
          keyPoints: [
            "Thông báo đồng thời cho tất cả các DHCP Server trong mạng (ai được chọn qua Option 54, ai không được chọn thì thu hồi IP đã Offer)",
            "Tại bước 3, Client chưa nhận được ACK nên chưa chính thức sở hữu IP (Src IP vẫn là 0.0.0.0)",
            "Chỉ khi gia hạn ở mốc 50% Lease Time (T1) thì DHCP Request mới là Unicast"
          ]
        },
        {
          question: "Khi một máy tính Windows hiện địa chỉ IP là `169.254.x.x` (Mask `255.255.0.0`), con số này từ đâu mà ra? Bạn hãy nêu quy trình dùng bằng chứng cụ thể để xác định lỗi này là do cấu hình sai VLAN trên Switch hay do dịch vụ DHCP Server trên Router bị lỗi?",
          wrongAnswer: "Số 169.254.x.x là IP lỗi do nhà mạng hoặc Router cấp sai. Để sửa thì em khởi động lại Router hoặc rút dây mạng cắm lại.",
          rightAnswer: "1) **Bản chất con số `169.254.x.x`**: Không phải do Router cấp sai, mà là địa chỉ **APIPA (Automatic Private IP Addressing)** do chính hệ điều hành Windows tự sinh ra khi card mạng đang để chế độ DHCP nhưng gửi bản tin `DHCP Discover` đi mà không nhận được bất kỳ phản hồi `DHCP Offer` nào.\n2) **Cách dùng bằng chứng thực nghiệm để tách lỗi Layer 2 (VLAN/Switch) với lỗi Dịch vụ DHCP**:\n- **Phép thử**: Tôi đặt tạm một địa chỉ IP tĩnh hợp lệ của VLAN đó lên máy tính (VD: `192.168.20.222/24`, Gateway `192.168.20.1`) rồi thực hiện lệnh `ping 192.168.20.1`.\n- **Kết quả 1**: Nếu đặt IP tĩnh mà **ping thông Gateway ngay lập tức** -> Chứng tỏ dây cáp, cổng Switch, PVID và đường Trunk VLAN về tới Router hoàn toàn ĐÚNG (Layer 2 thông suốt). Lỗi 100% nằm ở dịch vụ DHCP Server trên Router (hết IP trong Pool, DHCP Server bị tắt hoặc lỗi cấu hình).\n- **Kết quả 2**: Nếu đặt IP tĩnh đúng dải mà **vẫn không ping được Gateway** (và `arp -a` không thấy MAC của Gateway) -> Chứng tỏ đường truyền Layer 2 từ máy đó về giao diện VLAN trên Router đang bị đứt hoặc cổng Switch đang đặt sai VLAN/PVID.",
          keyPoints: [
            "169.254.x.x (APIPA) do Windows tự sinh khi không nhận được DHCP Offer",
            "Phép thử cô lập nhanh nhất: Đặt IP tĩnh cùng subnet rồi ping Default Gateway",
            "Ping Gateway thông = Lỗi dịch vụ DHCP/cạn Pool; Ping Gateway không thông = Lỗi Layer 2/sai VLAN trên Switch"
          ]
        }
      ],
      quizzes: [
        {
          question: "Giao thức DHCP hoạt động ở tầng Transport với giao thức nào và cặp cổng (Port) nào?",
          options: [
            "TCP Port 80 và TCP Port 443",
            "UDP Port 53",
            "UDP Port 67 (Server) và UDP Port 68 (Client)",
            "TCP Port 20 và TCP Port 21"
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. DHCP sử dụng giao thức UDP với Port 67 dành cho DHCP Server và Port 68 dành cho DHCP Client. (Còn UDP/TCP Port 53 là của dịch vụ DNS)."
        },
        {
          question: "Một máy trạm được DHCP Server cấp địa chỉ IP với thời hạn thuê (Lease Time) là **8 giờ**. Nếu máy trạm vẫn bật liên tục, vào thời điểm nào máy trạm sẽ bắt đầu gửi bản tin đầu tiên để xin gia hạn địa chỉ IP đó?",
          options: [
            "Đúng vào lúc hết sạch 8 giờ (100% Lease Time).",
            "Sau 4 giờ sử dụng (tương ứng 50% Lease Time - mốc T1).",
            "Cứ mỗi 5 phút một lần.",
            "Không bao giờ tự gia hạn, phải đợi khởi động lại máy."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Theo chuẩn DHCP, tại mốc T1 = 50% Lease Time (ở đây là 4 giờ), DHCP Client sẽ chủ động gửi bản tin Unicast `DHCP Request` trực tiếp tới DHCP Server đã cấp IP cho nó để xin gia hạn sớm, đảm bảo kết nối mạng không bị gián đoạn."
        },
        {
          question: "Khi người dùng gõ tên miền `intranet.company.local` vào trình duyệt trên máy tính Windows, nơi ĐẦU TIÊN hệ điều hành kiểm tra để lấy địa chỉ IP trước khi gửi gói tin ra card mạng hỏi DNS Server là đâu?",
          options: [
            "Gửi thẳng gói tin ra Root DNS Server ngoài Internet.",
            "Kiểm tra bộ nhớ đệm DNS cục bộ (Local DNS Cache / File Hosts) trên chính máy tính đó.",
            "Hỏi Default Gateway qua giao thức ARP.",
            "Hỏi DHCP Server qua cổng UDP 67."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Để tiết kiệm thời gian và băng thông, hệ điều hành luôn kiểm tra bộ nhớ đệm DNS Cache (`ipconfig /displaydns`) và file `hosts` cục bộ trên máy trước. Chỉ khi không tìm thấy trong bộ nhớ cục bộ, máy mới gửi truy vấn DNS (cổng 53) ra card mạng tới DNS Server."
        }
      ]
    }
  },

  // ==========================================================================
  // BÀI 05: VPN VÀ TRUY CẬP LAN TỪ XA
  // ==========================================================================
  {
    id: 5,
    code: "05",
    week: 1,
    title: "VPN & Truy cập LAN từ xa (Remote Access / Site-to-Site)",
    subtitle: "Phân biệt Tunnel, Route, Firewall/ACL và SMB: Tại sao VPN báo 'Connected' nhưng không ping được LAN hoặc không vào được File Server?",
    priority: "P1",
    duration: "75 phút",
    whyThisMatters: "Chắc chắn cậu đã từng gặp cảnh: Sếp đi công tác mở laptop bấm kết nối VPN (L2TP/IPsec, WireGuard, OpenVPN hay SSTP) về văn phòng, biểu tượng VPN đã báo **'Connected'** xanh lè, nhưng Sếp mở `\\\\192.168.10.50\\TaiLieu` hoặc phần mềm ERP thì báo lỗi không vào được! Khi phỏng vấn, câu hỏi: 'VPN đã Connected nhưng không truy cập được tài nguyên nội bộ, em kiểm tra những gì theo thứ tự nào?' sẽ bộc lộ ngay tư duy hệ thống của cậu: phân biệt rõ đường hầm (Tunnel) chỉ là cái ống, còn đi qua được cái ống đó tới đích hay không là chuyện của Routing, ARP Proxy, Firewall trên Router và Windows Firewall trên chính con Server đích!",
    analogy: {
      title: "Đường hầm Bí mật (Tunnel) nối từ Quán Cafe về Sảnh Công ty",
      content: "Hãy tưởng tượng Sếp đang ngồi ở quán Cafe (mạng ngoài Internet) và muốn lấy tài liệu trong phòng Server của Công ty:\n1) **Tunnel (Đường hầm VPN)**: Việc bấm nút VPN báo 'Connected' mới chỉ tương đương với việc **xây xong một đường hầm ngầm nối từ gầm bàn quán Cafe tới cửa sảnh của Router Công ty** (và phát cho Sếp 1 tấm thẻ khách có IP VPN là `10.10.99.2`).\n2) **Route trên máy Sếp (Split Tunnel vs Full Tunnel)**: Ngồi ở quán Cafe, làm sao Sếp biết khi nào thì đi ra cửa quán Cafe (lướt Youtube), khi nào thì chui xuống đường hầm về Công ty (vào mạng `192.168.10.0/24`)? Nếu trên máy Sếp thiếu biển chỉ dẫn (Route) bảo rằng: 'Muốn đến `192.168.10.0/24` thì phải chui xuống hầm `10.10.99.1`', Sếp sẽ đi nhầm ra cửa quán Cafe và lạc đường!\n3) **Firewall của Công ty (`chain=forward`)**: Chui hết đường hầm lên tới sảnh Router Công ty rồi, nhưng bác bảo vệ Router nhìn thấy Sếp đeo thẻ `10.10.99.2` (khác với thẻ nhân viên tại chỗ `192.168.20.x`) liền chặn lại không cho đi sang phòng Server `192.168.10.50`.\n4) **Windows Firewall trên chính con File Server (Cái bẫy kinh điển nhất!)**: Ngay cả khi Router cho qua rồi, gói tin đến tận cửa máy File Server Windows (`192.168.10.50`), nhưng tường lửa mặc định của Windows (**Windows Defender Firewall**) có một quy tắc ngầm cực gắt: *'Tôi chỉ cho phép chia sẻ file (SMB Port 445) và Ping từ các máy CÙNG SUBNET (`192.168.10.x`), còn ông đến từ dải VPN `10.10.99.2` là KHÁC SUBNET nên tôi chặn!'*."
    },
    level1_definitions: {
      concepts: [
        {
          term: "VPN Tunnel (Đường hầm mạng riêng ảo) & Encapsulation",
          shortDef: "Là kết nối ảo được mã hóa thiết lập qua môi trường Internet công cộng bằng cách bọc gói tin IP nội bộ (Inner Packet) bên trong một gói tin IP bên ngoài (Outer Packet) để truyền giữa VPN Client và VPN Server.",
          easyExplain: "Khi VPN báo **Connected**, điều đó CHỈ có nghĩa là: Bước xác thực tài khoản/mật khẩu/chứng chỉ (Authentication) đã thành công, đường hầm ảo (Interface VPN) đã được dựng lên và máy Client đã nhận được 1 địa chỉ IP trên đường hầm đó (VD: Client nhận `10.10.99.2`, đầu bên kia của Router là `10.10.99.1`). Nó hoàn toàn CHƯA đảm bảo là cậu đã có đường đi (Route) hay quyền truy cập (Firewall) vào mạng LAN phía sau Router!",
          realExample: "WireGuard, OpenVPN, L2TP/IPsec, SSTP trên MikroTik tạo ra một giao diện ảo với IP Tunnel riêng biệt như `10.10.99.0/24`."
        },
        {
          term: "Full Tunnel vs Split Tunneling (Định tuyến qua VPN)",
          shortDef: "Full Tunnel đẩy toàn bộ 100% lưu lượng mạng của máy trạm (bao gồm cả lướt web Internet) đi qua đường hầm VPN về công ty; còn Split Tunneling chỉ đẩy lưu lượng nhắm tới các dải mạng nội bộ của công ty đi qua VPN, phần Internet còn lại đi trực tiếp qua mạng tại nhà/quán cafe.",
          easyExplain: "• Khi bật **Full Tunnel** (trên Windows VPN là tích chọn *'Use default gateway on remote network'*): Mọi thứ cậu truy cập đều chui về công ty -> An toàn và không lo thiếu route vào LAN, nhưng làm chậm tốc độ xem Youtube/họp Zoom của cậu và tốn băng thông cổng WAN của công ty.\n• Khi dùng **Split Tunneling** (bỏ tích *Use default gateway on remote network*): Mạng Internet rất nhanh, NHƯNG bắt buộc phải thêm các tuyến đường cụ thể (Static Route / Classless Static Route / AllowedIPs trên WireGuard) chỉ định rõ dải mạng công ty `192.168.10.0/24` đi qua VPN. Nếu quên bước này, VPN dù Connected nhưng không thể ping được LAN!",
          realExample: "Trên WireGuard Client: cấu hình `AllowedIPs = 0.0.0.0/0` là Full Tunnel; còn cấu hình `AllowedIPs = 10.10.99.0/24, 192.168.10.0/24, 192.168.20.0/24` là Split Tunneling."
        },
        {
          term: "Proxy ARP (Khi cấp IP VPN trùng dải với mạng LAN nội bộ)",
          shortDef: "Là kỹ thuật mà Router đứng ra trả lời bản tin ARP thay cho máy VPN từ xa khi người quản trị cấp cho VPN Client địa chỉ IP nằm CÙNG SUBNET với mạng LAN văn phòng.",
          easyExplain: "Đây là lỗi rất hay gặp khi cấu hình L2TP/PPTP/SSTP trên MikroTik! Nhiều bạn thay vì tạo một dải IP riêng cho VPN (`10.10.99.0/24`), lại lấy luôn IP trong dải LAN văn phòng (`192.168.10.200`) cấp cho VPN Client. Lúc này, máy Server trong văn phòng (`192.168.10.50`) nhìn thấy IP `.10.200` thì tưởng người đó đang ngồi ngay cùng phòng Switch Layer 2 với mình, nên nó phát ARP Broadcast hỏi MAC của `.10.200` chứ không gửi qua Gateway! Vì người kia đang ở tận quán Cafe qua đường hầm Layer 3 nên không nghe thấy ARP. Muốn chạy được kiểu này, trên `bridge-lan` của MikroTik bắt buộc phải bật `arp=proxy-arp` (hoặc tốt nhất là tách hẳn VPN ra một Subnet riêng `10.10.99.0/24` để định tuyến Layer 3 chuẩn chỉnh!).",
          realExample: "Khuyên dùng chuẩn Senior: Luôn cấp cho VPN một dải Subnet độc lập (VD: `10.10.99.0/24`) khác với các VLAN nội bộ để tránh phải phụ thuộc vào `proxy-arp`."
        },
        {
          term: "SMB (Server Message Block - TCP Port 445) & Host Firewall Scope",
          shortDef: "SMB là giao thức chia sẻ file và máy in trong mạng Windows (chạy trên cổng TCP 445); mặc định tường lửa Windows Defender Firewall chỉ cho phép kết nối SMB và ICMP (Ping) từ các máy trong cùng Local Subnet.",
          easyExplain: "Tại sao từ VPN (`10.10.99.2`) cậu ping được IP Gateway của LAN (`192.168.10.1`), thậm chí truy cập được giao diện Web của máy in (`192.168.10.200:80`), nhưng cứ ping hoặc mở `\\\\192.168.10.50\\Share` trên máy tính/Server Windows là bị chặn? Bởi vì trong **Windows Defender Firewall with Advanced Security**, các rule *'File and Printer Sharing (SMB-In)'* và *'Echo Request - ICMPv4-In'* ở cấu hình Private/Domain đôi khi bị giới hạn mục **Scope -> Remote IP Address = Local subnet only**! Vì gói tin VPN đến từ IP nguồn `10.10.99.2` (khác subnet `192.168.10.0/24`), chính con Windows Server đã từ chối gói tin!",
          realExample: "Cách xử lý: Mở rule SMB-In (TCP 445) trên Windows Firewall của File Server, thêm dải VPN `10.10.99.0/24` vào mục Scope -> Remote IP Address (hoặc dùng tên miền khi thiếu DNS Suffix)."
        }
      ],
      comparisonTable: {
        title: "Bảng phân tích 5 tầng nguyên nhân khi 'VPN Connected nhưng không vào được File Server'",
        headers: ["Tầng kiểm tra", "Câu hỏi chẩn đoán", "Lệnh / Công cụ kiểm chứng", "Nguyên nhân nếu thất bại tại bước này"],
        rows: [
          [
            "1. Tunnel IP",
            "Đã thông tới đầu bên kia của ống hầm (Router) chưa?",
            "`ping 10.10.99.1` (IP Tunnel của Router MikroTik)",
            "Cấu hình sai khóa mã hóa (WireGuard Peer), sai IP Tunnel hoặc Firewall `chain=input` trên Router chặn."
          ],
          [
            "2. Client Routing",
            "Máy trạm VPN có đẩy gói tin `192.168.10.x` vào hầm VPN không?",
            "`route print -4` và `tracert -d 192.168.10.50`",
            "Bị trùng dải IP Wifi quán cafe với mạng công ty (cùng là `192.168.1.0/24`), hoặc Split Tunnel thiếu route về LAN."
          ],
          [
            "3. Router Firewall / ARP",
            "Router MikroTik có cho phép đi từ hầm VPN sang VLAN 10 không?",
            "Kiểm tra `/ip firewall filter` (`chain=forward`) trên MikroTik",
            "Rule Firewall trên MikroTik đang chặn lưu lượng từ interface VPN sang VLAN 10, hoặc cấp IP chung dải LAN mà thiếu `proxy-arp`."
          ],
          [
            "4. Server Gateway & Host Firewall",
            "Con File Server `.10.50` có đường trả về và có mở cổng TCP 445 cho dải VPN không?",
            "`Test-NetConnection 192.168.10.50 -Port 445` (PowerShell)",
            "**Windows Firewall trên File Server** chỉ mở SMB (Port 445) cho `Local subnet`, chặn các IP khác subnet như dải VPN!"
          ],
          [
            "5. DNS & SMB Auth",
            "Truy cập bằng `\\\\192.168.10.50` được nhưng `\\\\FILESERVER` bị lỗi?",
            "`nslookup fileserver` và `net use`",
            "VPN Client chưa được cấp DNS nội bộ + DNS Suffix của công ty, hoặc lỗi xác thực tài khoản NTLM/Kerberos."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Nguyên lý cốt lõi khi xử lý sự cố VPN: <b>'VPN Connected' mới chỉ là thông kết nối điểm-nối-điểm (Point-to-Point) giữa máy Client và con Router</b>. Để gói tin đi từ Laptop qua VPN vào tới ứng dụng File Server nội bộ (`\\\\192.168.10.50\\Share`), nó phải vượt qua thêm 4 cửa ải: <b>(1) Bảng định tuyến trên Laptop -> (2) Firewall Forward trên Router -> (3) Default Gateway & Windows Firewall trên Server -> (4) Dịch vụ SMB Port 445 & Phân quyền</b>. Ngoài ra, tuyệt đối không bao giờ quy hoạch mạng LAN công ty dùng dải `192.168.1.0/24` hoặc `192.168.0.0/24` vì sẽ đụng độ (Overlap Subnet) với mạng Wifi ở nhà nhân viên hoặc quán Cafe!",
      flowTitle: "Hành trình gói tin SMB (Port 445) từ Laptop VPN ngoài quán Cafe vào File Server văn phòng",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Kiểm tra bảng Route trên Laptop để quyết định đẩy gói tin vào card VPN",
          detail: "Laptop đang kết nối Wifi quán Cafe (`192.168.1.15/24`) và đã kết nối VPN nhận IP ảo `10.10.99.2`. Khi người dùng mở `\\\\192.168.10.50\\Data`, Windows tra bảng `route print`. Nhờ có tuyến `192.168.10.0/24 -> Gateway 10.10.99.1` (qua card VPN), Windows đẩy gói tin TCP Port 445 vào giao diện VPN.",
          packetOrState: "Inner Packet (Gói bên trong hầm): Src IP = 10.10.99.2 -> Dst IP = 192.168.10.50:445"
        },
        {
          step: "Bước 2",
          title: "Đóng gói mã hóa (Encapsulation) và gửi qua Internet về IP Public của Công ty",
          detail: "Phần mềm VPN bọc gói tin nội bộ ở Bước 1 lại, mã hóa và đóng thêm một lớp vỏ IP bên ngoài từ IP Wifi quán Cafe gửi tới IP Public WAN của Router MikroTik công ty (VD: UDP Port 13231 của WireGuard hoặc UDP 500/4500 của IPsec).",
          packetOrState: "Outer Packet (Chạy ngoài Internet): Src = [IP Public Cafe] -> Dst = [IP Public Công ty]:13231"
        },
        {
          step: "Bước 3",
          title: "Router MikroTik giải mã (Decapsulation), định tuyến và kiểm duyệt tại Chain FORWARD",
          detail: "Router MikroTik nhận gói tin tại cổng WAN (`chain=input` cho phép cổng VPN), bóc lớp vỏ mã hóa bên ngoài ra, thu lại gói tin gốc `Src: 10.10.99.2 -> Dst: 192.168.10.50:445`. Lúc này gói tin đi từ giao diện VPN sang giao diện `vlan10-mgmt`, đi qua **Firewall Chain = FORWARD** trên MikroTik.",
          packetOrState: "MikroTik Forward: In-Interface = vpn-interface (10.10.99.2) -> Out-Interface = vlan10 (192.168.10.50)"
        },
        {
          step: "Bước 4",
          title: "File Server kiểm tra Windows Firewall (Port 445) và gửi phản hồi ngược về",
          detail: "File Server (`192.168.10.50`) nhận gói tin từ `10.10.99.2`. Nếu Windows Firewall trên Server cho phép dải `10.10.99.0/24` kết nối vào TCP Port 445, Server sẽ xử lý yêu cầu SMB và gửi gói trả lời (`Src: .10.50 -> Dst: 10.10.99.2`) về lại Default Gateway `192.168.10.1` để MikroTik đóng hầm gửi trả về Laptop.",
          packetOrState: "Return Packet: Src IP = 192.168.10.50:445 -> Dst IP = 10.10.99.2 (qua GW 192.168.10.1)"
        }
      ],
      asciiDiagram: `
 [Laptop tại Quán Cafe]                    (Internet)                [Router MikroTik Công ty]             [File Server]
 Wifi IP: 192.168.1.15/24                                            WAN : 113.160.22.33                   IP : 192.168.10.50/24
 VPN IP : 10.10.99.2/24  ================ [HẦM VPN] ================> VPN : 10.10.99.1/24                   GW : 192.168.10.1
            |                (Outer: Cafe_WAN -> 113.160.22.33)       LAN : 192.168.10.1/24                 Port: TCP 445 (SMB)
            |                 (Inner: 10.10.99.2 -> .10.50:445)                 |                                  |
            |                                                                   |--- [Chain: FORWARD] ------------>|
            |                                                                   | Src: 10.10.99.2 -> Dst: .10.50   |
            |                                                                   |                                  |
       [Cửa ải 1]                                                          [Cửa ải 2]                         [Cửa ải 3 & 4]
  - Route 192.168.10.0/24                                            - Firewall Forward                 - Server có GW .10.1?
    có đi vào hầm VPN?                                                 cho phép VPN -> VLAN 10?         - Windows Firewall có mở
  - Có bị trùng Subnet                                                                                    TCP 445 cho 10.10.99.x?
    Wifi quán cafe không?`,
      keyTakeaways: [
        "VPN Connected chỉ chứng minh bước xác thực và tạo ống hầm thành công; muốn vào LAN phải kiểm tra tuần tự: Tunnel IP -> Client Route -> Router Firewall Forward -> Server Gateway & Windows Firewall -> SMB Port 445.",
        "Lỗi kinh điển số 1: Mạng LAN công ty đặt là `192.168.1.0/24` trùng khít với mạng Wifi ở nhà nhân viên/quán cafe. Khi nhân viên gõ `192.168.1.50`, máy tính tìm ngay trong quán cafe (On-link) chứ không đẩy vào hầm VPN!",
        "Lỗi kinh điển số 2: Ping thông hoặc vào Web nội bộ được, nhưng không ping/không vào SMB (`\\\\IP\\Share`) trên máy Windows được -> Do **Windows Defender Firewall** trên máy đích chặn kết nối khác Subnet (chỉ mở cho `Local subnet`).",
        "Lỗi kinh điển số 3: Cấp IP cho VPN Client trùng dải với mạng LAN nội bộ nhưng quên bật `arp=proxy-arp` trên Bridge của MikroTik."
      ]
    },
    level3_practice: {
      scenario: "Nhân viên làm việc tại nhà kết nối VPN về công ty (nhận IP VPN là `10.10.99.2`, Gateway VPN trên MikroTik là `10.10.99.1`). Nhân viên báo: 'Em kết nối VPN báo Connected rồi nhưng không vào được ổ mạng chung `\\\\192.168.10.50\\Share`!'. Hãy thực hiện quy trình chẩn đoán từng bước bằng lệnh thực tế.",
      steps: [
        {
          title: "Bước 1: Kiểm tra trên máy VPN Client (IP, Bảng Route, Tracert và Test Port 445)",
          instruction: "Mở PowerShell hoặc CMD trên máy nhân viên đang kết nối VPN, kiểm tra xem gói tin đi tới `192.168.10.50` có thực sự đi vào đường hầm `10.10.99.1` không và kiểm tra cổng TCP 445.",
          commandOrConfig: `# 1. Ping đầu bên kia của đường hầm VPN trên Router MikroTik:
PS C:\\> ping 10.10.99.1

# 2. Kiểm tra đường đi của gói tin tới File Server (xem hop đầu tiên có phải là 10.10.99.1 không):
PS C:\\> tracert -d 192.168.10.50

# 3. Nếu đang dùng Split Tunnel mà thiếu route về mạng 192.168.10.0/24, thêm route vào VPN:
PS C:\\> Add-VpnConnectionRoute -ConnectionName "VPN_CongTy" -DestinationPrefix "192.168.10.0/24"

# 4. Kiểm tra kết nối thẳng tới cổng SMB (TCP 445) của File Server:
PS C:\\> Test-NetConnection -ComputerName 192.168.10.50 -Port 445`,
          explanation: "• Nếu `tracert -d 192.168.10.50` nhảy hop đầu tiên ra `192.168.1.1` (Modem nhà mạng ở nhà) thay vì `10.10.99.1` -> Máy nhân viên đang dùng Split Tunnel nhưng thiếu route đẩy dải `192.168.10.0/24` vào hầm VPN!\n• Nếu `tracert` đã đi qua `10.10.99.1` nhưng `Test-NetConnection -Port 445` báo `TcpTestSucceeded : False` -> Bị chặn ở Firewall MikroTik hoặc Windows Firewall trên File Server."
        },
        {
          title: "Bước 2: Kiểm tra và mở quyền trên Router MikroTik (Firewall Forward & Proxy-ARP)",
          instruction: "Đăng nhập WinBox vào Router MikroTik, kiểm tra xem có rule Firewall `chain=forward` nào chặn dải VPN `10.10.99.0/24` đi sang `192.168.10.0/24` không.",
          commandOrConfig: `# Cho phép dải VPN (10.10.99.0/24) truy cập vào mạng Server VLAN 10 (192.168.10.0/24)
# Lưu ý: Đặt rule này TRÊN các rule Drop trong chain=forward!
/ip firewall filter
add chain=forward src-address=10.10.99.0/24 dst-address=192.168.10.0/24 \\
    action=accept place-before=1 comment="Allow VPN to VLAN 10 Server"

# (Tùy chọn) Nếu lỡ cấp IP VPN trùng dải với VLAN 10 (192.168.10.x), phải bật proxy-arp:
/interface vlan set vlan10-mgmt arp=proxy-arp`,
          explanation: "Khi thêm rule `accept` cho dải VPN vào `chain=forward`, hãy luôn kiểm tra thứ tự rule trên WinBox (kéo nó lên nằm trên các rule `drop all` cuối bảng). Nhờ có sẵn rule `accept established,related` ở đầu bảng, chiều phản hồi từ Server về VPN sẽ tự động được cho qua."
        },
        {
          title: "Bước 3: Mở Scope cho dải VPN trên Windows Defender Firewall của File Server",
          instruction: "Nếu trên MikroTik gói tin đã đi qua (counter tăng) mà máy VPN vẫn không vào được `\\\\192.168.10.50\\Share`, hãy lên chính con File Server mở cổng TCP 445 (SMB-In) và ICMPv4 (Ping) cho phép truy cập từ các subnet khác (hoặc chỉ định dải VPN `10.10.99.0/24`).",
          commandOrConfig: `# Chạy PowerShell (Run as Administrator) trên File Server (192.168.10.50):

# 1. Xem cấu hình Scope hiện tại của rule SMB-In:
Get-NetFirewallRule -DisplayName "File and Printer Sharing (SMB-In)" | Get-NetFirewallAddressFilter

# 2. Cho phép cả dải LAN nội bộ và dải VPN (10.10.99.0/24) truy cập SMB (Port 445) & Ping:
Set-NetFirewallRule -DisplayName "File and Printer Sharing (SMB-In)" -RemoteAddress Any -Enabled True
Set-NetFirewallRule -DisplayName "File and Printer Sharing (Echo Request - ICMPv4-In)" -RemoteAddress Any -Enabled True`,
          explanation: "Đây chính là 'bí kíp nhà nghề' giúp cậu ghi điểm tuyệt đối! Rất nhiều quản trị viên loay hoay sửa nát con Router MikroTik cả buổi chiều mà không biết rằng thủ phạm chặn cổng 445 lại là `RemoteAddress = LocalSubnet` trong Windows Firewall của chính con máy chủ Windows!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Nhân viên ngồi ở nhà bật 4G phát từ điện thoại thì VPN vào công ty (`192.168.1.0/24`) làm việc bình thường. Nhưng hễ kết nối vào mạng Wifi cáp quang ở nhà (cũng có kết nối Internet tốt) thì VPN vẫn báo Connected nhưng mất toàn bộ kết nối tới các máy `192.168.1.x` của công ty.",
          hypothesis: "Trùng dải Subnet (Overlapping Subnets)! Modem Wifi ở nhà nhân viên cũng đang phát dải `192.168.1.0/24` trùng khít với dải mạng LAN của công ty. Trong bảng định tuyến Windows, tuyến `On-link` tại chỗ luôn được ưu tiên hơn nên gói tin không đi vào hầm VPN.",
          testCommand: "ipconfig /all && route print -4 (quan sát cả card Wifi lẫn card VPN cùng có mạng 192.168.1.0/24).",
          fix: "• Giải pháp chữa cháy ngay lập tức cho nhân viên: Đổi dải LAN trên Modem Wifi ở nhà sang dải khác (VD: `192.168.88.0/24`), hoặc thêm route cụ thể `/32` tới từng IP Server công ty (`route add 192.168.1.50 mask 255.255.255.255 10.10.99.1`).\n• Giải pháp căn cơ chuẩn Senior: Không bao giờ thiết kế mạng LAN công ty dùng dải mặc định `192.168.1.0/24` hay `192.168.0.0/24`; hãy quy hoạch mạng công ty sang các dải như `10.10.x.0/24` hoặc `172.16.x.0/24`."
        },
        {
          symptom: "Sau khi kết nối VPN L2TP/IPsec trên Windows 10/11 vào công ty, nhân viên truy cập được các phần mềm nội bộ của công ty rất tốt, nhưng lại mất hoàn toàn Internet (không vào được Google, Facebook, Zalo).",
          hypothesis: "Cấu hình VPN trên Windows mặc định đang bật **Full Tunnel** (*Use default gateway on remote network*), đẩy toàn bộ lưu lượng Internet của nhân viên về Router công ty, nhưng trên Router công ty lại chưa có rule NAT (`masquerade`) hoặc Firewall cho phép dải IP VPN (`10.10.99.0/24`) đi ra cổng WAN.",
          testCommand: "tracert -d 8.8.8.8 (trên máy nhân viên) và `/ip firewall nat print` (trên MikroTik).",
          fix: "• Cách 1 (Nếu muốn nhân viên đi Internet trực tiếp bằng mạng ở nhà - Split Tunnel): Vào *Network Connections -> Properties của kết nối VPN -> IPv4 -> Advanced -> Bỏ tích 'Use default gateway on remote network'* (kèm cấu hình route cho dải LAN công ty).\n• Cách 2 (Nếu muốn kiểm soát toàn bộ lưu lượng qua công ty - Full Tunnel): Trên MikroTik đảm bảo rule `masquerade` ra cổng WAN áp dụng cho cả dải `10.10.99.0/24` và Firewall `forward` cho phép VPN đi ra WAN."
        },
        {
          symptom: "Từ máy VPN (`10.10.99.2`) mở Run gõ bằng địa chỉ IP `\\\\192.168.10.50\\Share` thì vào được ngay, nhưng gõ bằng tên máy `\\\\FILESERVER\\Share` (như lúc ngồi ở văn phòng) thì báo lỗi không tìm thấy đường dẫn mạng.",
          hypothesis: "Khi ngồi ở văn phòng, các máy cùng Broadcast Domain có thể tự tìm tên ngắn (NetBIOS / LLMNR / mDNS) hoặc đã được DHCP cấp kèm DNS Suffix (`congty.local`). Khi qua VPN ở khác subnet, Broadcast không đi qua được và máy VPN đang dùng DNS ngoài Internet (8.8.8.8) nên không biết `FILESERVER` là ai.",
          testCommand: "nslookup fileserver && nslookup fileserver.congty.local",
          fix: "Trong cấu hình PPP Profile / VPN Server trên MikroTik, cấp địa chỉ **DNS Server** là IP của DNS nội bộ công ty (VD: `192.168.10.1`), đồng thời hướng dẫn người dùng truy cập bằng tên đầy đủ FQDN (`\\\\fileserver.congty.local\\Share`) hoặc cấu hình DNS Suffix trên card VPN."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Người dùng báo đã kết nối VPN thành công (trạng thái 'Connected') nhưng không thể truy cập vào thư mục chia sẻ `\\\\192.168.10.50\\Data` trên File Server của công ty. Bạn hãy trình bày quy trình từng bước để khoanh vùng và tìm ra nguyên nhân gốc rễ.",
          wrongAnswer: "Em sẽ bảo người dùng tắt VPN đi bật lại, tắt hết tường lửa hoặc cài lại phần mềm VPN khác như UltraViewer/AnyDesk để vào tạm.",
          rightAnswer: "Trạng thái 'VPN Connected' mới chỉ xác nhận đường hầm (Tunnel) từ máy trạm tới Router đã dựng xong. Để chẩn đoán nguyên nhân không vào được `\\\\192.168.10.50\\Data`, tôi sẽ kiểm tra tuần tự 5 bước từ dưới lên trên (Bottom-Up):\n1) **Kiểm tra IP Tunnel và kết nối tới đầu hầm Router**: Gõ `ipconfig` xem máy đã nhận đúng IP VPN (VD: `10.10.99.2`) chưa và `ping 10.10.99.1` (IP VPN của Router).\n2) **Kiểm tra Định tuyến (Routing) và xung đột Subnet trên máy Client**: Gõ `route print -4` và `tracert -d 192.168.10.50` để chắc chắn gói tin đi tới `192.168.10.x` được đẩy vào gateway VPN chứ không đi nhầm ra Wifi địa phương (đặc biệt lưu ý lỗi trùng dải mạng `192.168.1.0/24` ở quán cafe/nhà riêng hoặc thiếu route khi dùng Split Tunneling).\n3) **Kiểm tra Firewall/Routing trên Router công ty**: Kiểm tra trên MikroTik xem `chain=forward` có đang chặn lưu lượng từ dải VPN sang VLAN 10 không (hoặc nếu cấp IP VPN chung dải LAN thì đã bật `proxy-arp` chưa). Kiểm tra xem bản thân con File Server `.10.50` có trỏ đúng Default Gateway về Router để biết đường trả lời về dải VPN không.\n4) **Kiểm tra Windows Firewall và cổng SMB (TCP 445) trên File Server**: Dùng lệnh `Test-NetConnection 192.168.10.50 -Port 445`. Rất nhiều trường hợp Windows Defender Firewall trên Server chỉ mở cổng 445 cho `Local subnet`, nên nó chặn kết nối đến từ subnet VPN `10.10.99.0/24`.\n5) **Kiểm tra phân quyền SMB / Tài khoản xác thực**: Nếu cổng 445 đã thông (`TcpTestSucceeded: True`) mà vẫn không mở được thư mục, lúc đó mới kiểm tra quyền Share/NTFS và thông tin đăng nhập.",
          keyPoints: [
            "Bước 1 & 2 (Tại Client): Kiểm tra IP Tunnel, `route print`, `tracert -d` (phát hiện thiếu route Split Tunnel hoặc trùng Subnet Wifi)",
            "Bước 3 (Tại Router): Kiểm tra Firewall `chain=forward` giữa VPN và LAN (hoặc `proxy-arp` nếu chung subnet)",
            "Bước 4 & 5 (Tại Server): Kiểm tra Default Gateway của Server, Windows Firewall Scope cho Port 445 (SMB) và quyền truy cập"
          ]
        },
        {
          question: "Tại sao trong thiết kế mạng doanh nghiệp, các kỹ sư mạng giàu kinh nghiệm luôn khuyên KHÔNG NÊN đặt dải IP mạng LAN của công ty là `192.168.0.0/24` hoặc `192.168.1.0/24`?",
          wrongAnswer: "Vì hai dải đó bảo mật kém hơn hoặc chứa được ít máy tính hơn các dải 10.x.x.x.",
          rightAnswer: "Về mặt số lượng máy trên một `/24` hay tính năng bảo mật thì `192.168.1.0/24` hoàn toàn giống hệt `192.168.88.0/24` hay `10.10.20.0/24` (đều có 254 IP khả dụng). Tuy nhiên, lý do cốt lõi không nên dùng `.0.0/24` và `.1.0/24` cho mạng doanh nghiệp là để **tránh xung đột định tuyến (Overlapping Subnets) khi dùng VPN từ xa**:\nHầu hết các modem nhà mạng (Viettel, VNPT, FPT) tại nhà riêng của nhân viên, quán cafe, khách sạn đều dùng mặc định dải `192.168.1.0/24` hoặc `192.168.0.0/24`. Khi nhân viên ngồi ở nhà kết nối VPN về công ty mà cả hai bên cùng dùng chung dải `192.168.1.0/24`, máy tính của nhân viên sẽ ưu tiên tuyến `On-link` tại mạng Wifi nhà mình và không đẩy gói tin vào đường hầm VPN, gây lỗi mất kết nối tới các máy chủ nội bộ.",
          keyPoints: [
            "Tránh lỗi trùng lặp dải mạng (Overlapping Subnets) khi kết nối VPN Remote Access hoặc Site-to-Site",
            "Modem gia đình, quán cafe, khách sạn hầu hết mặc định dùng 192.168.0.0/24 và 192.168.1.0/24",
            "Khi trùng subnet, máy trạm ưu tiên mạng On-link tại chỗ thay vì đẩy gói tin vào hầm VPN"
          ]
        }
      ],
      quizzes: [
        {
          question: "Giao thức chia sẻ tệp tin trên Windows (SMB - khi truy cập đường dẫn `\\\\192.168.10.50\\Share`) sử dụng cổng (Port) tiêu chuẩn nào cần được mở trên Firewall?",
          options: [
            "TCP Port 3389",
            "TCP Port 445",
            "UDP Port 161",
            "TCP Port 22"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B (`TCP Port 445`). Còn TCP 3389 là Remote Desktop (RDP), UDP 161 là SNMP, và TCP 22 là SSH."
        },
        {
          question: "Khi kết nối VPN từ xa (IP VPN: `10.10.99.2`) về văn phòng, bạn dùng lệnh `Test-NetConnection 192.168.10.50 -Port 80` thấy báo `True` (vào được trang web trên Server đó), nhưng `Test-NetConnection 192.168.10.50 -Port 445` lại báo `False` (dù các máy ngồi tại văn phòng `192.168.10.x` vẫn vào SMB bình thường và Router không chặn gì cả). Nguyên nhân hợp lý nhất là gì?",
          options: [
            "Dây mạng cắm vào File Server bị đứt.",
            "File Server bị cấu hình sai Subnet Mask.",
            "Windows Defender Firewall trên File Server đang giới hạn rule SMB-In (Port 445) chỉ cho phép truy cập từ `Local subnet` (cùng dải 192.168.10.0/24).",
            "Máy VPN chưa cài trình duyệt web."
          ],
          correctIndex: 2,
          explanation: "Đáp án đúng là C. Việc truy cập thành công Port 80 từ VPN (`10.10.99.2` -> `192.168.10.50`) chứng tỏ đường hầm VPN, Routing hai chiều và Default Gateway của Server đều đã thông suốt hoàn toàn. Chỉ riêng Port 445 bị từ chối khi đi từ subnet khác tới (trong khi cùng subnet `.10.x` vẫn vào được) là dấu hiệu điển hình của việc Windows Firewall trên Server đang để Scope của rule SMB-In là `Local subnet`."
        },
        {
          question: "Chế độ cấu hình VPN nào cho phép chỉ những gói tin nhắm tới dải mạng nội bộ của công ty mới đi vào đường hầm VPN, còn các truy cập Internet thông thường (như YouTube, Google) vẫn đi trực tiếp qua đường truyền mạng tại nhà của người dùng?",
          options: [
            "Full Tunneling",
            "Split Tunneling",
            "Port Forwarding",
            "Bridge VLAN Filtering"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B (`Split Tunneling` - Phân tách đường hầm). Chế độ này giúp giảm tải băng thông cho đường truyền Internet tại trụ sở công ty và giữ tốc độ lướt web nhanh cho người dùng từ xa."
        }
      ]
    }
  },

  // ==========================================================================
  // BÀI 06: LAB TỔNG HỢP MIKROTIK TUẦN 1
  // ==========================================================================
  {
    id: 6,
    code: "06",
    week: 1,
    title: "LAB Tổng hợp Tuần 1: Xây dựng & Xử lý sự cố Mạng Doanh nghiệp trên MikroTik",
    subtitle: "Mô phỏng 2 Subnet (VLAN 10 & VLAN 30), xử lý chuỗi sự cố thực tế: DHCP 169.254.x.x, mất Routing/Gateway, sai Firewall Chain và lỗi NAT",
    priority: "LAB",
    duration: "120 phút",
    whyThisMatters: "Học lý thuyết từ Bài 01 đến Bài 05 mà không tự tay dựng Lab, tự tay 'phá' cho hỏng rồi dùng lệnh chẩn đoán sửa lại thì khi vào phòng phỏng vấn cậu vẫn sẽ bị khớp! Bài Lab tổng hợp này đóng vai trò là 'bài kiểm tra tốt nghiệp Tuần 1': cậu sẽ dựng một mô hình chuẩn gồm Router MikroTik + 2 VLAN (VLAN 10 Server/IT và VLAN 30 Guest/Client), sau đó lần lượt giải quyết 4 ca cấp cứu mạng kinh điển y hệt đề bài thực tế khi đi thi tuyển System/Network Admin.",
    analogy: {
      title: "Buổi diễn tập Cấp cứu Y khoa trước khi vào Phòng mổ thật",
      content: "Hãy coi bài Lab này giống như một bác sĩ thực tập đứng trước mô hình bệnh nhân giả lập:\n• Giai đoạn 1 (Xây dựng cơ thể khỏe mạnh): Cậu tự tay cấu hình từ con số 0 một hệ thống MikroTik hoàn chỉnh có WAN, Bridge VLAN Filtering (VLAN 10 & VLAN 30), IP Gateway, DHCP Server, DNS, NAT và Firewall chuẩn chỉnh.\n• Giai đoạn 2 (Chẩn đoán 4 ca bệnh cấp tính): Mình sẽ đóng vai một 'Admin tập sự hậu đậu' vừa vào công ty chỉnh sửa lung tung làm phát sinh 4 lỗi liên hoàn: (1) Máy VLAN 30 bị dính IP `169.254.x.x`; (2) Có IP rồi nhưng VLAN 30 không ping được sang VLAN 10 dù chưa bật Firewall chặn; (3) Ra được Internet bằng IP `8.8.8.8` nhưng không vào được web bằng tên miền và các VLAN bị lộ/bị chặn sai do nhầm Firewall Chain; (4) Server ở VLAN 10 thấy mọi truy cập từ VLAN khác đều mang IP của Router. Nhiệm vụ của cậu là dùng đúng phương pháp luận: **Triệu chứng -> Giả thuyết -> Lệnh kiểm chứng -> Khắc phục tận gốc**!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Quy trình Troubleshooting 4 bước chuẩn Senior",
          shortDef: "Là phương pháp xử lý sự cố có hệ thống: (1) Quan sát triệu chứng & khoanh vùng tầng OSI -> (2) Đặt giả thuyết nguyên nhân -> (3) Dùng lệnh kiểm chứng bằng bằng chứng -> (4) Sửa lỗi và xác minh lại.",
          easyExplain: "Sự khác biệt lớn nhất giữa một Junior và một Senior không phải là ai gõ phím nhanh hơn, mà là **Junior sửa mò theo thói quen** (thấy mất mạng là tắt Firewall, thêm rule Masquerade bừa bãi, khởi động lại thiết bị), còn **Senior luôn tìm bằng chứng trước khi chạm vào cấu hình**. Luôn đi từ dưới lên: Vật lý/VLAN (Layer 1-2) -> IP/Subnet/Gateway/DHCP -> Routing/NAT/Firewall (Layer 3-4) -> DNS/Application (Layer 7).",
          realExample: "Thấy lỗi 169.254.x.x -> Không vội xóa tạo lại DHCP Server, mà kiểm tra xem cổng Bridge/Switch đã đúng PVID và Tagged `bridge` chưa."
        },
        {
          term: "Mô hình chuẩn: Router-on-a-Stick vs Bridge VLAN Filtering",
          shortDef: "Là hai cách triển khai định tuyến liên VLAN (Inter-VLAN Routing) trên MikroTik: tạo các sub-interface VLAN trên 1 cổng vật lý đơn lẻ (Router-on-a-Stick) hoặc tạo VLAN trên một Bridge chung quản lý nhiều cổng (Bridge VLAN Filtering).",
          easyExplain: "• Nếu con MikroTik chỉ dùng đúng 1 cổng `ether2` làm dây Trunk nối xuống Switch Managed bên dưới: Cậu có thể gắn thẳng `vlan10`, `vlan30` vào `ether2` (gọi là Router-on-a-Stick).\n• Nhưng trong thực tế văn phòng, người ta thường tận dụng luôn các cổng `ether2, ether3, ether4, ether5` trên MikroTik để vừa cắm Switch, vừa cắm AP, vừa cắm Server. Khi đó, **Bridge VLAN Filtering** (như đã học ở Bài 02) là kiến trúc chuẩn mực và linh hoạt nhất!",
          realExample: "Trong bài Lab này, ta dùng `bridge-lan` quản lý `ether2` (Access VLAN 10), `ether3` (Access VLAN 30) và `ether4` (Trunk cả VLAN 10 & 30)."
        },
        {
          term: "Công cụ Packet Sniffer / Torch & Log trên MikroTik",
          shortDef: "Là bộ công cụ quan sát lưu lượng thời gian thực trên MikroTik (`/tool torch`, `/tool sniffer`, `/log`) giúp nhìn tận mắt gói tin đang đi vào cổng nào, mang IP nguồn/đích nào và có bị mất tích ở đâu không.",
          easyExplain: "Khi cậu ngồi tranh luận: 'Ơ em cấu hình đúng hết rồi mà sao ping vẫn không thông?', đừng đoán mò! Hãy bật **Torch** trên giao diện `vlan30` và `vlan10` (hoặc bật tùy chọn `Log = yes` trong Firewall rule). Nếu thấy gói ICMP đi vào `vlan30`, đi ra `vlan10` xuống Server rồi, nhưng không thấy gói trả lời từ Server quay lại `vlan10` -> Kết luận ngay 100% lỗi nằm ở phía con Server (sai Gateway hoặc Windows Firewall trên Server chặn), không phải lỗi của MikroTik!",
          realExample: "`/tool torch interface=vlan10 src-address=192.168.30.0/24 ip-protocol=icmp` -> Nhìn trực tiếp gói ping đi qua giao diện VLAN 10."
        },
        {
          term: "Safe Mode trên WinBox / MikroTik CLI (Ctrl + X)",
          shortDef: "Là cơ chế bảo hiểm an toàn trên MikroTik: nếu bạn mất kết nối quản trị tới Router trong lúc đang bật Safe Mode, toàn bộ các thay đổi vừa thực hiện sẽ tự động được hoàn tác (Rollback) sau vài giây.",
          easyExplain: "Khi thao tác với `Bridge VLAN Filtering`, `IP Address` hoặc `Firewall Input`, chỉ một cú click nhầm cũng có thể làm cậu văng khỏi WinBox và phải vác laptop chạy xuống phòng Server cắm dây Console/Reset! Vì vậy, nguyên tắc sống còn trước khi bật `vlan-filtering=yes` hoặc sửa Firewall: **Luôn bấm nút `Safe Mode` ở góc trên bên trái WinBox (hoặc nhấn `Ctrl + X` trong Terminal)**!",
          realExample: "Bấm `Safe Mode` -> Bật `vlan-filtering=yes` -> Nếu vẫn điều khiển được WinBox bình thường thì tắt `Safe Mode` đi để lưu vĩnh viễn."
        }
      ],
      comparisonTable: {
        title: "Bảng tóm tắt Quy hoạch thông số kỹ thuật cho Bài Lab Tổng hợp Tuần 1",
        headers: ["Thành phần / Phân vùng", "Giao diện (Interface)", "Dải mạng (Subnet) & Gateway", "Cấu hình Cổng & Dịch vụ đi kèm"],
        rows: [
          [
            "Đường truyền Internet (WAN)",
            "`ether1` (hoặc `pppoe-out1`)",
            "Nhận IP từ ISP / Lab NAT (`dhcp-client`)",
            "Đích đến của Default Route `0.0.0.0/0`; áp dụng `srcnat masquerade`."
          ],
          [
            "Switch ảo trung tâm",
            "`bridge-lan`",
            "Không gắn IP trực tiếp lên Bridge (vì dùng VLAN Filtering)",
            "Quản lý `ether2, ether3, ether4` với `vlan-filtering=yes`."
          ],
          [
            "VLAN 10 (Server & IT Mgmt)",
            "`vlan10-it` (trên `bridge-lan`)",
            "Subnet: `192.168.10.0/24`\nGateway: `192.168.10.1`",
            "`ether2`: Access (Untagged 10, PVID=10).\n`ether4`: Trunk (Tagged 10).\nDHCP Pool: `.10.100 - .10.200`, Server tĩnh `.10.50`."
          ],
          [
            "VLAN 30 (Client / Phòng ban)",
            "`vlan30-client` (trên `bridge-lan`)",
            "Subnet: `192.168.30.0/24`\nGateway: `192.168.30.1`",
            "`ether3`: Access (Untagged 30, PVID=30).\n`ether4`: Trunk (Tagged 30).\nDHCP Pool: `.30.100 - .30.200`."
          ]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Trong một bài Lab hoặc hệ thống thực tế kết hợp nhiều thành phần (VLAN + DHCP + Routing + NAT + Firewall), <b>một triệu chứng ở tầng trên luôn có thể bắt nguồn từ một lỗi ở tầng dưới</b>. Do đó, khi kiểm tra hệ thống sau khi dựng Lab (hoặc khi nhận đề bài Troubleshooting), tuyệt đối không kiểm tra nhảy cóc! Hãy xác minh tuần tự theo <b>Chuỗi 5 Mắt Xích</b>: <code>(1) Bridge VLAN & PVID</code> -> <code>(2) DHCP DORA & IP Config</code> -> <code>(3) Connected Routes & Default Gateway</code> -> <code>(4) Firewall Chains (Input/Forward)</code> -> <code>(5) NAT & DNS</code>.",
      flowTitle: "Chuỗi 5 Mắt Xích kiểm chứng toàn diện hệ thống mạng VLAN 10 & VLAN 30",
      flowSteps: [
        {
          step: "Mắt xích 1",
          title: "Xác minh Layer 2 (Bridge Ports PVID & Bridge VLANs)",
          detail: "Kiểm tra máy trạm cắm vào `ether3` đã được gán `pvid=30` chưa, và trong `/interface bridge vlan` dòng `vlan-ids=30` đã có đủ `tagged=bridge-lan` (để lên CPU) và `untagged=ether3` (để xuống PC) chưa. Nếu mắt xích này đứt, mọi thứ phía sau đều vô nghĩa!",
          packetOrState: "PC (ether3, PVID=30) <---> bridge-lan (Tagged 30) <---> giao diện Layer 3 'vlan30-client'"
        },
        {
          step: "Mắt xích 2",
          title: "Xác minh DHCP & Thông số IP trên máy trạm (DORA -> Bound)",
          detail: "Máy trạm ở VLAN 30 chạy `ipconfig /all` phải nhận được đủ 4 thông số chuẩn từ DHCP Server: IP `192.168.30.x`, Mask `255.255.255.0`, Default Gateway `192.168.30.1` và DNS Server `192.168.30.1`. Nếu hiện `169.254.x.x` -> quay lại kiểm tra Mắt xích 1 và cấu hình `/ip dhcp-server`.",
          packetOrState: "DHCP Status = Bound | IP: 192.168.30.200/24 | GW: 192.168.30.1 | DNS: 192.168.30.1"
        },
        {
          step: "Mắt xích 3",
          title: "Xác minh Routing nội bộ giữa VLAN 30 và VLAN 10 (Không NAT)",
          detail: "Từ PC VLAN 30 (`192.168.30.200`) gõ `ping 192.168.30.1` (Gateway của mình), sau đó `ping 192.168.10.1` (Gateway của VLAN 10) và cuối cùng `ping 192.168.10.50` (Server ở VLAN 10). Lưu ý: Nếu ping được `.10.1` mà không ping được `.10.50`, hãy kiểm tra xem con Server `.10.50` đã trỏ đúng Default Gateway về `192.168.10.1` chưa!",
          packetOrState: "Inter-VLAN Routing: 192.168.30.200 -> 192.168.30.1 (MikroTik) -> 192.168.10.50 (Giữ nguyên Src IP .30.200)"
        },
        {
          step: "Mắt xích 4",
          title: "Xác minh NAT ra Internet & Phân giải DNS",
          detail: "Từ PC VLAN 30 gõ `ping 8.8.8.8` (kiểm tra Default Route `0.0.0.0/0` trên MikroTik và rule `srcnat masquerade out-interface=ether1`). Sau khi ping thông `8.8.8.8`, tiếp tục gõ `nslookup google.com` để kiểm tra dịch vụ DNS (`/ip dns set allow-remote-requests=yes`).",
          packetOrState: "WAN Access: 192.168.30.200 -> [Masquerade sang IP ether1] -> 8.8.8.8 & DNS Port 53 OK"
        },
        {
          step: "Mắt xích 5",
          title: "Xác minh Chính sách An ninh (Firewall Filter Input & Forward)",
          detail: "Kiểm tra các rule lọc gói tin: VLAN 10 được quyền kết nối sang VLAN 30 và quản trị Router; còn VLAN 30 chỉ được đi ra Internet (hoặc chỉ được truy cập đúng cổng dịch vụ được phép trên Server VLAN 10) và bị chặn truy cập WinBox vào Router.",
          packetOrState: "Firewall Stateful: VLAN 10 -> VLAN 30 (Allowed) | VLAN 30 -> Router WinBox (Dropped ở INPUT)"
        }
      ],
      asciiDiagram: `
                        [INTERNET / ISP]
                               |
                        ether1 (WAN - DHCP Client)
                        [SRCNAT: Masquerade out-interface=ether1]
                               |
        +----------------------v-----------------------+
        |        ROUTER MIKROTIK (CHR / RouterBoard)   |
        |  DNS: 8.8.8.8 (Allow Remote Requests = YES)  |
        |                                              |
        |   vlan10-it                  vlan30-client   |
        |  192.168.10.1/24            192.168.30.1/24  |
        |  (DHCP: .10.100-200)        (DHCP: .30.100-200)
        |         ^                          ^         |
        |         +--- [bridge-lan (TAGGED 10,30)]     |
        |               (vlan-filtering=yes)           |
        |              /         |          \\          |
        |        ether2        ether3       ether4     |
        |      (Access 10)   (Access 30)  (Trunk 10,30)|
        +----------|-------------|------------|--------+
                   |             |            |
                   v             v            +---> (Nối xuống Switch/AP)
          [Server VLAN 10]   [PC VLAN 30]
          IP : 192.168.10.50 IP : 192.168.30.200 (Nhận qua DHCP)
          GW : 192.168.10.1  GW : 192.168.30.1`,
      keyTakeaways: [
        "Luôn dựng Lab theo thứ tự từ tầng thấp lên tầng cao: Bridge & VLAN (L2) -> IP Address & Routing (L3) -> DHCP & DNS (Services) -> NAT & Firewall (Security).",
        "Khi ping được IP Gateway của VLAN bên kia (`192.168.10.1`) nhưng không ping được máy Server nằm trong VLAN đó (`192.168.10.50`), 90% nguyên nhân là do máy Server đặt sai/thiếu Default Gateway hoặc bật Windows Firewall chặn ping khác subnet!",
        "Dùng công cụ `/tool torch` trên MikroTik là cách nhanh nhất để biết gói tin bị rớt ở chiều đi hay chiều về.",
        "Trước khi bật `vlan-filtering=yes` hoặc thêm rule `drop` trong Firewall, luôn bật **Safe Mode (Ctrl + X)**."
      ]
    },
    level3_practice: {
      scenario: "Cậu hãy mở phần mềm giả lập (EVE-NG / GNS3 / VMware với MikroTik CHR và 2 máy ảo Windows/VPCS) hoặc một chiếc Router MikroTik thật. Chúng ta sẽ thực hiện trọn vẹn bộ kịch bản cấu hình chuẩn từ đầu, sau đó thực hành 'bắt bệnh và cứu chữa' 3 lỗi thực chiến được cài cắm sẵn!",
      steps: [
        {
          title: "Bước 1: Cấu hình hoàn chỉnh Hạ tầng Layer 2 (Bridge VLAN Filtering) & Layer 3 (IP Gateway)",
          instruction: "Mở New Terminal trên WinBox, thực hiện cấu hình `bridge-lan` gồm `ether2` (Access VLAN 10), `ether3` (Access VLAN 30), `ether4` (Trunk VLAN 10 & 30) và đặt IP Gateway cho 2 VLAN.",
          commandOrConfig: `# 1. Tạo Bridge và gán các cổng kèm PVID
/interface bridge
add name=bridge-lan vlan-filtering=no

/interface bridge port
add bridge=bridge-lan interface=ether2 pvid=10 comment="Access Port - Server VLAN 10"
add bridge=bridge-lan interface=ether3 pvid=30 comment="Access Port - Client VLAN 30"
add bridge=bridge-lan interface=ether4 pvid=1 comment="Trunk Port - VLAN 10 & 30"

# 2. Khai báo bảng Bridge VLAN (Nhớ đưa bridge-lan vào tagged!)
/interface bridge vlan
add bridge=bridge-lan vlan-ids=10 tagged=bridge-lan,ether4 untagged=ether2
add bridge=bridge-lan vlan-ids=30 tagged=bridge-lan,ether4 untagged=ether3

# 3. Tạo VLAN Interface (Layer 3) và gắn IP Default Gateway
/interface vlan
add interface=bridge-lan name=vlan10-it vlan-id=10
add interface=bridge-lan name=vlan30-client vlan-id=30

/ip address
add address=192.168.10.1/24 interface=vlan10-it
add address=192.168.30.1/24 interface=vlan30-client

# 4. Bật VLAN Filtering
/interface bridge set bridge-lan vlan-filtering=yes`,
          explanation: "Sau bước này, phần khung xương Layer 2 và Layer 3 đã hoàn tất. Nếu cậu gõ `/ip route print`, cậu sẽ thấy ngay 2 tuyến `DAC` cho `192.168.10.0/24` và `192.168.30.0/24`."
        },
        {
          title: "Bước 2: Cấu hình WAN, DNS, DHCP Server cho 2 VLAN và NAT ra Internet",
          instruction: "Thiết lập nhận IP WAN trên `ether1`, bật DNS Server trên MikroTik, tạo DHCP Server hoàn chỉnh cho cả VLAN 10 lẫn VLAN 30 và cấu hình Masquerade ra `ether1`.",
          commandOrConfig: `# 1. Nhận IP WAN trên ether1 và cấu hình DNS
/ip dhcp-client add interface=ether1 disabled=no
/ip dns set servers=8.8.8.8,1.1.1.1 allow-remote-requests=yes

# 2. Tạo IP Pool và DHCP Server cho VLAN 10 & VLAN 30
/ip pool
add name=pool-vlan10 ranges=192.168.10.100-192.168.10.200
add name=pool-vlan30 ranges=192.168.30.100-192.168.30.200

/ip dhcp-server
add name=dhcp-vlan10 interface=vlan10-it address-pool=pool-vlan10 lease-time=8h disabled=no
add name=dhcp-vlan30 interface=vlan30-client address-pool=pool-vlan30 lease-time=8h disabled=no

# 3. Khai báo thông số Network (Gateway + DNS) cấp xuống cho Client
/ip dhcp-server network
add address=192.168.10.0/24 gateway=192.168.10.1 dns-server=192.168.10.1
add address=192.168.30.0/24 gateway=192.168.30.1 dns-server=192.168.30.1

# 4. Cấu hình SRCNAT (Masquerade) chỉ áp dụng khi đi ra cổng WAN ether1
/ip firewall nat
add chain=srcnat out-interface=ether1 action=masquerade comment="NAT LAN to WAN"`,
          explanation: "Bây giờ hãy cắm máy Server vào `ether2` (đặt IP tĩnh `192.168.10.50/24`, Gateway `192.168.10.1`, DNS `192.168.10.1`) và cắm PC vào `ether3` (để nhận DHCP tự động). PC ở `ether3` sẽ nhận ngay IP `192.168.30.200`!"
        },
        {
          title: "Bước 3: Cấu hình Firewall chuẩn (Bảo vệ Router & Phân quyền giữa VLAN 10 và VLAN 30)",
          instruction: "Áp dụng bộ rule Firewall chuẩn thực tế: Cho phép VLAN 10 truy cập mọi nơi; cho phép VLAN 30 đi Internet và chỉ được phép truy cập cổng Web (TCP 80) của Server `192.168.10.50`, cấm mọi truy cập khác từ VLAN 30 sang VLAN 10 và cấm VLAN 30 vào WinBox.",
          commandOrConfig: `/ip firewall filter
# --- CHAIN INPUT (Bảo vệ chính con Router) ---
add chain=input connection-state=established,related action=accept comment="Accept Established/Related Input"
add chain=input in-interface=vlan30-client protocol=tcp dst-port=8291,22,23,80 action=drop comment="Block VLAN 30 to Router Management"
add chain=input in-interface=ether1 action=drop comment="Block all Input from WAN"

# --- CHAIN FORWARD (Kiểm soát lưu lượng đi xuyên qua Router) ---
add chain=forward connection-state=established,related action=accept comment="Accept Established/Related Forward"
add chain=forward connection-state=invalid action=drop comment="Drop Invalid Forward"

# Cho phép VLAN 30 truy cập duy nhất cổng TCP 80 của Server 192.168.10.50
add chain=forward in-interface=vlan30-client dst-address=192.168.10.50 protocol=tcp dst-port=80 action=accept comment="Allow VLAN 30 to Web Server 10.50:80"

# Chặn mọi kết nối khác khởi tạo từ VLAN 30 sang VLAN 10 (kể cả Ping, SMB, RDP...)
add chain=forward in-interface=vlan30-client out-interface=vlan10-it action=drop comment="Block all other traffic from VLAN 30 to VLAN 10"`,
          explanation: "Kiểm tra kết quả từ PC VLAN 30 (`192.168.30.200`):\n• Mở trình duyệt vào `http://192.168.10.50` (Port 80) -> **Thành công!**\n• Gõ `ping 192.168.10.50` hoặc vào `\\\\192.168.10.50` -> **Bị chặn (Request timed out)!**\n• Nhưng từ Server VLAN 10 (`192.168.10.50`) gõ `ping 192.168.30.200` -> **Vẫn thông bình thường!** (Nhờ rule `established,related` ở đầu bảng Forward). Đó chính là sức mạnh của Stateful Firewall!"
        },
        {
          title: "Bước 4: Thực hành 'Phá & Chữa' (Troubleshooting Drill) bằng công cụ Torch và CLI",
          instruction: "Hãy dùng các lệnh kiểm tra dưới đây để quan sát trực tiếp luồng gói tin và tìm ra lỗi khi ai đó cấu hình sai.",
          commandOrConfig: `# 1. Xem bảng phân bổ VLAN hiện hành trên Bridge (kiểm tra cổng nào đang tagged/untagged thực tế):
/interface bridge vlan print detail

# 2. Xem bảng MAC học được trên từng VLAN để biết thiết bị đang rơi vào VLAN nào:
/interface bridge host print where !local

# 3. Bật Torch để bắt sống gói tin đi qua giao diện vlan10-it:
/tool torch interface=vlan10-it ip-protocol=icmp src-address=0.0.0.0/0 dst-address=0.0.0.0/0

# 4. Kiểm tra bộ đếm gói tin (Packets/Bytes) khớp vào từng rule Firewall và NAT:
/ip firewall filter print stats
/ip firewall nat print stats`,
          explanation: "Lệnh `/interface bridge host print` cực kỳ lợi hại: nhìn vào cột `VID` bên cạnh địa chỉ MAC của máy trạm, cậu sẽ biết ngay gói tin từ máy đó đi vào MikroTik đang mang nhãn VLAN số mấy!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "[Ca bệnh Lab số 1 - Lỗi DHCP]: Máy PC cắm ở cổng `ether3` (VLAN 30) gõ `ipconfig /renew` bị treo một lúc rồi báo lỗi 'Unable to contact your DHCP server' và nhận IP `169.254.99.10`. Trên MikroTik, DHCP Server `dhcp-vlan30` vẫn đang bật (không bị chữ đỏ).",
          hypothesis: "Trong `/interface bridge port` đặt sai PVID của `ether3`, hoặc trong `/interface bridge vlan` tại dòng `vlan-ids=30` bị thiếu `bridge-lan` ở mục `tagged` (hoặc thiếu `ether3` ở mục `untagged`).",
          testCommand: "/interface bridge port print && /interface bridge vlan print detail",
          fix: "Kiểm tra thấy dòng `vlan-ids=30` chỉ có `untagged=ether3` mà quên mất `tagged=bridge-lan`. Chạy lệnh `/interface bridge vlan set [find vlan-ids=30] tagged=bridge-lan,ether4` -> Máy PC nhận lại IP `192.168.30.200` ngay lập tức!"
        },
        {
          symptom: "[Ca bệnh Lab số 2 - Lỗi Routing / Gateway một chiều]: Đã tạm tắt hết các rule Drop trong Firewall để test. Từ PC VLAN 30 (`192.168.30.200`), gõ `ping 192.168.10.1` (IP của Router ở VLAN 10) thì trả về Reply <1ms, nhưng gõ `ping 192.168.10.50` (Server ở VLAN 10) thì báo Request timed out. Trong khi đó, ngồi trên chính con Router MikroTik gõ `/ping 192.168.10.50` lại thông!",
          hypothesis: "Tại sao Router ping được `.10.50` mà PC ở `.30.200` lại không ping được? Vì khi Router ping `.10.50`, Router dùng IP nguồn là `192.168.10.1` (cùng subnet với Server nên Server không cần dùng Gateway để trả lời). Còn khi `.30.200` ping sang, Server phải trả lời cho một IP khác subnet -> Suy ra con Server `192.168.10.50` đang bị đặt SAI hoặc THIẾU Default Gateway (hoặc bật Windows Firewall chặn khác subnet)!",
          testCommand: "/tool torch interface=vlan10-it ip-protocol=icmp (thấy gói ping từ .30.200 đi xuống .10.50 có Tx nhưng Rx = 0).",
          fix: "Kiểm tra cài đặt card mạng trên Server `192.168.10.50`, phát hiện Default Gateway đang để trống (hoặc gõ nhầm thành `192.168.1.1`). Sửa lại Default Gateway của Server thành `192.168.10.1` (và mở ICMP trên Windows Firewall của Server) -> Ping từ VLAN 30 sang thông ngay lập tức mà KHÔNG cần bật NAT!"
        },
        {
          symptom: "[Ca bệnh Lab số 3 - Lỗi thiếu NAT / DNS]: Các máy ở cả VLAN 10 và VLAN 30 đều ping thấy nhau và ping thấy IP WAN của Router, nhưng khi `ping 8.8.8.8` thì báo Request timed out hoàn toàn (mặc dù đứng trong Terminal của MikroTik gõ `/ping 8.8.8.8` vẫn thông).",
          hypothesis: "Bản thân Router ra được Internet (chứng tỏ Default Route `0.0.0.0/0` trên Router đã đúng), nhưng các máy trong LAN không ra được -> Thiếu rule `srcnat masquerade` cho phép dịch IP Private của LAN sang IP WAN, hoặc có rule Firewall `chain=forward` đang chặn đường ra WAN.",
          testCommand: "/ip firewall nat print && /ip firewall filter print",
          fix: "Kiểm tra `/ip firewall nat print` thấy rule `masquerade` đang bị Disabled hoặc chọn nhầm `out-interface=ether2`. Sửa lại thành `chain=srcnat out-interface=ether1 action=masquerade` và bật rule lên -> Cả 2 VLAN đi ra Internet bình thường!"
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Trong bài Lab có 2 VLAN (VLAN 10: `192.168.10.0/24` và VLAN 30: `192.168.30.0/24`). Một bạn kỹ thuật viên gặp lỗi: Từ máy PC ở VLAN 30 ping được `192.168.10.1` nhưng không ping được máy Server `192.168.10.50` (trong khi đứng trên Router MikroTik ping `192.168.10.50` vẫn thông). Bạn kỹ thuật viên đó liền vào MikroTik thêm một rule `chain=srcnat out-interface=vlan10 action=masquerade` thì thấy PC ở VLAN 30 ping được `192.168.10.50` ngay! Hãy giải thích tại sao làm vậy lại thông, nguyên nhân gốc thực sự nằm ở đâu, và tại sao cách sửa bằng `masquerade` đó là SAI nguyên lý?",
          wrongAnswer: "Bạn kỹ thuật viên làm đúng rồi ạ, vì muốn đi từ VLAN 30 sang VLAN 10 thì phải có NAT Masquerade mới thông được.",
          rightAnswer: "Đây là tình huống phân biệt cực rõ giữa người sửa mò và người hiểu nguyên lý:\n1) **Nguyên nhân gốc rễ thực sự**: Việc đứng trên Router MikroTik ping được `192.168.10.50` (cùng subnet `.10.x`) nhưng từ VLAN 30 (`192.168.30.200`) ping sang lại không được chứng tỏ gói tin chiều đi đã tới được Server, nhưng **Server `.10.50` không trả lời lại được cho IP khác subnet (`.30.200`)**. Lý do chỉ có một trong hai: hoặc là trên máy Server `.10.50` **quên điền/điền sai Default Gateway (`192.168.10.1`)**, hoặc **Windows Firewall trên Server đang chặn gói tin từ subnet khác**.\n2) **Tại sao bạn kia bật `masquerade` trên cổng `vlan10` thì lại ping được?**: Vì khi bật `masquerade` đi ra `vlan10`, Router đã sửa IP nguồn của gói tin từ `192.168.30.200` thành `192.168.10.1` (IP của chính Router). Con Server `.10.50` nhận được gói tin cứ tưởng là ông `192.168.10.1` cùng phòng đang nói chuyện với mình nên trả lời trực tiếp ở Layer 2 mà không cần Gateway và không bị Windows Firewall chặn khác subnet!\n3) **Tại sao cách làm đó là SAI nguyên lý?**: Nó chỉ là cách 'lách luật che giấu lỗi cấu hình trên Server'. Hậu quả là toàn bộ các máy từ mọi VLAN khác đi vào Server đều bị đổi IP thành `192.168.10.1`, làm Server mất hoàn toàn khả năng ghi Log truy cập theo IP thật và vô hiệu hóa các chính sách phân quyền theo IP nguồn. Cách sửa ĐÚNG là tắt rule `masquerade` nội bộ đó đi, rồi lên Server `.10.50` điền đúng Default Gateway `192.168.10.1` và mở Windows Firewall cho dải nội bộ.",
          keyPoints: [
            "Nguyên nhân gốc nằm ở Server 192.168.10.50: thiếu/sai Default Gateway (192.168.10.1) hoặc Windows Firewall chặn khác subnet",
            "Bật Masquerade nội bộ chỉ 'đánh lừa' Server rằng gói tin xuất phát từ 192.168.10.1 (cùng subnet)",
            "Cách sửa chuẩn là sửa Gateway/Host Firewall trên Server và giữ nguyên Routing thuần (không NAT nội bộ)"
          ]
        },
        {
          question: "Trên Router MikroTik, bạn đứng trong cửa sổ Terminal gõ `/ping 8.8.8.8` thì thấy thông (Reply 10ms), nhưng ngồi ở máy tính nhân viên trong mạng LAN (đã nhận đúng IP, Mask, Gateway, DNS từ MikroTik) gõ `ping 8.8.8.8` lại báo `Request timed out`. Hãy liệt kê chính xác những nguyên nhân có thể gây ra hiện tượng này.",
          wrongAnswer: "Do đứt cáp quang nhà mạng hoặc chưa cấu hình DNS Server trên MikroTik.",
          rightAnswer: "Việc đứng trên Router ping được `8.8.8.8` đã chứng minh 100% rằng đường truyền cáp quang WAN và Default Route (`0.0.0.0/0`) trên Router hoàn toàn tốt; và vì ta đang ping trực tiếp bằng địa chỉ IP `8.8.8.8` nên cũng loại trừ luôn nguyên nhân do DNS.\nKhi Router ra được mạng mà máy LAN (đã đúng IP/Gateway) không ping được `8.8.8.8`, chỉ có **2 nhóm nguyên nhân trên Router MikroTik**:\n1) **Thiếu hoặc sai cấu hình SRCNAT (Masquerade)**: Gói tin từ máy LAN mang IP Private (`192.168.x.x`) đi ra cổng WAN mà chưa được NAT sang IP Public của cổng WAN (hoặc rule `masquerade` chọn nhầm `out-interface`, bị disabled).\n2) **Bị chặn tại Firewall Filter `chain=forward`**: Có một rule `drop` trong `chain=forward` đang chặn lưu lượng từ LAN đi ra WAN (trong khi lúc bản thân Router tự ping thì gói tin đi qua `chain=output` nên không bị ảnh hưởng bởi `chain=forward`!).",
          keyPoints: [
            "Router ping 8.8.8.8 thông = Đường truyền WAN và Default Route (0.0.0.0/0) đã tốt; ping bằng IP nên không liên quan DNS",
            "Nguyên nhân 1: Thiếu hoặc sai rule SRCNAT / Masquerade cho cổng WAN",
            "Nguyên nhân 2: Firewall Filter đang chặn ở `chain=forward` (vì Router tự ping dùng `chain=output`, còn máy LAN đi qua Router dùng `chain=forward`)"
          ]
        }
      ],
      quizzes: [
        {
          question: "Trong bài Lab MikroTik, khi dùng công cụ `/tool torch interface=vlan10-it ip-protocol=icmp`, bạn thấy khi PC ở VLAN 30 (`192.168.30.200`) ping tới Server ở VLAN 10 (`192.168.10.50`), cột **Tx (Transmit)** có lưu lượng nhảy đều đặn nhưng cột **Rx (Receive)** bằng 0. Điều này chứng tỏ điều gì?",
          options: [
            "Firewall trên MikroTik đang chặn không cho gói tin từ VLAN 30 sang VLAN 10.",
            "MikroTik đã định tuyến và đẩy gói tin ping xuống giao diện `vlan10-it` tới Server thành công, nhưng Server `192.168.10.50` không gửi gói phản hồi (Reply) quay trở lại.",
            "Cổng `ether3` của PC ở VLAN 30 bị đứt dây mạng.",
            "PC ở VLAN 30 đang bị lỗi APIPA 169.254.x.x."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Đứng ở góc nhìn của giao diện `vlan10-it` trên Router: `Tx` (truyền ra) có lưu lượng nghĩa là gói tin từ VLAN 30 đã đi xuyên qua Router và được đẩy xuống VLAN 10 thành công. `Rx` (nhận về) bằng 0 nghĩa là máy Server `192.168.10.50` không trả lời (do tắt máy, sai IP, thiếu Default Gateway trên Server hoặc Windows Firewall trên Server chặn ping)."
        },
        {
          question: "Tính năng nào trên WinBox / MikroTik CLI giúp tự động hoàn tác (Rollback) các cấu hình vừa thay đổi nếu chẳng may thao tác của bạn làm mất kết nối quản trị tới Router?",
          options: [
            "RoMON Mode",
            "Safe Mode (Ctrl + X)",
            "FastTrack Connection",
            "Bridge Hardware Offload"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B (`Safe Mode` - phím tắt `Ctrl + X` trên Terminal hoặc nút `Safe Mode` trên WinBox). Khi bật chế độ này, nếu phiên kết nối WinBox/SSH bị đứt đột ngột do cấu hình sai VLAN hoặc Firewall, RouterOS sẽ tự động khôi phục lại trạng thái trước khi bật Safe Mode."
        },
        {
          question: "Trong cấu hình DHCP Server trên MikroTik, nếu bạn đã tạo `/ip pool` và `/ip dhcp-server` thành công nhưng QUÊN không thêm mục tương ứng trong bảng `/ip dhcp-server network`, hiện tượng gì sẽ xảy ra trên máy trạm Windows khi xin IP?",
          options: [
            "Máy trạm nhận được đầy đủ IP, Subnet Mask, Default Gateway và DNS bình thường.",
            "Máy trạm chỉ nhận được Địa chỉ IP (và Mask mặc định), nhưng bị TRỐNG hoàn toàn thông số Default Gateway và DNS Server.",
            "Router MikroTik tự động tắt nguồn.",
            "Máy trạm tự động chuyển sang dùng IPv6."
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là B. Trên MikroTik, mục `/ip dhcp-server` kết hợp với `/ip pool` chỉ quyết định việc cấp phát con số IP nào cho máy trạm. Còn các thông số đi kèm (DHCP Options như Option 1 Subnet Mask, Option 3 Default Gateway, Option 6 DNS Server) được lấy từ bảng `/ip dhcp-server network`. Nếu thiếu bảng này, máy trạm có IP nhưng không có Gateway và DNS!"
        }
      ]
    }
  }
];
