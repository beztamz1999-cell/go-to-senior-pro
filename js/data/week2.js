window.WEEK2_DATA = [
  // =========================================================================
  // BÀI 07: DOMAIN, AD DS, DOMAIN CONTROLLER, OU
  // =========================================================================
  {
    id: 7,
    code: "07",
    week: 2,
    title: "Domain, AD DS, Domain Controller & OU",
    subtitle: "Phân biệt sắc bén các thành phần cốt lõi của Active Directory và vai trò thực sự của Domain Controller",
    priority: "P0",
    duration: "75 phút",
    whyThisMatters: "Cậu đã từng tự tay dựng Domain Controller và tạo tài khoản cho nhân viên, nhưng khi đi phỏng vấn gặp câu hỏi xoáy: \"AD DS khác gì Domain Controller?\", \"Cơ sở dữ liệu của AD nằm ở file nào?\", hay \"Tại sao đã có OU để chia phòng ban rồi lại còn sinh ra Security Group?\" thì rất dễ trả lời lẫn lộn. Bài học này giúp cậu định nghĩa chuẩn xác từng thành phần chỉ trong 15 giây và nắm vững kiến trúc lưu trữ bên dưới của Active Directory.",
    analogy: {
      title: "Hệ thống Quản lý Cư dân Thành phố vs Xóm trọ Tự quản",
      content: "Hãy tưởng tượng mô hình **Workgroup** giống như một xóm trọ 10 phòng: mỗi chủ phòng tự giữ một cuốn sổ tay ghi tên những ai được phép vào phòng mình. Nếu có một người bạn mới đến chơi cả 10 phòng, cả 10 chủ phòng đều phải tự ghi tên và mật khẩu của người đó vào sổ — cực kỳ mất công và lộn xộn!\n\nNgược lại, **Domain** giống như một Thành phố hiện đại:\n- **Domain (`corp.local`)**: Là ranh giới hành chính của cả thành phố, nơi mọi công dân và tòa nhà đều tuân theo một bộ luật chung.\n- **AD DS (Active Directory Domain Services)**: Chính là **Hệ thống Phần mềm & Cơ sở dữ liệu hộ khẩu quốc gia** (file `ntds.dit`), lưu trữ thông tin mọi công dân (User), máy móc (Computer), hội nhóm (Group).\n- **Domain Controller (DC)**: Là **Trụ sở Công an Thành phố** — tức cái máy chủ vật lý hoặc máy ảo cài dịch vụ AD DS, giữ cuốn sổ hộ khẩu gốc và đứng ra kiểm tra căn cước mỗi khi ai đó muốn đăng nhập.\n- **OU (Organizational Unit)**: Giống như các **Quận/Phường** (Quận Kế Toán, Quận IT). Chia Quận/Phường là để UBND áp dụng quy định hành chính (**GPO**) hoặc giao cho Cảnh sát khu vực quản lý (**Ủy quyền - Delegation**).\n- **Security Group**: Giống như **Danh sách thành viên Câu lạc bộ VIP** — dùng để phát thẻ từ mở cửa vào các kho tài liệu (**Phân quyền File/Folder**)."
    },
    level1_definitions: {
      concepts: [
        {
          term: "Workgroup vs Domain",
          shortDef: "Workgroup là mô hình mạng ngang hàng (Peer-to-Peer) quản lý tài khoản phân tán trên từng máy lẻ; Domain là mô hình quản lý tập trung (Centralized) mọi tài khoản và chính sách bảo mật tại máy chủ Domain Controller.",
          easyExplain: "Trong Workgroup, mỗi máy tính có cơ sở dữ liệu tài khoản cục bộ riêng gọi là SAM (Security Accounts Manager). Muốn đăng nhập máy nào phải có tài khoản trên chính máy đó. Trong Domain, tài khoản được lưu tập trung trên Active Directory; nhân viên chỉ cần 1 tài khoản Domain duy nhất để đăng nhập vào bất kỳ máy tính nào đã Join Domain.",
          realExample: "Văn phòng 5 máy tính có thể dùng Workgroup. Nhưng công ty có 50 nhân viên trở lên bắt buộc phải dựng Domain (ví dụ `company.local`) để IT có thể khóa tài khoản nhân viên nghỉ việc chỉ bằng 1 cú click chuột thay vì chạy đi xóa trên 50 máy."
        },
        {
          term: "AD DS (Active Directory Domain Services)",
          shortDef: "AD DS là dịch vụ thư mục (Directory Service) của Microsoft dùng để lưu trữ thông tin các đối tượng mạng (User, Computer, Group) trong cơ sở dữ liệu tập trung và cung cấp cơ chế xác thực, phân quyền trong Domain.",
          easyExplain: "AD DS không phải là cái máy chủ vật lý, mà là **Server Role (dịch vụ phần mềm)** chạy trên Windows Server. Toàn bộ dữ liệu của AD DS được lưu trong một file database duy nhất tên là `ntds.dit` (mặc định nằm tại `C:\\Windows\\NTDS\\ntds.dit`) kết hợp với thư mục chia sẻ đặc biệt `SYSVOL` (chứa Group Policy và scripts).",
          realExample: "Khi cậu mở Server Manager -> Add Roles and Features -> tích chọn 'Active Directory Domain Services', tức là cậu đang cài đặt bộ cài dịch vụ AD DS lên máy chủ Windows Server."
        },
        {
          term: "Domain Controller (DC)",
          shortDef: "Domain Controller là máy chủ Windows Server đã được cài đặt role AD DS và nâng cấp (Promote) để trực tiếp lưu trữ bản sao cơ sở dữ liệu `ntds.dit`, xử lý xác thực đăng nhập (Kerberos/NTLM) và phân phối chính sách GPO.",
          easyExplain: "Nếu AD DS là 'phần hồn' (dịch vụ và cơ sở dữ liệu), thì Domain Controller (DC) chính là 'phần xác' (cỗ máy chủ đang chạy dịch vụ đó). Trong một doanh nghiệp, người ta luôn dựng ít nhất **2 máy DC** (DC01 và DC02) chạy song song và tự động đồng bộ dữ liệu với nhau (Multi-Master Replication) để nếu 1 máy chết, nhân viên vẫn đăng nhập làm việc bình thường.",
          realExample: "Máy chủ `DC01.corp.local` (IP `192.168.1.10`) chạy Windows Server 2022 sau khi chạy lệnh `Install-ADDSForest` sẽ trở thành Domain Controller đầu tiên của công ty."
        },
        {
          term: "OU (Organizational Unit - Đơn vị tổ chức)",
          shortDef: "OU là một đối tượng chứa (Container) đặc biệt trong Active Directory dùng để gom nhóm User, Computer, Group theo cấu trúc phòng ban/địa lý nhằm 2 mục đích chính: áp dụng chính sách Group Policy (GPO) và ủy quyền quản trị (Delegation of Control).",
          easyExplain: "Rất nhiều bạn mới đi làm nhầm tưởng tạo OU là để phân quyền thư mục chia sẻ! Hãy nhớ kỹ: **OU không có SID (Security Identifier)** nên KHÔNG THỂ thêm OU vào tab Security của Folder để phân quyền đọc/ghi. OU chỉ dùng để tổ chức cây thư mục AD gọn gàng, gắn GPO (ví dụ: chặn USB cho OU Kế toán) và giao quyền cho IT Helpdesk reset mật khẩu trong phạm vi OU đó.",
          realExample: "Trong công cụ Active Directory Users and Computers (ADUC), cậu tạo `OU=PhongKeToan`, bên trong có 2 OU con là `OU=Users` (chứa tài khoản nhân viên kế toán) và `OU=Computers` (chứa các máy tính bàn của phòng kế toán)."
        },
        {
          term: "NTDS.DIT & Thư mục SYSVOL",
          shortDef: "`ntds.dit` là file cơ sở dữ liệu vật lý lưu toàn bộ đối tượng AD (User, Password Hash, Group, OU), còn `SYSVOL` là thư mục chia sẻ trên mọi DC dùng để lưu trữ các file cấu hình Group Policy (GPT) và Logon Scripts cho máy trạm tải về.",
          easyExplain: "Khi hai máy Domain Controller đồng bộ với nhau, chúng thực chất đang đồng bộ 2 thứ: (1) Đồng bộ cơ sở dữ liệu `ntds.dit` qua cơ chế AD Replication, và (2) Đồng bộ thư mục `C:\\Windows\\SYSVOL` qua dịch vụ **DFS Replication (DFSR)**. Nếu mất chia sẻ `SYSVOL`, máy trạm sẽ không thể tải được bất kỳ chính sách GPO nào!",
          realExample: "Khi gõ lệnh `net share` trên bất kỳ Domain Controller nào đang hoạt động khỏe mạnh, cậu bắt buộc phải nhìn thấy 2 thư mục chia sẻ mặc định là `SYSVOL` và `NETLOGON`."
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt: OU (Organizational Unit) vs Security Group (Câu hỏi phỏng vấn kinh điển)",
        headers: ["Tiêu chí so sánh", "OU (Organizational Unit)", "Security Group (Nhóm bảo mật)"],
        rows: [
          ["Bản chất", "Là chiếc hộp chứa (Container) để sắp xếp cấu trúc cây thư mục AD", "Là đối tượng bảo mật có mã định danh **SID (Security Identifier)**"],
          ["Mục đích cốt lõi", "1. Gắn **Group Policy (GPO)**\n2. **Ủy quyền quản trị (Delegation)** (VD: cho Helpdesk reset password)", "Gắn quyền truy cập tài nguyên (**ACL Permission** trên File Server, Printer, Share Folder)"],
          ["Phân quyền Folder (NTFS/Share) được không?", "**KHÔNG!** Không thể chọn OU trong cửa sổ Security của Folder", "**CÓ!** Đây là công cụ chuẩn để phân quyền đọc/ghi thư mục"],
          ["Gắn trực tiếp GPO vào được không?", "**CÓ!** GPO được Link trực tiếp vào Site, Domain hoặc OU", "**KHÔNG** thể Link trực tiếp GPO vào Group (chỉ dùng Group để lọc phạm vi qua Security Filtering)"],
          ["Số lượng mà 1 User có thể thuộc về", "Tại một thời điểm, 1 User/Computer chỉ nằm trong **DUY NHẤT 1 OU**", "1 User có thể là thành viên của **hàng chục, hàng trăm Security Group** cùng lúc"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Để hiểu sâu Active Directory, cậu cần nắm vững **Nguyên lý tách biệt giữa Quản trị hành chính (OU) và Kiểm soát truy cập (Security Group)** cùng với **Kiến trúc lưu trữ kép (`ntds.dit` + `SYSVOL`)**:\n<ul><li><b>1. Tại sao mỗi đối tượng trong AD lại cần SID?</b> Khi cậu tạo một <code>User</code>, <code>Computer</code> hoặc <code>Security Group</code>, Domain Controller sẽ sinh ra một chuỗi định danh duy nhất gọi là <b>SID (Security Identifier)</b> (ví dụ: <code>S-1-5-21-3623811015-3361044348-30300820-1013</code>). Hệ điều hành Windows không nhận diện cậu bằng tên <code>nguyen.van.a</code> mà bằng mã SID này. Vì <b>OU không có SID</b>, hệ thống file NTFS hoàn toàn 'mù' trước OU — đó là lý do bắt buộc phải dùng <b>Security Group</b> để phân quyền File/Folder.</li><li><b>2. Tại sao trong ADUC có các thư mục mặc định như <code>Users</code> và <code>Computers</code> nhưng không gắn được GPO?</b> Vì các mục mặc định như <code>Users</code>, <code>Computers</code>, <code>Builtin</code> (biểu tượng hình cái hộp trắng thường) chỉ là <b>Generic Containers (CN)</b> chứ KHÔNG PHẢI là <b>OU</b> (biểu tượng có thêm hình quyển sổ nhỏ). Generic Container không hỗ trợ gắn (Link) GPO! Chỉ có <code>Domain Controllers</code> là một OU mặc định thực sự.</li><li><b>3. Cơ chế Multi-Master Replication & 5 FSMO Roles:</b> Trong một Domain có nhiều DC, mọi DC đều có quyền ghi (Read/Write) vào database <code>ntds.dit</code> và tự đồng bộ cho nhau (trừ RODC - Read-Only DC). Tuy nhiên, để tránh xung đột ở những tác vụ nhạy cảm, AD giao 5 vai trò đặc biệt gọi là <b>5 FSMO Roles</b> (<i>Schema Master, Domain Naming Master, PDC Emulator, RID Master, Infrastructure Master</i>) cho các DC cụ thể nắm giữ.</li></ul>",
      flowTitle: "Quy trình biến một Windows Server thành Domain Controller (Promote DC) & Đồng bộ AD",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Cài đặt AD DS Binaries (Install Role)",
          detail: "Quản trị viên cài đặt Role 'Active Directory Domain Services' qua Server Manager hoặc PowerShell. Lúc này máy chủ mới chỉ tải các file thực thi hệ thống về ổ cứng, chưa hề là Domain Controller.",
          packetOrState: "Trạng thái: Member Server / Standalone Server | Dịch vụ NTDS chưa khởi chạy"
        },
        {
          step: "Bước 2",
          title: "Nâng cấp lên Domain Controller (Promote DC & Khởi tạo Database)",
          detail: "Khi chạy trình thuật sĩ Promote DC (hoặc lệnh Install-ADDSForest), hệ thống tạo ra database C:\\Windows\\NTDS\\ntds.dit (dựa trên engine ESE - Extensible Storage Engine), tạo log giao dịch edb.log và khởi tạo cấu trúc 3 phân vùng thư mục: Schema, Configuration và Domain Partition.",
          packetOrState: "Khởi tạo: C:\\Windows\\NTDS\\ntds.dit + Đặt mật khẩu DSRM (Directory Services Restore Mode)"
        },
        {
          step: "Bước 3",
          title: "Tạo thư mục chia sẻ SYSVOL, NETLOGON và tích hợp AD DNS",
          detail: "Hệ thống tạo cấu trúc thư mục C:\\Windows\\SYSVOL, bật chia sẻ mạng cho SYSVOL và NETLOGON. Đồng thời dịch vụ DNS Server được cấu hình để lưu các bản ghi định vị dịch vụ (SRV records) vào chính database AD.",
          packetOrState: "Share active: \\\\DC01\\SYSVOL & \\\\DC01\\NETLOGON | DNS Zone: Active Directory-Integrated"
        },
        {
          step: "Bước 4",
          title: "Khởi tạo Domain SID, 5 FSMO Roles và các Container mặc định",
          detail: "DC đầu tiên trong Forest tự động nhận cả 5 vai trò FSMO Roles. Nó sinh ra Domain SID, chuyển tài khoản Administrator cục bộ thành Domain Admin (RID = 500) và dựng cây thư mục mặc định trong AD.",
          packetOrState: "5 FSMO Roles -> DC01 | Administrator SID: S-1-5-21-<Domain-ID>-500"
        },
        {
          step: "Bước 5",
          title: "Thiết lập Multi-Master Replication khi có thêm DC02",
          detail: "Khi doanh nghiệp dựng thêm máy chủ DC02 để dự phòng (High Availability), thành phần KCC (Knowledge Consistency Checker) tự động tạo kết nối đồng bộ hai chiều: ntds.dit đồng bộ qua RPC/IP và SYSVOL đồng bộ qua DFSR.",
          packetOrState: "Replication Topology: DC01 <===[RPC / DFSR]===> DC02 (Chu kỳ đồng bộ nội bộ Site: ~15 giây)"
        }
      ],
      asciiDiagram: ` KIẾN TRÚC ACTIVE DIRECTORY DOMAIN (corp.local)
 =====================================================================================
 
   +-----------------------------------+         +-----------------------------------+
   |      DOMAIN CONTROLLER 01         |         |      DOMAIN CONTROLLER 02         |
   |      (192.168.10.10 - Primary)    |         |      (192.168.10.11 - Backup)     |
   |  +-----------------------------+  |         |  +-----------------------------+  |
   |  | Database: C:\\Windows\\NTDS\\  |  |  Đồng   |  | Database: C:\\Windows\\NTDS\\  |  |
   |  |          ntds.dit           |<=|== bộ ==>|=>|          ntds.dit           |  |
   |  +-----------------------------+  | (AD Rep)|  +-----------------------------+  |
   |  | Share:   C:\\Windows\\SYSVOL  |<=|========>|=>| Share:   C:\\Windows\\SYSVOL  |  |
   |  +-----------------------------+  |  (DFSR) |  +-----------------------------+  |
   |  Giữ 5 FSMO Roles (PDC, RID...)   |         |  Chịu tải xác thực & Dự phòng HA  |
   +-----------------------------------+         +-----------------------------------+
                     |
                     v  Cấu trúc Cây Thư Mục Лоgic bên trong AD DS (ntds.dit)
   +---------------------------------------------------------------------------------+
   | [Domain] corp.local                                                             |
   |   |-- [Container] Builtin        (Hộp mặc định - KHÔNG gắn được GPO)            |
   |   |-- [Container] Computers      (Nơi chứa máy mới Join - KHÔNG gắn được GPO)   |
   |   |-- [Container] Users          (Chứa Domain Admins - KHÔNG gắn được GPO)      |
   |   |-- [OU] Domain Controllers    (OU mặc định chứa DC01, DC02)                  |
   |   |-- [OU] _CORP_HQ              (OU gốc do Admin tự thiết kế)                  |
   |         |-- [OU] PhongKeToan     <--- Gắn GPO: Map ổ đĩa Kế toán, Chặn USB      |
   |         |     |-- [OU] Users        (Chứa User: lan.nt, minh.nv)                |
   |         |     |-- [OU] Computers    (Chứa Máy: PC-KT01, PC-KT02)                |
   |         |     |-- [Group] SG_KeToan (Security Group có SID -> Dùng phân quyền)  |
   |         |-- [OU] PhongIT         <--- Ủy quyền (Delegate) cho IT Helpdesk       |
   +---------------------------------------------------------------------------------+`,
      keyTakeaways: [
        "AD DS là dịch vụ (Role) và cơ sở dữ liệu (ntds.dit + SYSVOL), còn Domain Controller (DC) là máy chủ chạy dịch vụ đó.",
        "OU (Organizational Unit) KHÔNG có SID nên chỉ dùng để gắn GPO và Ủy quyền quản trị (Delegation), tuyệt đối không dùng OU để phân quyền Folder.",
        "Các mục mặc định 'Users' và 'Computers' trong ADUC là Generic Container (CN), không phải OU nên không thể Link GPO vào đó.",
        "Luôn triển khai tối thiểu 2 Domain Controller trong mạng thực tế để đảm bảo tính sẵn sàng cao (High Availability)."
      ]
    },
    level3_practice: {
      scenario: "Cậu vừa tiếp nhận hệ thống Windows Server của công ty `corp.local`. Sếp yêu cầu cậu kiểm tra xem máy chủ nào đang là Domain Controller, máy nào đang giữ 5 vai trò FSMO Roles, kiểm tra sức khỏe chia sẻ SYSVOL và tạo cấu trúc OU chuẩn cho Phòng Kế Toán.",
      steps: [
        {
          title: "Bước 1: Kiểm tra danh sách Domain Controller và 5 vai trò FSMO Roles",
          instruction: "Mở Command Prompt (CMD) hoặc PowerShell với quyền Administrator trên máy chủ DC và chạy lệnh kiểm tra các vai trò FSMO cùng thông tin DC.",
          commandOrConfig: `C:\\Users\\Administrator> netdom query fsmo
Schema master               DC01.corp.local
Domain naming master        DC01.corp.local
PDC                         DC01.corp.local
RID pool manager            DC01.corp.local
Infrastructure master       DC01.corp.local
The command completed successfully.

PS C:\\> Get-ADDomainController -Filter * | Select-Object Name, IPv4Address, Site, IsGlobalCatalog
Name  IPv4Address    Site                    IsGlobalCatalog
----  -----------    ----                    ---------------
DC01  192.168.10.10  Default-First-Site-Name True
DC02  192.168.10.11  Default-First-Site-Name True`,
          explanation: "Lệnh `netdom query fsmo` là câu lệnh 'vàng' khi đi phỏng vấn cũng như thực tế để biết chính xác DC nào đang nắm giữ 5 vai trò FSMO (đặc biệt là `PDC` - máy chủ xử lý đổi mật khẩu, khóa tài khoản và đồng bộ giờ). Lệnh `Get-ADDomainController` liệt kê toàn bộ DC đang có trong Domain."
        },
        {
          title: "Bước 2: Kiểm tra file cơ sở dữ liệu ntds.dit và trạng thái chia sẻ SYSVOL / NETLOGON",
          instruction: "Dùng lệnh `net share` để xác nhận DC đã public thành công `SYSVOL` và `NETLOGON`, đồng thời kiểm tra đường dẫn lưu trữ `ntds.dit` trong Registry/File System.",
          commandOrConfig: `C:\\Users\\Administrator> net share

Share name   Resource                        Remark
-------------------------------------------------------------------------------
C$           C:\\                             Default share
ADMIN$       C:\\Windows                      Remote Admin
NETLOGON     C:\\Windows\\SYSVOL\\sysvol\\corp.local\\SCRIPTS
                                             Logon server share
SYSVOL       C:\\Windows\\SYSVOL\\sysvol        Logon server share
The command completed successfully.

PS C:\\> Get-Item C:\\Windows\\NTDS\\ntds.dit | Select-Object FullName, Length, LastWriteTime
FullName                    Length LastWriteTime
--------                    ------ -------------
C:\\Windows\\NTDS\\ntds.dit  25165824 10/12/2026 8:30:15 AM`,
          explanation: "Một Domain Controller chỉ thực sự hoạt động đúng khi lệnh `net share` hiển thị đầy đủ cả `SYSVOL` và `NETLOGON`. Nếu thiếu 2 share này, máy trạm sẽ báo lỗi không đọc được GPO khi đăng nhập."
        },
        {
          title: "Bước 3: Tạo cấu trúc OU chuẩn doanh nghiệp và bật tính năng chống xóa nhầm",
          instruction: "Trên giao diện GUI, cậu mở `Server Manager -> Tools -> Active Directory Users and Computers (dsa.msc)`, chuột phải vào tên domain `corp.local -> New -> Organizational Unit` (nhớ giữ dấu tích **Protect container from accidental deletion**). Hoặc thực hiện chuẩn xác qua PowerShell như sau:",
          commandOrConfig: `PS C:\\> New-ADOrganizationalUnit -Name "PhongKeToan" -Path "DC=corp,DC=local" -ProtectedFromAccidentalDeletion $true
PS C:\\> New-ADOrganizationalUnit -Name "Users" -Path "OU=PhongKeToan,DC=corp,DC=local" -ProtectedFromAccidentalDeletion $true
PS C:\\> New-ADOrganizationalUnit -Name "Computers" -Path "OU=PhongKeToan,DC=corp,DC=local" -ProtectedFromAccidentalDeletion $true

PS C:\\> Get-ADOrganizationalUnit -Filter * | Select-Object Name, DistinguishedName
Name                DistinguishedName
----                -----------------
Domain Controllers  OU=Domain Controllers,DC=corp,DC=local
PhongKeToan         OU=PhongKeToan,DC=corp,DC=local
Users               OU=Users,OU=PhongKeToan,DC=corp,DC=local
Computers           OU=Computers,OU=PhongKeToan,DC=corp,DC=local`,
          explanation: "Tách riêng `OU=Users` và `OU=Computers` bên trong mỗi phòng ban là Best Practice thực chiến giúp cậu dễ dàng gắn GPO dành cho User và GPO dành cho Computer một cách độc lập, rõ ràng. Tùy chọn `ProtectedFromAccidentalDeletion` giúp ngăn chặn thảm họa lỡ tay bấm phím Delete xóa mất cả OU chứa hàng trăm nhân viên."
        },
        {
          title: "Bước 4: Kiểm tra sự khác biệt giữa OU và Security Group bằng SID",
          instruction: "Tạo một Security Group cho phòng Kế toán và kiểm tra thuộc tính SID của Group so với OU.",
          commandOrConfig: `PS C:\\> New-ADGroup -Name "SG_KeToan" -GroupScope Global -GroupCategory Security -Path "OU=PhongKeToan,DC=corp,DC=local"
PS C:\\> Get-ADGroup "SG_KeToan" | Select-Object Name, GroupCategory, SID

Name      GroupCategory SID
----      ------------- ---
SG_KeToan      Security S-1-5-21-3623811015-3361044348-30300820-1105`,
          explanation: "Như cậu thấy ở kết quả trên, `SG_KeToan` là một Security Group nên được cấp một mã `SID` riêng. Chính mã SID này sẽ được ghi vào danh sách kiểm soát truy cập (ACL) của các thư mục trên File Server."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Mở công cụ Group Policy Management (GPMC), muốn gắn GPO cho các máy tính mới Join Domain trong mục 'Computers' mặc định nhưng chuột phải vào 'Computers' không hề có dòng 'Link an Existing GPO'",
          hypothesis: "Mục 'Computers' (và cả 'Users') mặc định của Active Directory chỉ là Generic Container (CN=Computers), không phải là Organizational Unit (OU) nên hệ thống không cho phép gắn GPO.",
          testCommand: "Get-ADObject -Identity 'CN=Computers,DC=corp,DC=local' | Select-Object Name, ObjectClass",
          fix: "Tạo một OU mới (ví dụ `OU=Workstations` hoặc `OU=Computers` dưới `OU=PhongKeToan`), di chuyển (Move) các Computer Account từ Container `Computers` sang OU mới tạo, sau đó Link GPO vào OU đó."
        },
        {
          symptom: "Muốn xóa hoặc di chuyển một OU cũ không dùng nữa trong ADUC nhưng luôn bị báo lỗi: 'You do not have sufficient privileges to delete... or this object is protected from accidental deletion' dù đang đăng nhập bằng tài khoản Domain Admin",
          hypothesis: "OU đang được bật cờ bảo vệ chống xóa nhầm (Protect object from accidental deletion).",
          testCommand: "Get-ADOrganizationalUnit -Identity 'OU=PhongKeToan,DC=corp,DC=local' -Properties ProtectedFromAccidentalDeletion",
          fix: "Trong cửa sổ ADUC, vào menu `View -> Tích chọn Advanced Features`. Sau đó chuột phải vào OU cần xóa -> chọn `Properties -> Tab Object` -> Bỏ tích ô `Protect object from accidental deletion` -> nhấn OK rồi mới xóa."
        },
        {
          symptom: "Máy chủ DC02 mới nâng cấp lên Domain Controller nhưng các máy trạm xác thực qua DC02 không áp dụng được Group Policy, báo lỗi không tìm thấy đường dẫn \\\\corp.local\\sysvol",
          hypothesis: "Quá trình đồng bộ DFSR ban đầu giữa DC01 và DC02 chưa hoàn tất hoặc bị kẹt, khiến DC02 chưa công bố chia sẻ SYSVOL và NETLOGON.",
          testCommand: "net share (trên DC02) && repadmin /replsummary",
          fix: "Kiểm tra kết nối mạng/DNS giữa DC02 và DC01, xem Event Viewer mục `Applications and Services Logs -> DFS Replication` để xử lý lỗi đồng bộ hoặc kiểm tra khóa Registry `SysvolReady` tại `HKLM\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters`."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Trong Active Directory, mình đã tạo OU 'Phòng Kế Toán' và bỏ hết nhân viên kế toán vào đó rồi. Vậy khi chia sẻ thư mục 'Tài liệu Kế toán' trên File Server, mình có thể phân quyền trực tiếp cho cái OU 'Phòng Kế Toán' đó được không? Tại sao?",
          wrongAnswer: "Dạ được ạ, vì nhân viên kế toán đều nằm trong OU đó rồi nên mình chọn OU Phòng Kế Toán để cấp quyền Read/Write cho nhanh.",
          rightAnswer: "Hoàn toàn KHÔNG ĐƯỢC. Vì trong kiến trúc của Windows/Active Directory, chỉ những đối tượng gọi là Security Principals (như User, Computer, và Security Group) mới được cấp mã định danh bảo mật SID (Security Identifier) để đưa vào bảng phân quyền ACL (Access Control List). Còn OU chỉ là một đơn vị chứa (Container) mang tính tổ chức hành chính, không hề có SID. Do đó, muốn phân quyền thư mục cho phòng Kế toán, ta bắt buộc phải tạo một Security Group (ví dụ `SG_KeToan`), thêm các User kế toán vào Group đó, rồi cấp quyền trên Folder cho `SG_KeToan`.",
          keyPoints: [
            "Khẳng định dứt khoát: OU không thể dùng để phân quyền File/Folder",
            "Giải thích đúng nguyên lý gốc: OU không phải là Security Principal và KHÔNG có mã SID",
            "Nêu đúng mục đích: OU dùng cho GPO & Delegation; Security Group mới dùng cho Permission (ACL)"
          ]
        },
        {
          question: "Hãy phân biệt ngắn gọn AD DS và Domain Controller? Cơ sở dữ liệu của Active Directory nằm ở file nào và thư mục nào trên ổ cứng?",
          wrongAnswer: "AD DS và Domain Controller là một, đều là cái máy chủ quản lý tài khoản trong mạng. Dữ liệu của nó lưu trong ổ C.",
          rightAnswer: "AD DS (Active Directory Domain Services) là tên của Dịch vụ thư mục (Server Role) cung cấp cơ chế lưu trữ, tìm kiếm và xác thực các đối tượng mạng. Còn Domain Controller (DC) là chiếc máy chủ Windows Server (vật lý hoặc ảo) cài đặt và chạy dịch vụ AD DS đó. Về mặt lưu trữ vật lý trên ổ cứng của DC, toàn bộ dữ liệu đối tượng AD (User, Password Hash, Group, OU, Schema) được lưu trong file cơ sở dữ liệu `ntds.dit` (mặc định tại `C:\\Windows\\NTDS\\ntds.dit`), kết hợp với thư mục `C:\\Windows\\SYSVOL` dùng để lưu trữ các file mẫu Group Policy (GPT) và Logon Script.",
          keyPoints: [
            "AD DS = Dịch vụ phần mềm (Server Role) vs DC = Máy chủ chạy dịch vụ đó",
            "Nhớ chính xác tên file database: `C:\\Windows\\NTDS\\ntds.dit`",
            "Nhắc thêm thư mục đồng hành bắt buộc: `C:\\Windows\\SYSVOL` (chứa GPO và scripts)"
          ]
        },
        {
          question: "Một công ty có 150 nhân viên nhưng chỉ chạy duy nhất 1 máy chủ Domain Controller (DC01). Nếu máy DC01 này bị hỏng ổ cứng tắt nguồn, chuyện gì sẽ xảy ra với các nhân viên đang làm việc và tại sao?",
          wrongAnswer: "Nếu DC01 tắt thì toàn bộ máy tính của nhân viên đang mở sẽ bị văng ra màn hình khóa ngay lập tức và không ai đăng nhập vào máy tính được nữa.",
          rightAnswer: "Nếu DC01 bị sập, hệ thống sẽ chịu tác động theo 2 khía cạnh: Thứ nhất, những máy trạm đã từng đăng nhập trước đó VẪN CÓ THỂ đăng nhập vào Windows được nhờ cơ chế **Cached Credentials** (mặc định Windows lưu 10 lần đăng nhập gần nhất trong bộ nhớ đệm cục bộ của máy trạm). Tuy nhiên, thứ hai là toàn bộ các hoạt động cần xác thực mới với DC sẽ tê liệt: nhân viên không thể truy cập các tài nguyên mạng mới yêu cầu cấp vé Kerberos lần đầu, không thể đổi mật khẩu, không thể Join máy mới vào Domain, không tải được GPO mới, và nếu DC01 kiêm luôn DNS/DHCP thì toàn bộ mạng nội bộ sẽ mất phân giải tên miền và mất cấp IP. Vì vậy trong thực tế bắt buộc phải có ít nhất 2 DC chạy song song.",
          keyPoints: [
            "Nhắc đến cơ chế Cached Credentials giúp máy trạm cũ vẫn logon vào Windows cục bộ được",
            "Chỉ rõ các dịch vụ bị tê liệt: Cấp vé Kerberos mới, đổi mật khẩu, Join Domain, tải GPO, và DNS nếu DC kiêm DNS",
            "Khuyến nghị Best Practice: Luôn dựng tối thiểu 2 Domain Controller (Primary & Additional/Backup DC)"
          ]
        }
      ],
      quizzes: [
        {
          question: "File nào dưới đây là cơ sở dữ liệu vật lý lưu trữ toàn bộ thông tin về Users, Computers, Groups và OU trên máy chủ Domain Controller?",
          options: [
            "C:\\Windows\\System32\\config\\SAM",
            "C:\\Windows\\NTDS\\ntds.dit",
            "C:\\Windows\\SYSVOL\\sysvol\\gpt.ini",
            "C:\\Windows\\System32\\drivers\\etc\\hosts"
          ],
          correctIndex: 1,
          explanation: "Đáp án đúng là `C:\\Windows\\NTDS\\ntds.dit`. File `SAM` là cơ sở dữ liệu tài khoản cục bộ trên các máy Workgroup/Member Server; `gpt.ini` là file cấu hình phiên bản của GPO trong SYSVOL; còn `hosts` là file ánh xạ tên miền tĩnh."
        },
        {
          question: "Khi một máy tính Windows 10/11 mới được Join vào Domain mà người quản trị không chỉ định trước đường dẫn OU, tài khoản máy tính (Computer Account) đó sẽ mặc định nằm ở đâu và có thể gắn trực tiếp một GPO mới vào nơi đó hay không?",
          options: [
            "Nằm trong OU 'Computers' và CÓ THỂ gắn trực tiếp GPO vào đó",
            "Nằm trong Container 'Computers' (CN=Computers) và KHÔNG THỂ gắn trực tiếp GPO vào đó",
            "Nằm trong OU 'Domain Controllers' và CÓ THỂ gắn trực tiếp GPO vào đó",
            "Nằm trong Container 'Builtin' và KHÔNG THỂ gắn trực tiếp GPO vào đó"
          ],
          correctIndex: 1,
          explanation: "Mặc định mọi máy trạm mới Join Domain sẽ rơi vào thư mục `Computers` (`CN=Computers,DC=...`). Đây chỉ là một Generic Container (CN) chứ không phải là một Organizational Unit (OU), nên không thể Link trực tiếp GPO vào nó (trừ các GPO được gắn ở cấp Domain phía trên truyền xuống)."
        },
        {
          question: "Mục đích chính xác nhất của việc thiết kế và sử dụng OU (Organizational Unit) trong Active Directory là gì?",
          options: [
            "Để cấp quyền Read/Write cho các thư mục chia sẻ trên File Server",
            "Để thay thế hoàn toàn cho Security Group và Distribution Group",
            "Để gom nhóm các đối tượng nhằm áp dụng chính sách Group Policy (GPO) và ủy quyền quản trị (Delegation of Control)",
            "Để tăng tốc độ đồng bộ dữ liệu giữa các Domain Controller"
          ],
          correctIndex: 2,
          explanation: "OU chỉ có 2 vai trò cốt lõi là: (1) Làm điểm neo để gắn Group Policy (GPO) và (2) Ủy quyền quản trị (Delegation of Control) cho các nhóm IT phụ trách từng bộ phận. Việc phân quyền truy cập thư mục (ACL) là nhiệm vụ của Security Group."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 08: AD DNS, DOMAIN JOIN, AUTHENTICATION
  // =========================================================================
  {
    id: 8,
    code: "08",
    week: 2,
    title: "AD DNS, Domain Join & Cơ chế Xác thực (Kerberos vs NTLM)",
    subtitle: "Giải mã bản ghi SRV, luồng cấp vé Kerberos và lý do trỏ DNS 8.8.8.8 không thể Join Domain",
    priority: "P0",
    duration: "80 phút",
    whyThisMatters: "Chắc chắn cậu đã từng gặp cảnh Join máy trạm vào Domain bị báo lỗi đỏ rực, sau đó đổi DNS trên máy trạm về IP của máy chủ DC thì Join thành công ngay! Nhưng khi đi phỏng vấn, người ta sẽ hỏi tiếp: \"Tại sao phải trỏ DNS về DC? Máy trạm hỏi bản ghi DNS tên là gì để tìm ra DC? Nếu mình đặt DNS dòng 1 là IP của DC, dòng 2 là 8.8.8.8 để dự phòng thì có sao không? Và khi đăng nhập, Kerberos hoạt động khác gì NTLM?\". Bài này sẽ giúp cậu nắm rõ tận gốc từng gói tin.",
    analogy: {
      title: "Quầy Lễ Tân Tập Đoàn (AD DNS) & Vé Công Viên Giải Trí (Kerberos)",
      content: "Hãy hình dung2 câu chuyện rất đời thường sau:\n\n**1. Tại sao trỏ DNS 8.8.8.8 không thể Join Domain?**\nGiả sử cậu là nhân viên mới đến nhận việc tại tòa nhà Tập đoàn `corp.local`. Cậu cần tìm xem **Phòng Nhân Sự (Domain Controller)** nằm ở tầng mấy, phòng số bao nhiêu để làm thủ tục nhập tịch (Join Domain).\n- Nếu cậu hỏi **Quầy Lễ Tân nội bộ của tòa nhà (AD DNS Server)**: Cô lễ tân mở cuốn sổ danh bạ dịch vụ (**Bản ghi SRV**) và chỉ ngay: *\"Phòng Nhân sự là máy `DC01`, nằm ở IP `192.168.10.10`, mở cửa số `389` nhé!\"*.\n- Nhưng nếu cậu lại gọi điện ra ngoài đường hỏi **Tổng đài Google (`8.8.8.8`)**: Tổng đài Google biết rõ đường đi tới `facebook.com`, `youtube.com`, nhưng khi cậu hỏi *\"Phòng Nhân sự nội bộ của công ty `corp.local` ở đâu?\"*, Google sẽ lắc đầu bảo *\"Tôi không hề biết tên miền nội bộ đó là ai!\"* (Lỗi `NXDOMAIN`). Thế là máy trạm báo không tìm thấy Domain Controller!\n\n**2. Kerberos vs NTLM khác nhau thế nào?**\n- **Kerberos** giống như đi công viên **Disneyland**: Khi vào cổng chính, cậu xuất trình Căn cước công dân một lần duy nhất cho Quầy vé trung tâm (**KDC trên DC**) để lấy chiếc **Vòng đeo tay trong ngày (Vé TGT)**. Sau đó, muốn chơi Tàu lượn siêu tốc (**File Server**) hay Nhà ma (**Print Server**), cậu chỉ cần giơ vòng tay để đổi lấy **Vé trò chơi (Vé TGS)** rồi vào thẳng mà không bao giờ phải đọc lại mật khẩu cho nhân viên gác trò chơi.\n- **NTLM** là kiểu truyền thống: Không có quầy vé trung tâm. Đến cửa trò chơi nào cậu cũng phải tự giải một câu đố mật mã (**Challenge-Response**) trực tiếp với bảo vệ của trò chơi đó!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Bản ghi DNS SRV (Service Locator Record)",
          shortDef: "Bản ghi SRV là loại bản ghi DNS đặc biệt dùng để chỉ định máy chủ nào đang cung cấp một dịch vụ mạng cụ thể (như LDAP hoặc Kerberos), chạy trên giao thức nào (TCP/UDP) và mở cổng (Port) bao nhiêu.",
          easyExplain: "Khác với bản ghi `A` chỉ đổi Tên máy ra IP (`dc01.corp.local -> 192.168.10.10`), bản ghi `SRV` trả lời câu hỏi: *\"Trong mạng này, máy nào đang làm Domain Controller?\"*. Khi máy trạm muốn Join Domain hoặc đăng nhập, nó không hề biết tên DC là `dc01` hay `server99`, nên nó phải hỏi DNS bản ghi SRV tên là `_ldap._tcp.dc._msdcs.<tên_domain>`.",
          realExample: "Bản ghi `_ldap._tcp.dc._msdcs.corp.local` trả về: `SVR hostname = dc01.corp.local, port = 389, priority = 0, weight = 100`, kèm theo IP `192.168.10.10`."
        },
        {
          term: "AD-Integrated DNS Zone (Vùng DNS tích hợp AD)",
          shortDef: "Là cơ chế lưu trữ toàn bộ dữ liệu vùng phân giải tên miền (DNS Zone) trực tiếp vào bên trong cơ sở dữ liệu Active Directory (`ntds.dit`) thay vì lưu thành file văn bản `.dns` rời rạc.",
          easyExplain: "Khi tích hợp DNS vào AD, cậu nhận được 2 lợi ích cực lớn: (1) **Tự động đồng bộ (Multi-master DNS replication)**: Tạo 1 bản ghi DNS trên DC01 thì DC02 tự động có ngay mà không cần cấu hình Primary/Secondary Zone truyền thống; (2) **Secure Dynamic Updates**: Chỉ những máy tính đã xác thực trong Domain mới được phép tự động cập nhật IP của mình lên DNS, chống giả mạo.",
          realExample: "Trong công cụ DNS Manager (`dnsmgmt.msc`), khi xem Properties của zone `corp.local`, mục Type hiển thị là `Active Directory-Integrated`."
        },
        {
          term: "Kerberos Authentication (Giao thức xác thực Kerberos v5)",
          shortDef: "Kerberos là giao thức xác thực mặc định trong Active Directory hoạt động dựa trên cơ chế cấp vé (Ticket-based authentication) thông qua bên thứ ba tin cậy là KDC (Key Distribution Center) chạy trên Port 88.",
          easyExplain: "Trong Kerberos, mật khẩu của người dùng KHÔNG BAO GIỜ được gửi qua đường truyền mạng. Thay vào đó, máy trạm dùng mật khẩu để giải mã và xin 2 loại vé từ DC: **TGT (Ticket Granting Ticket - Vé tổng)** và **TGS (Ticket Granting Service / Service Ticket - Vé dịch vụ)**. Kerberos xác thực hai chiều (cả Client và Server đều chứng minh danh tính) và bắt buộc thời gian giữa máy trạm với DC không được lệch quá **5 phút**.",
          realExample: "Khi cậu gõ đường dẫn bằng tên miền `\\\\fs01.corp.local\\Data`, máy trạm sẽ dùng giao thức Kerberos để xin vé TGS từ DC rồi mở thẳng thư mục mà không hỏi lại mật khẩu."
        },
        {
          term: "NTLM (NT LAN Manager)",
          shortDef: "NTLM là giao thức xác thực thế hệ cũ của Microsoft hoạt động theo cơ chế Thử thách - Phản hồi (Challenge-Response) dựa trên mã băm mật khẩu (NT Hash), được dùng khi không thể sử dụng Kerberos.",
          easyExplain: "Khi nào Windows phải quay về dùng NTLM thay vì Kerberos? Đó là khi cậu truy cập máy khác bằng **Địa chỉ IP** (ví dụ `\\\\192.168.10.20\\Share`) thay vì tên FQDN, hoặc khi các máy tính nằm trong môi trường **Workgroup**, hoặc truy cập qua tường lửa bị chặn cổng Kerberos 88. NTLM kém bảo mật hơn (dễ bị tấn công Pass-the-Hash / Relay) và tạo tải nặng hơn cho DC.",
          realExample: "Nếu cậu vào `\\\\192.168.10.20\\Data` (dùng IP), Kerberos không thể tra cứu SPN (Service Principal Name) theo IP nên Windows tự động hạ cấp (Fallback) xuống xác thực bằng NTLM."
        },
        {
          term: "Computer Account & Secure Channel (Kênh bảo mật máy trạm)",
          shortDef: "Khi một máy tính Join Domain, AD sẽ tạo ra một tài khoản máy tính (tên có dấu `$` ở cuối như `PC01$`) có mật khẩu dài 120 ký tự ẩn, tự động đổi mật khẩu định kỳ mỗi 30 ngày với DC để duy trì kênh liên lạc tin cậy.",
          easyExplain: "Không chỉ con người mới có tài khoản và mật khẩu trong AD, mà bản thân cái máy tính Windows khi Join Domain cũng có một tài khoản riêng (`PC01$`). Cứ 30 ngày một lần, dịch vụ `Netlogon` trên máy trạm tự động thương lượng với DC để đổi mật khẩu ngầm. Nếu cậu Ghost lại máy hoặc Revert Snapshot máy ảo về thời điểm 2 tháng trước, mật khẩu của máy trạm bị lệch so với DC và gây ra lỗi kinh điển: *'The trust relationship between this workstation and the primary domain failed'*.",
          realExample: "Trong ADUC, nếu bật View -> Advanced Features và xem thuộc tính của máy `PC01`, cậu sẽ thấy thuộc tính `sAMAccountName` của nó là `PC01$`."
        }
      ],
      comparisonTable: {
        title: "Bảng so sánh: Giao thức xác thực Kerberos vs NTLM",
        headers: ["Tiêu chí", "Kerberos (Mặc định trong AD)", "NTLM (Dự phòng / Workgroup)"],
        rows: [
          ["Cơ chế hoạt động", "Cấp vé (**Ticket-based**: AS-REQ -> TGT -> TGS -> AP-REQ) qua trung tâm KDC", "Thử thách - Phản hồi (**Challenge-Response**) dựa trên mã băm mật khẩu"],
          ["Khi nào được kích hoạt?", "Khi truy cập tài nguyên trong Domain bằng **Tên máy / FQDN** (VD: `\\\\fs01.corp.local\\Share`)", "Khi truy cập bằng **Địa chỉ IP** (VD: `\\\\192.168.10.20\\Share`) hoặc trong mạng **Workgroup**"],
          ["Xác thực 2 chiều (Mutual Auth)", "**CÓ** (Cả Client và Server đều xác minh danh tính của nhau, chống giả mạo Server)", "**KHÔNG** (Chỉ Server xác thực Client)"],
          ["Yêu cầu đồng bộ thời gian", "**BẮT BUỘC** (Độ lệch giờ giữa Client và DC mặc định phải **<= 5 phút**)", "Không phụ thuộc chặt vào độ lệch giờ như Kerberos"],
          ["Port mạng chính sử dụng", "**TCP / UDP Port 88**", "Đi kèm bên trong giao thức ứng dụng (VD: SMB **TCP 445** / RPC **135** + Dynamic Ports)"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Có một câu châm ngôn bất hủ của dân SysAdmin Windows: <b>\"90% lỗi của Active Directory thực chất là lỗi của DNS!\"</b>. Tại sao lại như vậy?\n<ul><li><b>1. Nguyên lý tìm kiếm Domain Controller (DC Locator Process):</b> Khi cậu bấm nút Join Domain vào <code>corp.local</code>, máy trạm hoàn toàn mù tịt không biết IP nào trong mạng là Domain Controller. Việc đầu tiên nó làm là gửi gói tin truy vấn DNS (UDP/TCP 53) tới địa chỉ <b>Preferred DNS Server</b> đang cài trên card mạng để hỏi bản ghi <code>SRV</code> có tên: <code>_ldap._tcp.dc._msdcs.corp.local</code>. Nếu Preferred DNS trỏ ra <code>8.8.8.8</code>, máy chủ của Google sẽ trả về mã lỗi <code>NXDOMAIN</code> (Non-Existent Domain) vì <code>corp.local</code> chỉ tồn tại trong mạng LAN của cậu. Quá trình Join Domain lập tức thất bại!</li><li><b>2. Cái bẫy chết người khi đặt Preferred DNS = IP của DC và Alternate DNS = 8.8.8.8:</b> Nhiều bạn nghĩ rằng: <i>\"Mình đặt DNS dòng 1 là IP của DC (192.168.10.10), dòng 2 là 8.8.8.8 để lỡ DC tắt thì máy trạm vẫn vào mạng được\"</i>. Đây là một <b>sai lầm nghiêm trọng</b>! Trong Windows, nếu lúc nào đó DC phản hồi chậm chỉ vài mili-giây, dịch vụ DNS Client trên máy trạm sẽ chuyển sang hỏi dòng 2 (<code>8.8.8.8</code>) và nhận về câu trả lời khẳng định từ `8.8.8.8` rằng <i>\"Tên miền corp.local KHÔNG TỒN TẠI (Negative Cache)\"</i>. Máy trạm sẽ tin lời `8.8.8.8` và ngắt kết nối với Domain, không tải được GPO, không vào được File Server suốt hàng chục phút sau đó! <b>Cách chuẩn duy nhất:</b> Máy trạm CHỈ trỏ DNS về các máy chủ AD DNS nội bộ (DC01, DC02); còn bản thân DNS Server trên DC mới cấu hình <b>DNS Forwarders</b> chuyển tiếp các tên miền Internet ra <code>8.8.8.8</code> hoặc <code>1.1.1.1</code>.</li><li><b>3. Ba bước nhảy của Kerberos (The Kerberos 3-Way Dance):</b> Khi đăng nhập và truy cập File Server bằng tên miền, máy trạm trải qua 3 bước: (1) Xin vé tổng <b>TGT</b> từ Authentication Service (AS), (2) Dùng TGT xin vé dịch vụ <b>TGS (Service Ticket)</b> cho File Server từ Ticket Granting Service, và (3) Đưa vé TGS đó cho File Server để mở cửa.</li></ul>",
      flowTitle: "Luồng bản tin chi tiết: Từ Truy vấn DNS SRV -> Join Domain -> Xác thực Kerberos",
      flowSteps: [
        {
          step: "Bước 1",
          title: "DNS SRV Lookup — Tìm kiếm vị trí Domain Controller",
          detail: "Máy trạm PC01 gửi bản tin DNS Query hỏi bản ghi SRV `_ldap._tcp.dc._msdcs.corp.local` tới AD DNS Server (192.168.10.10). AD DNS trả về danh sách các máy chủ DC kèm Port 389 và địa chỉ IP tương ứng.",
          packetOrState: "DNS Query (UDP 53): SRV _ldap._tcp.dc._msdcs.corp.local -> Response: dc01.corp.local (192.168.10.10:389)"
        },
        {
          step: "Bước 2",
          title: "LDAP Ping (CLDAP) & Tạo Computer Account khi Join Domain",
          detail: "PC01 gửi gói tin CLDAP (UDP 389) tới DC01 để kiểm tra DC có đang sẵn sàng phục vụ không. Sau khi người quản trị nhập tài khoản Domain Admin, PC01 kết nối với DC01 để tạo đối tượng `PC01$` trong `CN=Computers` và thiết lập mật khẩu máy tính.",
          packetOrState: "CLDAP Ping (UDP 389) -> SAMR / RPC / LDAP -> Tạo Object: CN=PC01,CN=Computers,DC=corp,DC=local"
        },
        {
          step: "Bước 3",
          title: "Kerberos Bước 1 (AS-REQ / AS-REP): Đổi mật khẩu lấy Vé tổng TGT",
          detail: "Sau khi khởi động lại, nhân viên nhập `corp\\lan.nt` và mật khẩu. Máy trạm dùng Password Hash của `lan.nt` mã hóa mốc thời gian hiện tại (Timestamp) gửi trong gói AS-REQ tới KDC (Port 88). DC giải mã thành công sẽ trả về vé tổng TGT (có hạn mặc định 10 tiếng).",
          packetOrState: "Kerberos AS-REQ (Port 88) [Pre-Auth Timestamp] ---> KDC (DC01) ---> AS-REP [Cấp vé TGT]"
        },
        {
          step: "Bước 4",
          title: "Kerberos Bước 2 (TGS-REQ / TGS-REP): Dùng TGT đổi lấy Vé dịch vụ TGS",
          detail: "Khi `lan.nt` truy cập thư mục chia sẻ `\\\\fs01.corp.local\\KeToan`, máy trạm trình diện vé TGT lên KDC và yêu cầu cấp vé truy cập dịch vụ `cifs/fs01.corp.local` (SPN). KDC kiểm tra TGT hợp lệ và trả về vé dịch vụ TGS.",
          packetOrState: "Kerberos TGS-REQ [Kèm TGT + SPN: cifs/fs01.corp.local] ---> KDC ---> TGS-REP [Cấp Service Ticket]"
        },
        {
          step: "Bước 5",
          title: "Kerberos Bước 3 (AP-REQ / AP-REP): Trình vé trực tiếp cho File Server",
          detail: "Máy trạm gửi thẳng vé Service Ticket (TGS) qua kết nối SMB (Port 445) tới máy chủ File Server `FS01`. Máy `FS01` tự dùng khóa bí mật của chính nó để mở vé TGS, đọc danh sách SID của `lan.nt` và cho phép truy cập ngay mà KHÔNG CẦN hỏi lại Domain Controller!",
          packetOrState: "SMB Session Setup (TCP 445) [Gói AP-REQ chứa Service Ticket] ---> FS01 ---> Cho phép truy cập!"
        }
      ],
      asciiDiagram: ` TẠI SAO TRỎ DNS 8.8.8.8 THÌ LỖI, TRỎ VỀ DC THÌ THÀNH CÔNG? & TAM GIÁC KERBEROS
 =====================================================================================

 [A] KỊCH BẢN LỖI (Trỏ DNS 8.8.8.8) vs KỊCH BẢN CHUẨN (Trỏ DNS về DC -> Forwarder ra 8.8.8.8)

   +--------------+   (SAI) Hỏi: _ldap._tcp.dc._msdcs.corp.local?    +-------------------+
   | Máy trạm PC01| -----------------------------------------------> | DNS Google 8.8.8.8|
   |              | <----------------------------------------------- | "NXDOMAIN!" (Lỗi) |
   +--------------+                                                  +-------------------+
          |
          | (ĐÚNG) Preferred DNS = 192.168.10.10 (Tuyệt đối KHÔNG điền 8.8.8.8 ở Alternate DNS!)
          v
   +-----------------------------------+   Nếu hỏi google.com (Forwarder)  +-------------+
   | DC01 (AD-Integrated DNS Server)   | --------------------------------> |   8.8.8.8   |
   | IP: 192.168.10.10                 |                                   +-------------+
   | Chứa SRV: _ldap._tcp.dc._msdcs... |
   +-----------------------------------+

 [B] TAM GIÁC XÁC THỰC KERBEROS (PORT 88) — KHÔNG GỬI PASSWORD QUA MẠNG!

                          +------------------------------------+
                          |     DOMAIN CONTROLLER (KDC)        |
                          |  [AS: Cấp TGT] + [TGS: Cấp Vé DV]  |
                          +------------------------------------+
                             ^   |                      ^   |
         (1) AS-REQ (Port 88)|   | (2) AS-REP           |   | (4) TGS-REP
             Xin vé tổng     |   |     Nhận vé TGT      |   |     Nhận vé dịch vụ (cifs/fs01)
                             |   v                      |   v
   +-------------------------------+                  (3) TGS-REQ (Trình TGT xin vé vào FS01)
   |        MÁY TRẠM PC01          | -----------------------------------------------+
   |      (User: corp\\lan.nt)      |
   +-------------------------------+
                 |
                 | (5) AP-REQ (TCP 445): Trình thẳng Vé dịch vụ (Service Ticket) cho FS01
                 v
   +-------------------------------+
   |   FILE SERVER (fs01.corp...)  | ===> Tự giải mã vé bằng Key của FS01 -> Mở cửa!
   +-------------------------------+`,
      keyTakeaways: [
        "Máy trạm tìm Domain Controller bằng cách hỏi DNS bản ghi SRV: `_ldap._tcp.dc._msdcs.<tên_domain>`.",
        "Trên card mạng của máy trạm Join Domain: CHỈ khai báo IP của các AD DNS Server nội bộ, tuyệt đối KHÔNG điền `8.8.8.8` vào ô Alternate DNS (hãy cấu hình DNS Forwarders trên DC để ra Internet).",
        "Kerberos hoạt động bằng cơ chế Vé (TGT -> TGS) trên Port 88 khi gọi bằng Tên miền (FQDN) và yêu cầu lệch giờ tối đa 5 phút.",
        "Nếu truy cập máy khác bằng địa chỉ IP (`\\\\192.168.x.x`), Windows không dùng được Kerberos mà sẽ tự động hạ cấp xuống NTLM."
      ]
    },
    level3_practice: {
      scenario: "Cậu đang chuẩn bị Join một máy tính Windows 11 (`PC01`) vào domain `corp.local` (DC01 có IP `192.168.10.10`). Trước và sau khi Join, cậu cần biết cách dùng bộ công cụ dòng lệnh chuyên nghiệp để kiểm chứng bản ghi SRV, kiểm tra xem máy trạm đang xác thực với DC nào và xem các tấm vé Kerberos đang nằm trong bộ nhớ.",
      steps: [
        {
          title: "Bước 1: Kiểm tra bản ghi DNS SRV của Domain Controller bằng nslookup",
          instruction: "Trước khi bấm Join Domain trên máy trạm `PC01`, hãy mở CMD và chạy lệnh `nslookup` truy vấn kiểu `srv` để chắc chắn 100% máy trạm nhìn thấy bản ghi định vị Domain Controller.",
          commandOrConfig: `C:\\Users\\Admin> nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local
Server:  dc01.corp.local
Address:  192.168.10.10

_ldap._tcp.dc._msdcs.corp.local SRV service location:
          priority       = 0
          weight         = 100
          port           = 389
          svr hostname   = dc01.corp.local
dc01.corp.local internet address = 192.168.10.10`,
          explanation: "Nếu lệnh này trả về đúng `svr hostname = dc01.corp.local`, `port = 389` và địa chỉ IP `192.168.10.10`, cậu có thể tự tin 100% rằng cấu hình DNS đã chuẩn xác và bấm Join Domain chắc chắn thành công!"
        },
        {
          title: "Bước 2: Join máy trạm vào Domain và kiểm tra DC Locator bằng nltest",
          instruction: "Cậu có thể Join Domain qua GUI (`sysdm.cpl -> Change -> Domain: corp.local`) hoặc dùng lệnh PowerShell `Add-Computer`. Sau khi khởi động lại máy, hãy kiểm tra xem máy trạm đã tìm thấy và đang nói chuyện với DC nào.",
          commandOrConfig: `# Lệnh PowerShell để Join Domain nhanh (tự động khởi động lại):
PS C:\\> Add-Computer -DomainName "corp.local" -Credential "corp\\Administrator" -Restart

# Sau khi đăng nhập bằng tài khoản Domain, kiểm tra DC đang xác thực:
C:\\Users\\lan.nt> echo %LOGONSERVER%
\\\\DC01

C:\\Users\\lan.nt> nltest /dsgetdc:corp.local
           DC: \\\\DC01.corp.local
      Address: \\\\192.168.10.10
     Dom Guid: 8f3a12b4-5c9e-4d1a-9b22-112233445566
     Dom Name: corp.local
  Forest Name: corp.local
 Dc Site Name: Default-First-Site-Name
Our Site Name: Default-First-Site-Name
        Flags: PDC GC DS LDAP KDC TIMESERV GTIMESERV WRITABLE DNS_DC DNS_DOMAIN DNS_FOREST
The command completed successfully`,
          explanation: "Lệnh `nltest /dsgetdc:corp.local` cho cậu thấy toàn bộ năng lực của DC mà máy trạm đang kết nối: `PDC` (Primary Domain Controller Emulator), `GC` (Global Catalog), `LDAP`, `KDC` (Kerberos Center), `TIMESERV` (Đồng bộ thời gian NTP)."
        },
        {
          title: "Bước 3: Quan sát các tấm vé Kerberos (TGT & TGS) trên máy trạm bằng lệnh klist",
          instruction: "Sau khi đăng nhập và mở thử thư mục chia sẻ `\\\\dc01.corp.local\\SYSVOL`, hãy gõ lệnh `klist` trên CMD để tận mắt nhìn thấy các vé Kerberos đang lưu trong RAM.",
          commandOrConfig: `C:\\Users\\lan.nt> klist

Current LogonId is 0:0x1a4f82

Cached Tickets: (2)

#0>     Client: lan.nt @ CORP.LOCAL
        Server: krbtgt/CORP.LOCAL @ CORP.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
        Start Time: 10/12/2026 8:00:12 (local)
        End Time:   10/12/2026 18:00:12 (local)
        Renew Time: 10/19/2026 8:00:12 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96

#1>     Client: lan.nt @ CORP.LOCAL
        Server: cifs/dc01.corp.local @ CORP.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Start Time: 10/12/2026 8:05:30 (local)
        End Time:   10/12/2026 18:00:12 (local)`,
          explanation: "Hãy nhìn vào 2 tấm vé trong kết quả `klist`:\n- Vé `#0` có Server là `krbtgt/CORP.LOCAL`: Đây chính là **Vé tổng TGT** có thời hạn 10 tiếng (từ 8h sáng đến 18h chiều).\n- Vé `#1` có Server là `cifs/dc01.corp.local`: Đây chính là **Vé dịch vụ (Service Ticket / TGS)** dùng để truy cập dịch vụ chia sẻ file (CIFS/SMB) trên máy `dc01.corp.local`."
        },
        {
          title: "Bước 4: Kiểm tra và sửa lỗi kênh tin cậy (Secure Channel) giữa Máy trạm và DC",
          instruction: "Sử dụng PowerShell trên máy trạm để kiểm tra xem mật khẩu tài khoản máy tính (`PC01$`) có đang đồng bộ chuẩn với Domain Controller hay không.",
          commandOrConfig: `PS C:\\> Test-ComputerSecureChannel -Verbose
VERBOSE: Performing the operation "Test-ComputerSecureChannel" on target "PC01".
True
VERBOSE: The secure channel between the local computer and the domain corp.local is in good condition.

# Nếu trả về False (mất Trust Relationship), sửa ngay không cần Unjoin/Rejoin bằng lệnh:
PS C:\\> Test-ComputerSecureChannel -Repair -Credential (Get-Credential)`,
          explanation: "Trước đây khi gặp lỗi mất Trust Relationship, nhiều bạn phải tháo máy ra khỏi Workgroup, khởi động lại, rồi lại Join Domain và khởi động lại lần nữa (mất 15 phút). Với lệnh `Test-ComputerSecureChannel -Repair`, cậu chỉ mất đúng 5 giây để đồng bộ lại mật khẩu máy tính với DC mà không cần khởi động lại máy!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Khi bấm Join Domain vào `corp.local`, hệ thống báo lỗi ngay lập tức: 'An Active Directory Domain Controller (AD DC) for the domain \"corp.local\" could not be contacted'",
          hypothesis: "Card mạng của máy trạm đang trỏ DNS ra ngoài Internet (như 8.8.8.8 hoặc IP Router nhà mạng) thay vì trỏ về IP của AD DNS Server, hoặc dịch vụ Netlogon trên DC chưa đăng ký bản ghi SRV.",
          testCommand: "ipconfig /all && nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local",
          fix: "Chỉnh Preferred DNS trên card mạng máy trạm về đúng IP của DC (ví dụ `192.168.10.10`), xóa bỏ `8.8.8.8` ở ô Alternate DNS, sau đó chạy `ipconfig /flushdns` và thử Join lại."
        },
        {
          symptom: "Nhân viên bật một máy tính để lâu ngày không dùng (hoặc máy ảo vừa Revert Snapshot) và đăng nhập thì bị báo lỗi: 'The trust relationship between this workstation and the primary domain failed'",
          hypothesis: "Mật khẩu của Computer Account (`PC01$`) lưu trên máy trạm đã bị lệch so với mật khẩu lưu trong database `ntds.dit` trên Domain Controller (do cơ chế tự đổi mật khẩu ngầm mỗi 30 ngày).",
          testCommand: "Test-ComputerSecureChannel -Verbose",
          fix: "Rút dây mạng (để đăng nhập bằng Cached Credentials hoặc đăng nhập bằng tài khoản Local Admin), cắm lại dây mạng và chạy lệnh PowerShell: `Test-ComputerSecureChannel -Repair -Credential corp\\Administrator` (hoặc `netdom resetpwd`)."
        },
        {
          symptom: "Máy trạm ping tới DC thông suốt, phân giải DNS bình thường nhưng người dùng không thể đăng nhập Domain hoặc truy cập File Server bằng tên miền, báo lỗi liên quan đến Time Difference / Clock Skew",
          hypothesis: "Đồng hồ hệ thống trên máy trạm bị lệch quá 5 phút so với giờ của Domain Controller, khiến KDC từ chối cấp vé Kerberos (chống tấn công phát lại - Replay Attack).",
          testCommand: "w32tm /stripchart /computer:dc01.corp.local /samples:3 /dataonly",
          fix: "Chạy lệnh `w32tm /resync /force` và `net time \\\\dc01.corp.local /set /yes` trên máy trạm để đồng bộ lại thời gian chuẩn theo máy chủ PDC Emulator."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Trên máy tính nhân viên đã Join Domain, mình cấu hình Preferred DNS là IP của Domain Controller (192.168.10.10) và Alternate DNS là 8.8.8.8 của Google. Mình nghĩ làm vậy thì bình thường máy sẽ hỏi DC, còn khi nào DC bảo trì thì máy tự chuyển sang hỏi 8.8.8.8 để nhân viên vẫn lướt web được. Cấu hình như vậy có tốt không? Tại sao?",
          wrongAnswer: "Dạ cấu hình như vậy rất hợp lý ạ, vì Alternate DNS là DNS dự phòng, vừa giúp Join Domain được vừa đảm bảo không bị mất mạng Internet khi DC gặp sự cố.",
          rightAnswer: "Cấu hình như vậy là SAI nguyên tắc thiết kế Active Directory và sẽ gây ra lỗi chập chờn cực kỳ khó chịu! Lý do là dịch vụ DNS Client trên Windows không hiểu `8.8.8.8` chỉ dùng cho Internet. Khi máy chủ DC01 chỉ cần phản hồi chậm một nhịp ngắn, máy trạm sẽ chuyển sang hỏi Alternate DNS (`8.8.8.8`) để tìm các bản ghi nội bộ như `_ldap._tcp.dc._msdcs.corp.local` hoặc `fs01.corp.local`. Máy chủ Google `8.8.8.8` sẽ lập tức trả lời là `NXDOMAIN` (Tên miền này không tồn tại!). Khi nhận được câu trả lời `NXDOMAIN`, Windows hiểu đó là câu trả lời dứt khoát nên KHÔNG quay lại hỏi DC nữa mà lưu luôn vào bộ nhớ đệm (Negative Cache), dẫn đến máy trạm mất kết nối với Domain, không tải được GPO và không vào được File Server. Cách cấu hình chuẩn: Máy trạm CHỈ điền IP của các AD DNS nội bộ (Preferred = DC01, Alternate = DC02). Còn để nhân viên ra được Internet, ta cấu hình **DNS Forwarders** (chuyển tiếp ra 8.8.8.8 / 1.1.1.1) ngay bên trong dịch vụ DNS Server trên DC.",
          keyPoints: [
            "Khẳng định cấu hình Preferred = DC, Alternate = 8.8.8.8 là SAI và gây lỗi mất kết nối Domain chập chờn",
            "Giải thích cơ chế: Khi chuyển sang 8.8.8.8 và nhận mã lỗi `NXDOMAIN` cho tên miền nội bộ, máy trạm sẽ tin đó là thật và lưu Negative Cache",
            "Đưa ra giải pháp chuẩn: Client chỉ trỏ về các AD DNS nội bộ (DC01, DC02), còn trên DNS Server của DC thì cấu hình DNS Forwarders ra 8.8.8.8"
          ]
        },
        {
          question: "Trong cùng một mạng Domain đang hoạt động bình thường, tại sao khi cậu gõ `\\\\fs01.corp.local\\Data` thì máy dùng giao thức xác thực Kerberos, nhưng nếu cậu gõ bằng địa chỉ IP `\\\\192.168.10.20\\Data` (dù vẫn là cái máy File Server đó) thì Windows lại phải chuyển sang dùng NTLM?",
          wrongAnswer: "Vì gõ bằng IP thì nhanh hơn không cần qua DNS nên Windows tự chọn NTLM cho lẹ.",
          rightAnswer: "Nguyên nhân nằm ở cơ chế định danh dịch vụ **SPN (Service Principal Name)** của Kerberos. Khi máy trạm muốn xin vé dịch vụ (Service Ticket - TGS) từ KDC trên Domain Controller, nó bắt buộc phải cung cấp SPN của máy chủ đích (ví dụ `cifs/fs01.corp.local`). Trong cơ sở dữ liệu Active Directory, thuộc tính SPN của máy chủ chỉ đăng ký theo Hostname và FQDN chứ mặc định KHÔNG đăng ký theo địa chỉ IP. Vì vậy, khi người dùng truy cập bằng IP `\\\\192.168.10.20\\Data`, máy trạm không thể xin vé Kerberos cho một địa chỉ IP, buộc hệ điều hành phải tự động hạ cấp (Fallback) xuống giao thức xác thực cũ là **NTLM**.",
          keyPoints: [
            "Nhắc đến từ khóa cốt lõi: SPN (Service Principal Name)",
            "Giải thích: KDC cấp vé dịch vụ (TGS) dựa trên SPN (`cifs/hostname`), mà AD mặc định không đăng ký SPN bằng địa chỉ IP",
            "Kết luận: Không xin được vé Kerberos nên Windows buộc phải Fallback về NTLM"
          ]
        },
        {
          question: "Khi một máy trạm muốn tìm kiếm Domain Controller để Join Domain hoặc đăng nhập, chính xác là nó truy vấn bản ghi DNS loại gì và tên bản ghi đó có cấu trúc như thế nào?",
          wrongAnswer: "Máy trạm sẽ truy vấn bản ghi A hoặc CNAME của tên miền công ty để lấy địa chỉ IP của Domain Controller.",
          rightAnswer: "Máy trạm sẽ truy vấn bản ghi loại **SRV (Service Locator Record)** chứ không chỉ đơn thuần là bản ghi A. Cụ thể, để tìm dịch vụ thư mục LDAP trên Domain Controller, máy trạm sẽ hỏi bản ghi SRV có cấu trúc: `_ldap._tcp.dc._msdcs.<Tên_Domain>` (ví dụ `_ldap._tcp.dc._msdcs.corp.local`) và để tìm trung tâm cấp vé Kerberos sẽ hỏi `_kerberos._tcp.dc._msdcs.<Tên_Domain>`. Bản ghi SRV này sẽ trả về tên FQDN của máy chủ DC, cổng dịch vụ (Port 389 / Port 88) và kèm theo bản ghi A (IP) của DC đó.",
          keyPoints: [
            "Nêu đúng loại bản ghi: SRV (Service Locator Record)",
            "Đọc đúng cấu trúc bản ghi: `_ldap._tcp.dc._msdcs.<domain>` (và `_kerberos._tcp.dc._msdcs.<domain>`)",
            "Nêu được thông tin SRV trả về: Hostname của DC + Port dịch vụ (389 / 88) + Priority/Weight"
          ]
        }
      ],
      quizzes: [
        {
          question: "Giao thức xác thực Kerberos yêu cầu độ lệch thời gian tối đa mặc định giữa máy trạm (Client) và máy chủ Domain Controller (KDC) là bao nhiêu để chống tấn công phát lại (Replay Attack)?",
          options: [
            "Không giới hạn thời gian",
            "Tối đa 5 phút",
            "Tối đa 30 phút",
            "Tối đa 24 giờ"
          ],
          correctIndex: 1,
          explanation: "Theo chính sách Kerberos Policy mặc định trong Active Directory ('Maximum tolerance for computer clock synchronization'), độ lệch thời gian giữa Client và KDC không được vượt quá **5 phút**. Nếu lệch quá 5 phút, KDC sẽ từ chối gói AS-REQ với mã lỗi `KRB_AP_ERR_SKEW`."
        },
        {
          question: "Lệnh nào trên Windows giúp người quản trị kiểm tra danh sách các vé xác thực Kerberos (TGT và Service Tickets) đang được lưu trong bộ nhớ đệm của phiên đăng nhập hiện tại?",
          options: [
            "ipconfig /displaydns",
            "klist",
            "nslookup -type=srv",
            "netstat -ano"
          ],
          correctIndex: 1,
          explanation: "Lệnh `klist` dùng để hiển thị toàn bộ các vé Kerberos đang được cache trong phiên làm việc hiện tại. Ngoài ra, lệnh `klist purge` dùng để xóa toàn bộ các vé cũ và ép máy trạm xin lại vé mới từ KDC."
        },
        {
          question: "Tình huống: Một máy ảo Windows 10 đã Join Domain được 3 tháng. Hôm nay người quản trị khôi phục (Revert) máy ảo đó về bản Snapshot chụp cách đây 2 tháng thì không thể đăng nhập bằng tài khoản Domain được nữa với thông báo lỗi: 'The trust relationship between this workstation and the primary domain failed'. Nguyên nhân gốc rễ là gì?",
          options: [
            "Do mật khẩu của tài khoản người dùng (User Account) đã hết hạn sau 2 tháng",
            "Do bản ghi DNS A của máy trạm đã bị xóa khỏi DNS Server",
            "Do mật khẩu ẩn của tài khoản máy tính (Computer Account) tự động đổi mỗi 30 ngày, nên bản Snapshot cũ có mật khẩu máy tính không còn khớp với mật khẩu lưu trên Domain Controller",
            "Do dịch vụ DHCP trên máy chủ đã cấp địa chỉ IP mới cho máy trạm"
          ],
          correctIndex: 2,
          explanation: "Mặc định cứ mỗi 30 ngày, dịch vụ Netlogon trên máy trạm tự động đàm phán và thay đổi mật khẩu của Computer Account (`PC$`) với Domain Controller. Khi Revert về Snapshot 2 tháng trước, mật khẩu máy tính trên máy ảo bị quay ngược về giá trị cũ, không khớp với mật khẩu hiện tại trên DC, dẫn đến đứt gãy kênh tin cậy (Secure Channel)."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 09: AD USERS, GROUPS, NTFS, SMB SHARE
  // =========================================================================
  {
    id: 9,
    code: "09",
    week: 2,
    title: "AD Users, Security Groups, NTFS & SMB Share Permission",
    subtitle: "Nguyên tắc phân quyền AGDLP và công thức vàng tính Quyền hiệu lực (Effective Permissions)",
    priority: "P1",
    duration: "80 phút",
    whyThisMatters: "Cậu đã từng tạo thư mục chia sẻ cho các phòng ban dùng chung, nhưng trong phỏng vấn hầu như ai cũng bị hỏi bài toán kinh điển: \"Nếu ở tab Sharing mình cấp quyền Read, còn ở tab Security (NTFS) mình cấp quyền Full Control, thì khi nhân viên truy cập qua mạng sẽ có quyền gì? Còn nếu nhân viên đó ngồi trực tiếp trên máy chủ File Server thì có quyền gì?\". Hơn nữa, việc phân biệt kế thừa quyền (Inheritance) và nguyên tắc AGDLP chính là thước đo phân biệt một IT làm theo thói quen với một SysAdmin hiểu bản chất.",
    analogy: {
      title: "Trạm Gác Cổng Khu Chung Cư (SMB Share) & Khóa Từ Cửa Từng Căn Hộ (NTFS)",
      content: "Để không bao giờ nhầm lẫn giữa **Share Permission** và **NTFS Permission**, cậu hãy hình dung máy chủ File Server là một **Tòa chung cư cao cấp**:\n\n- **SMB Share Permission (Tab Sharing)**: Chính là **Trạm gác bảo vệ ở Cổng chính** của chung cư. Trạm gác này chỉ kiểm tra những người **đi từ ngoài đường vào qua cổng mạng (`\\\\Server\\Share`)**. Bảo vệ cổng chỉ có 3 tấm biển đơn giản: *Chỉ được vào ngắm (Read)*, *Được phép sửa đồ đạc (Change)*, hoặc *Toàn quyền (Full Control)*. Nhưng một khi đã bước qua cổng chính rồi, bảo vệ cổng không thể đi theo cậu vào từng phòng nhỏ bên trong được!\n- **NTFS Permission (Tab Security)**: Chính là **Hệ thống khóa vân tay gắn trên từng cánh cửa phòng, từng ngăn tủ, từng két sắt** bên trong tòa nhà. Dù cậu đi từ ngoài đường qua cổng mạng vào, hay cậu là quản lý tòa nhà **ngồi trực tiếp bên trong chung cư (Logon Local / Remote Desktop)** không đi qua cổng chính, cậu đều phải chịu sự kiểm soát của khóa cửa NTFS ở từng phòng!\n\n**Quy tắc kết hợp:** Khi một người đi từ ngoài mạng vào (`\\\\Server\\Share`), họ phải đi qua **CẢ 2 LỚP CỬA** (Cổng Share + Cửa phòng NTFS). Cửa nào **khắt khe hơn (hẹp hơn)** sẽ quyết định hành động cuối cùng họ làm được!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Security Group vs Distribution Group",
          shortDef: "Security Group là nhóm có mã định danh bảo mật SID dùng để cấp quyền truy cập tài nguyên (File, Folder, Printer) và lọc GPO; còn Distribution Group không có SID, chỉ dùng để làm danh sách gửi email hàng loạt trong hệ thống mail như Exchange.",
          easyExplain: "Khi tạo Group trong Active Directory, hệ thống luôn hỏi cậu chọn **Group Type**: `Security` hay `Distribution`. Hãy nhớ: Nếu mục đích có dính dáng đến phân quyền hệ thống, bắt buộc phải chọn **Security**. Ngoài ra còn có **Group Scope** (Phạm vi nhóm): `Domain Local` (gắn trực tiếp quyền lên tài nguyên), `Global` (gom các User cùng phòng ban trong 1 Domain), và `Universal` (gom nhóm xuyên qua nhiều Domain trong Forest).",
          realExample: "Nhóm `SG_KeToan_ReadWrite` là Security Group dùng để cấp quyền sửa file lương; còn nhóm `All_Staff_Email` là Distribution Group để phòng Nhân sự gửi thông báo nghỉ lễ cho toàn công ty."
        },
        {
          term: "Nguyên tắc AGDLP (Chuẩn phân quyền của Microsoft)",
          shortDef: "AGDLP là quy tắc phân quyền chuẩn: Đưa tài khoản User (A - Account) vào nhóm phòng ban Global Group (G), lồng nhóm đó vào nhóm quyền hạn Domain Local Group (DL), rồi mới gán quyền (P - Permission) cho nhóm Domain Local.",
          easyExplain: "Tuyệt đối không bao giờ gán quyền thư mục trực tiếp cho từng cá nhân (User lẻ)! Vì nếu công ty có 200 người chuyển bộ phận hoặc nghỉ việc, cậu sẽ phát điên khi phải mở từng thư mục con để xóa tên họ. Với **AGDLP** (hoặc rút gọn trong 1 Domain là **AGP**: `Account -> Group -> Permission`), khi có nhân viên kế toán mới vào, cậu chỉ cần thêm họ vào nhóm Kế toán trong AD là họ tự động có đủ mọi quyền trên File Server ngay lập tức.",
          realExample: "User `lan.nt` (A) -> thêm vào nhóm chức danh `G_PhongKeToan` (G) -> thêm vào nhóm quyền tài nguyên `DL_FolderKeToan_Modify` (DL) -> cấp quyền NTFS `Modify` trên thư mục `E:\\Shares\\KeToan` (P)."
        },
        {
          term: "SMB Share Permission (Quyền chia sẻ qua mạng)",
          shortDef: "Share Permission là lớp phân quyền đơn giản chỉ có hiệu lực khi người dùng truy cập thư mục thông qua đường truyền mạng (giao thức SMB/CIFS `\\\\Server\\Share`) với 3 mức quyền: Read, Change và Full Control.",
          easyExplain: "Share Permission có 2 đặc điểm giới hạn rất rõ: (1) Nó chỉ áp dụng ở **cấp thư mục gốc được Share**, hoàn toàn không thể phân quyền chi tiết cho từng thư mục con hay từng file lẻ bên trong; (2) Nó **vô tác dụng** nếu người dùng đăng nhập trực tiếp tại máy chủ đó (Local Logon / RDP) và mở ổ `D:\\Data` bằng File Explorer.",
          realExample: "Trên tab `Sharing -> Advanced Sharing -> Permissions`, mặc định khi mới bật Share trên Windows, Microsoft để quyền là `Everyone = Read`."
        },
        {
          term: "NTFS Permission (Quyền hệ thống tệp NTFS)",
          shortDef: "NTFS Permission là lớp phân quyền bảo mật sâu ở cấp hệ thống tệp tin trên ổ đĩa định dạng NTFS, kiểm soát chi tiết đến từng thư mục con và từng file lẻ đối với cả người truy cập qua mạng lẫn người đăng nhập trực tiếp tại máy.",
          easyExplain: "NTFS cung cấp 6 mức quyền tiêu chuẩn (Standard Permissions) từ thấp đến cao:\n- **Read** (Đọc file)\n- **List folder contents** (Liệt kê danh sách trong thư mục)\n- **Read & Execute** (Đọc và chạy file thực thi)\n- **Write** (Tạo file/thư mục mới, ghi dữ liệu)\n- **Modify** (Đọc + Ghi + **Xóa** file/thư mục — đây là quyền phổ biến nhất cấp cho nhân viên!)\n- **Full Control** (Toàn quyền bao gồm cả việc **Sửa bảng phân quyền ACL** và **Chiếm quyền sở hữu Take Ownership** — chỉ dành cho Admin!).",
          realExample: "Nhân viên phòng Kế toán chỉ nên được cấp quyền NTFS là **Modify** (để đọc, tạo, sửa, xóa file Excel), tuyệt đối không cấp **Full Control** để tránh họ tự ý xóa quyền của Admin hoặc cấp quyền cho người lạ."
        },
        {
          term: "NTFS Inheritance (Kế thừa quyền) & Explicit Permission",
          shortDef: "Inheritance là cơ chế mặc định trong đó thư mục con và file tự động nhận lại toàn bộ các quyền NTFS từ thư mục cha phía trên; còn Explicit Permission là quyền được quản trị viên gán trực tiếp vào chính đối tượng đó.",
          easyExplain: "Giả sử thư mục cha `E:\\Data\\KeToan` cho phép cả phòng Kế toán xem. Nhưng bên trong có thư mục con `E:\\Data\\KeToan\\BangLuongBanGiamDoc` chỉ dành riêng cho Kế toán trưởng. Để chặn các kế toán viên thường không xem được thư mục con này, cậu phải vào thư mục con đó và bấm **Disable Inheritance (Tắt kế thừa)** -> chọn **Convert inherited permissions into explicit permissions**, sau đó xóa nhóm Kế toán viên thường đi.",
          realExample: "Trong cửa sổ `Advanced Security Settings`, các dòng quyền bị mờ (không bấm Remove trực tiếp được) là `Inherited from E:\\Data\\`; muốn xóa chúng phải bấm nút `Disable inheritance` trước."
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt toàn diện: SMB Share Permission vs NTFS Permission",
        headers: ["Tiêu chí so sánh", "SMB Share Permission (Tab Sharing)", "NTFS Permission (Tab Security)"],
        rows: [
          ["Khi nào có hiệu lực?", "CHỈ khi truy cập qua mạng (`\\\\Server\\Share` qua Port 445)", "Luôn có hiệu lực: Cả khi truy cập **qua mạng** LẪN khi đăng nhập **trực tiếp tại máy (Local/RDP)**"],
          ["Độ chi tiết (Granularity)", "Chỉ áp dụng cho toàn bộ **thư mục gốc được Share** (không chỉnh riêng được cho thư mục con/file)", "Áp dụng chi tiết đến **từng thư mục con, từng file lẻ**"],
          ["Các mức quyền", "3 mức: **Read**, **Change**, **Full Control**", "6 mức chuẩn: **Read, List Folder, Read & Execute, Write, Modify, Full Control** (+ 14 Special Permissions)"],
          ["Cấu hình theo Best Practice thực tế", "Mở rộng ở cổng ngoài: Cấp cho **`Authenticated Users` = `Change` (hoặc `Full Control`)**, xóa `Everyone`", "Siết chặt ở bên trong: Phân quyền chi tiết theo từng **Security Group** (chỉ cấp tối đa đến `Modify` cho User)"],
          ["Quy tắc khi kết hợp cả hai", "Khi đi qua mạng: Lấy **MỨC QUYỀN HẸP NHẤT (Most Restrictive / Phần giao)** giữa tổng quyền Share và tổng quyền NTFS", "Khi ngồi trực tiếp tại máy chủ: Bỏ qua hoàn toàn Share Permission, **chỉ tính riêng NTFS Permission**"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Để giải đúng 100% mọi bài toán phỏng vấn về phân quyền Windows Server, cậu chỉ cần thuộc lòng **Bộ 3 Quy Tắc Vàng tính Effective Permissions (Quyền hiệu lực)** và **Quy tắc Copy/Move file trên NTFS**:\n<ul><li><b>Quy tắc 1 — Trong cùng một lớp (khi User thuộc nhiều Group): Quyền Allow được CỘNG GỘP (Cumulative / Hợp $\\cup$).</b> Ví dụ: Trong tab NTFS, User <code>Nam</code> thuộc <code>Group_A</code> (có quyền <i>Read</i>) và đồng thời thuộc <code>Group_B</code> (có quyền <i>Write</i>). Tổng quyền NTFS của Nam sẽ là: <code>Read + Write</code>.</li><li><b>Quy tắc 2 — Khi đi qua mạng kết hợp Share và NTFS: Lấy PHẦN GIAO HẸP NHẤT (Most Restrictive / Giao $\\cap$).</b> Sau khi tính xong tổng quyền bên phía Share và tổng quyền bên phía NTFS, ta so sánh 2 bên và lấy bên nào <b>thấp hơn (khắt khe hơn)</b>. Ví dụ: Tổng quyền Share của Nam là <code>Read</code>, còn tổng quyền NTFS của Nam là <code>Full Control</code> $\\rightarrow$ Khi Nam truy cập qua mạng <code>\\\\FS01\\Data</code>, quyền thực tế cuối cùng (Effective Permission) của Nam chỉ là <b><code>Read</code></b>! (Nhưng nếu Nam ngồi trực tiếp trên máy FS01 mở ổ <code>E:\\Data</code> thì Nam có <b><code>Full Control</code></b> vì không đi qua SMB Share).</li><li><b>Quy tắc 3 — Quyền DENY luôn thắng quyền ALLOW ở cùng cấp độ:</b> Thứ tự ưu tiên tuyệt đối của Windows ACL là: <b>Explicit Deny (Từ chối trực tiếp) > Explicit Allow (Cho phép trực tiếp) > Inherited Deny (Từ chối kế thừa) > Inherited Allow (Cho phép kế thừa)</b>. Chính vì quyền Deny có sức sát thương cực mạnh (chỉ cần dính 1 Group bị Deny là mất sạch quyền ở các Group khác), trong thực tế quản trị <b>hạn chế tối đa việc tích chọn ô Deny</b>, thay vào đó hãy tắt Inheritance và xóa (Remove) Group không mong muốn khỏi danh sách Allow!</li><li><b>Quy tắc 4 — Copy vs Move file trên phân vùng NTFS:</b>\n  <br/>• <b>COPY file/folder</b> (dù cùng ổ đĩa hay khác ổ đĩa): Bản sao mới tạo ra luôn <b>nhận quyền kế thừa của THƯ MỤC ĐÍCH</b>.\n  <br/>• <b>MOVE (Cut/Paste) KHÁC ổ đĩa</b> (VD từ ổ C: sang ổ D:): Bản chất là Copy sang ổ D: rồi xóa ở ổ C:, nên file sẽ <b>nhận quyền của THƯ MỤC ĐÍCH</b>.\n  <br/>• <b>MOVE (Cut/Paste) CÙNG ổ đĩa NTFS</b> (VD từ <code>D:\\Temp</code> sang <code>D:\\KeToan</code>): Hệ điều hành chỉ cập nhật con trỏ vị trí trong bảng MFT mà không tạo file mới, nên file sẽ <b>GIỮ NGUYÊN quyền cũ của nó ở thư mục nguồn</b>! (Đây là câu hỏi bẫy cực kỳ phổ biến!).</li></ul>",
      flowTitle: "Thuật toán 4 bước tính Effective Permission khi User truy cập File qua mạng",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Khởi tạo Access Token lúc User đăng nhập (Logon)",
          detail: "Khi nhân viên `nam.nv` đăng nhập vào máy tính, Domain Controller kiểm tra xem `nam.nv` là thành viên của những Security Group nào (ví dụ `SG_KeToan`, `SG_CongDoan`) và đóng gói toàn bộ SID của User + SID các Group đó vào một tấm thẻ gọi là **Access Token**.",
          packetOrState: "Access Token của nam.nv = [SID_nam.nv, SID_AuthenticatedUsers, SID_SG_KeToan, SID_SG_CongDoan]"
        },
        {
          step: "Bước 2",
          title: "Bước 1 của công thức: Cộng gộp quyền ở lớp SMB Share",
          detail: "Khi `nam.nv` kết nối vào `\\\\FS01\\TaiLieu`, dịch vụ SMB kiểm tra bảng Share Permission: `SG_KeToan` có quyền `Read`, `SG_CongDoan` có quyền `Change`. Cộng gộp lại, tổng quyền phía Share của `nam.nv` là `Change`.",
          packetOrState: "Tổng Share Permission = Read U Change = [CHANGE (Read + Write + Delete)]"
        },
        {
          step: "Bước 3",
          title: "Bước 2 của công thức: Cộng gộp quyền và xét Deny ở lớp NTFS",
          detail: "Tiếp theo, hệ điều hành kiểm tra bảng NTFS ACL (DACL) của thư mục `E:\\TaiLieu`: `SG_KeToan` có quyền `Read & Execute`, `SG_CongDoan` có quyền `Read`. Không có dòng Deny nào. Cộng gộp lại, tổng quyền phía NTFS của `nam.nv` là `Read & Execute`.",
          packetOrState: "Tổng NTFS Permission = Read & Execute U Read = [READ & EXECUTE]"
        },
        {
          step: "Bước 4",
          title: "Bước 3 của công thức: Lấy phần giao hẹp nhất (Share ∩ NTFS)",
          detail: "Hệ thống đem so sánh Tổng quyền Share (`Change`) và Tổng quyền NTFS (`Read & Execute`). Mức quyền khắt khe hơn (hẹp hơn) giữa hai bên chính là `Read & Execute`.",
          packetOrState: "Effective Permission (Qua mạng) = Min(Change, Read & Execute) = [READ & EXECUTE] (Không sửa/xóa được!)"
        }
      ],
      asciiDiagram: ` SƠ ĐỒ BÀI TOÁN TÍNH EFFECTIVE PERMISSIONS (QUYỀN HIỆU LỰC)
 =====================================================================================
 Giả sử User [Nam] thuộc 2 nhóm: [Group_A] và [Group_B]. Nam truy cập \\\\FS01\\DuAn

   +-------------------+         LỚP 1: CỔNG MẠNG SMB SHARE        LỚP 2: CỬA PHÒNG NTFS
   |   USER: NAM       |        +---------------------------+    +---------------------------+
   | - Thuộc Group_A   | =====> | Group_A : Read            |    | Group_A : Modify          |
   | - Thuộc Group_B   |  Qua   | Group_B : Full Control    |    | Group_B : Read            |
   +-------------------+  mạng  +---------------------------+    +---------------------------+
                                              |                                |
                                (1) Cộng gộp trong lớp Share     (2) Cộng gộp trong lớp NTFS
                                    Read + Full Control              Modify + Read
                                              |                                |
                                              v                                v
                                  [ Tổng Share = FULL CONTROL ]     [ Tổng NTFS = MODIFY ]
                                              \\                                /
                                               \\                              /
                                        (3) Kết hợp Share & NTFS: Lấy bên HẸP HƠN!
                                                 \\                          /
                                                  v                        v
                                       +----------------------------------------------+
                                       | QUYỀN HIỆU LỰC CUỐI CÙNG (EFFECTIVE) = MODIFY|
                                       +----------------------------------------------+

 * LƯU Ý ĐẶC BIỆT KHI THÊM USER VÀO GROUP MỚI:
   Access Token chỉ được tạo lúc ĐĂNG NHẬP (Logon). Nếu Admin vừa thêm Nam vào [Group_C],
   Nam PHẢI Logoff rồi Logon lại (hoặc chạy lệnh 'klist purge') thì mới nhận được quyền của Group_C!`,
      keyTakeaways: [
        "Công thức tính quyền qua mạng: Cộng gộp (Union) trong từng lớp Share và NTFS trước, sau đó lấy mức HẸP NHẤT (Most Restrictive) giữa Share và NTFS.",
        "Explicit Deny luôn thắng Explicit Allow. Trong thực tế, tránh dùng Deny — hãy tắt kế thừa (Disable Inheritance -> Convert) rồi Remove nhóm không cần thiết.",
        "Best Practice triển khai File Server: Ở Share Permission cấp `Authenticated Users = Change/Full Control`, sau đó phân quyền chi tiết ở NTFS Permission cho từng Security Group (tối đa mức `Modify` cho nhân viên).",
        "Khi thêm một User vào Security Group mới, User đó phải **Đăng xuất và Đăng nhập lại (Logoff/Logon)** để làm mới Access Token thì quyền mới có hiệu lực!"
      ]
    },
    level3_practice: {
      scenario: "Công ty yêu cầu cậu thiết lập thư mục chia sẻ `C:\\Shares\\KeToan` trên File Server sao cho: Toàn bộ nhân viên kế toán (`SG_KeToan_Staff`) được phép đọc, tạo, sửa, xóa file (quyền `Modify`); riêng thư mục con `C:\\Shares\\KeToan\\BaoCaoThue_Mat` chỉ cho phép Kế toán trưởng (`SG_KeToan_Manager`) truy cập, nhân viên kế toán thường không được phép mở.",
      steps: [
        {
          title: "Bước 1: Tạo các Security Group theo chuẩn AGDLP và thêm nhân viên vào nhóm",
          instruction: "Trên Domain Controller, tạo 2 nhóm bảo mật `SG_KeToan_Staff` và `SG_KeToan_Manager`, sau đó thêm tài khoản nhân viên `lan.nt` vào nhóm Staff và `hoa.tt` vào nhóm Manager.",
          commandOrConfig: `PS C:\\> New-ADGroup -Name "SG_KeToan_Staff" -GroupScope Global -GroupCategory Security -Path "OU=PhongKeToan,DC=corp,DC=local"
PS C:\\> New-ADGroup -Name "SG_KeToan_Manager" -GroupScope Global -GroupCategory Security -Path "OU=PhongKeToan,DC=corp,DC=local"

PS C:\\> Add-ADGroupMember -Identity "SG_KeToan_Staff" -Members "lan.nt"
PS C:\\> Add-ADGroupMember -Identity "SG_KeToan_Manager" -Members "hoa.tt"`,
          explanation: "Phân tách rõ nhóm nhân viên (`Staff`) và nhóm quản lý (`Manager`) ngay từ đầu giúp cậu kiểm soát quyền hạn cực kỳ linh hoạt mà không bao giờ phải gán quyền cho từng User lẻ."
        },
        {
          title: "Bước 2: Tạo thư mục và cấu hình SMB Share Permission chuẩn Best Practice",
          instruction: "Tạo thư mục `C:\\Shares\\KeToan` và thư mục con `BaoCaoThue_Mat`. Khi bật chia sẻ SMB, thay vì giữ mặc định `Everyone = Read`, ta cấp `Authenticated Users = Change` và `Domain Admins = Full Control`.",
          commandOrConfig: `PS C:\\> New-Item -Path "C:\\Shares\\KeToan\\BaoCaoThue_Mat" -ItemType Directory -Force

# Tạo SMB Share chuẩn Best Practice bằng PowerShell (hoặc qua tab Sharing -> Advanced Sharing):
PS C:\\> New-SmbShare -Name "KeToan$" -Path "C:\\Shares\\KeToan" -FullAccess "CORP\\Domain Admins" -ChangeAccess "Authenticated Users"

PS C:\\> Get-SmbShareAccess -Name "KeToan$"
Name     ScopeName AccountName               AccessControlType AccessRight
----     --------- -----------               ----------------- -----------
KeToan$  *         CORP\\Domain Admins        Allow             Full
KeToan$  *         NT AUTHORITY\\Authenticated Users Allow      Change`,
          explanation: "Mẹo thực chiến: Đặt dấu `$` ở cuối tên Share (`KeToan$`) sẽ biến nó thành **Hidden Share (Chia sẻ ẩn)** — người ngoài gõ `\\\\FS01` sẽ không nhìn thấy thư mục này, chỉ những ai được Map ổ đĩa mạng qua GPO mới thấy. Và việc đặt `Authenticated Users = Change` ở cổng Share giúp cổng Share không cản trở quyền NTFS bên trong."
        },
        {
          title: "Bước 3: Cấu hình NTFS Permission trên thư mục cha và Tắt kế thừa (Disable Inheritance) ở thư mục con nhạy cảm",
          instruction: "Trên GUI: Chuột phải vào `C:\\Shares\\KeToan` -> `Properties -> Security -> Advanced` -> Thêm `SG_KeToan_Staff` (Modify) và `SG_KeToan_Manager` (Modify). Sau đó vào thư mục con `BaoCaoThue_Mat` -> `Security -> Advanced` -> bấm **Disable inheritance** -> chọn **Convert inherited permissions into explicit permissions on this object** -> Xóa (Remove) nhóm `SG_KeToan_Staff` và `Users` đi. Dưới đây là lệnh `icacls` tương đương:",
          commandOrConfig: `# 1. Cấp quyền Modify (M) kế thừa xuống toàn bộ thư mục con và file (OI)(CI) trên thư mục cha:
C:\\> icacls "C:\\Shares\\KeToan" /grant "CORP\\SG_KeToan_Staff:(OI)(CI)M" "CORP\\SG_KeToan_Manager:(OI)(CI)M"

# 2. Tắt kế thừa (/inheritance:d = Disable & Convert) trên thư mục con nhạy cảm và gỡ bỏ nhóm Staff + Users:
C:\\> icacls "C:\\Shares\\KeToan\\BaoCaoThue_Mat" /inheritance:d
C:\\> icacls "C:\\Shares\\KeToan\\BaoCaoThue_Mat" /remove:g "CORP\\SG_KeToan_Staff" "BUILTIN\\Users"

# 3. Kiểm tra lại bảng ACL của thư mục nhạy cảm:
C:\\> icacls "C:\\Shares\\KeToan\\BaoCaoThue_Mat"
C:\\Shares\\KeToan\\BaoCaoThue_Mat NT AUTHORITY\\SYSTEM:(OI)(CI)(F)
                                BUILTIN\\Administrators:(OI)(CI)(F)
                                CORP\\SG_KeToan_Manager:(OI)(CI)(M)`,
          explanation: "Hãy chú ý cách chúng ta xử lý thư mục `BaoCaoThue_Mat`: Chúng ta **tắt kế thừa (`/inheritance:d`) rồi xóa nhóm `SG_KeToan_Staff`** khỏi danh sách, chứ KHÔNG dùng quyền Deny! Và đặc biệt, luôn giữ lại quyền Full Control `(F)` cho `SYSTEM` và `Administrators` để hệ thống sao lưu (Backup) và Admin vẫn quản lý được."
        },
        {
          title: "Bước 4: Sử dụng công cụ Effective Access để kiểm chứng quyền thực tế",
          instruction: "Để kiểm tra xem User `lan.nt` có thực sự bị chặn ở thư mục `BaoCaoThue_Mat` không mà không cần hỏi mật khẩu của `lan.nt`, cậu mở `Properties -> Security -> Advanced -> Tab Effective Access -> Select a user (lan.nt) -> View effective access`.",
          commandOrConfig: `Kết quả trên tab Effective Access đối với User: CORP\\lan.nt
- Tại thư mục C:\\Shares\\KeToan:
  [x] Full control: No (X)
  [x] Modify / Read / Write / Delete: Yes (V)
- Tại thư mục C:\\Shares\\KeToan\\BaoCaoThue_Mat:
  [x] Traverse folder / Read / Write / Modify: No (X) -> Tất cả các dòng đều có dấu X đỏ (Access Denied)`,
          explanation: "Tab **Effective Access** chính là vũ khí bí mật của SysAdmin để kiểm tra kết quả phân quyền (tính cả các Group lồng nhau và Share Permission nếu chọn đúng đường dẫn) trước khi bàn giao cho người dùng."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Đã vào tab Security (NTFS) cấp quyền Modify/Full Control cho nhóm Kế toán nhưng nhân viên truy cập qua mạng `\\\\FS01\\KeToan` chỉ mở xem được file, cứ bấm lưu hoặc tạo thư mục mới là báo 'You need permission to perform this action'",
          hypothesis: "Quên chưa chỉnh SMB Share Permission! Mặc định khi bật Share trên Windows, Share Permission chỉ là `Everyone = Read`. Theo quy tắc lấy phần giao hẹp nhất: `Share (Read)` ∩ `NTFS (Modify)` = `Read`.",
          testCommand: "Get-SmbShareAccess -Name 'KeToan' (hoặc kiểm tra tab Sharing -> Advanced Sharing -> Permissions)",
          fix: "Vào `Sharing -> Advanced Sharing -> Permissions`, thêm `Authenticated Users` với quyền `Change` (và `Domain Admins` quyền `Full Control`), sau đó xóa `Everyone`."
        },
        {
          symptom: "Vừa thêm nhân viên `lan.nt` vào nhóm `SG_KeToan_Manager` trên Domain Controller, nhưng `lan.nt` mở ngay thư mục `BaoCaoThue_Mat` trên máy trạm vẫn bị báo Access Denied",
          hypothesis: "Access Token của `lan.nt` trên máy trạm được sinh ra từ lúc đăng nhập buổi sáng nên chưa chứa SID của nhóm `SG_KeToan_Manager` mới được thêm vào.",
          testCommand: "whoami /groups (chạy trên máy trạm của lan.nt để xem danh sách Group trong Access Token hiện tại)",
          fix: "Yêu cầu `lan.nt` **Sign out (Logoff) rồi Sign in (Logon) lại** vào máy tính (hoặc chạy lệnh `klist purge` và đóng mở lại File Explorer) để nhận Access Token và vé Kerberos mới có chứa SID của Group mới."
        },
        {
          symptom: "Khi tắt kế thừa (Disable Inheritance) cho một thư mục con, người quản trị lỡ bấm 'Remove all inherited permissions' và bấm OK ngay, dẫn đến chính tài khoản Administrator cũng bị mất sạch quyền truy cập vào thư mục đó!",
          hypothesis: "Bảng DACL của thư mục đã bị rỗng hoàn toàn (xóa mất cả `Administrators` và `SYSTEM`).",
          testCommand: "icacls \"C:\\Shares\\KeToan\\BaoCaoThue_Mat\"",
          fix: "Sử dụng quyền tối cao của nhóm Administrators là **Take Ownership (Chiếm quyền sở hữu)**: Vào `Security -> Advanced -> mục Owner ở trên cùng bấm Change -> chọn Administrators -> tích Replace owner on subcontainers and objects`, hoặc chạy lệnh CMD: `takeown /f \"C:\\Shares\\KeToan\\BaoCaoThue_Mat\" /r /d y` rồi dùng `icacls` cấp lại quyền Full Control cho `Administrators`."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Bài toán phỏng vấn thực tế: User 'An' thuộc 2 nhóm là Group1 và Group2. Thư mục 'DuAn' được chia sẻ với cấu hình như sau:\n- SMB Share Permission: Group1 = Read, Group2 = Change.\n- NTFS Permission: Group1 = Modify, Group2 = Read.\nHỏi: (1) Khi An truy cập qua mạng `\\\\Server\\DuAn` thì An có quyền gì? (2) Nếu An ngồi trực tiếp trên máy Server mở `D:\\DuAn` thì An có quyền gì?",
          wrongAnswer: "Khi truy cập qua mạng, ở Group1 thì Share là Read và NTFS là Modify nên ra Read; ở Group2 thì Share là Change và NTFS là Read nên cũng ra Read. Vậy An chỉ có quyền Read thôi ạ.",
          rightAnswer: "Cách tính từng Group riêng lẻ như vậy là bẫy rất nhiều người mắc! Theo đúng thuật toán của Windows, ta phải **Cộng gộp (Union) trong từng lớp trước, rồi mới lấy phần giao hẹp nhất giữa 2 lớp**:\n- Bước 1 (Tính tổng quyền SMB Share của An): `Group1 (Read)` + `Group2 (Change)` = **`Change`**.\n- Bước 2 (Tính tổng quyền NTFS của An): `Group1 (Modify)` + `Group2 (Read)` = **`Modify`**.\n- Kết luận câu (1): Khi An truy cập qua mạng `\\\\Server\\DuAn`, ta lấy phần hẹp hơn giữa `Share (Change)` và `NTFS (Modify)` $\\rightarrow$ An có đầy đủ quyền **`Change / Modify`** (Đọc, Ghi, Sửa, Xóa file)!\n- Kết luận câu (2): Khi An đăng nhập trực tiếp tại máy Server và mở `D:\\DuAn`, hệ thống bỏ qua hoàn toàn SMB Share Permission và chỉ xét NTFS Permission $\\rightarrow$ An có quyền **`Modify`**.",
          keyPoints: [
            "Nêu rõ quy tắc: Cộng gộp (Cumulative) trong nội bộ Share và nội bộ NTFS trước, sau đó mới lấy Most Restrictive giữa 2 lớp",
            "Tính đúng câu (1) qua mạng: Tổng Share = Change, Tổng NTFS = Modify -> Kết quả = Change/Modify (chứ KHÔNG phải Read!)",
            "Tính đúng câu (2) tại máy cục bộ: Không đi qua SMB nên chỉ tính NTFS -> Kết quả = Modify"
          ]
        },
        {
          question: "Trên cùng một máy chủ File Server, nếu mình dùng thao tác Cut & Paste (Move) một file báo cáo từ thư mục `D:\\PhongNhanSu` (chỉ phòng Nhân sự đọc được) sang thư mục `D:\\PhongKeToan` (chỉ phòng Kế toán đọc được), hỏi sau khi Move xong thì nhân viên phòng Kế toán có mở được file đó không? Tại sao?",
          wrongAnswer: "Dạ mở được bình thường ạ, vì file đã nằm trong thư mục Phòng Kế Toán rồi thì nó sẽ tự nhận quyền của thư mục Phòng Kế Toán.",
          rightAnswer: "Nhân viên phòng Kế toán sẽ **KHÔNG MỞ ĐƯỢC** (bị báo Access Denied)! Lý do nằm ở nguyên lý xử lý của hệ thống tệp NTFS: Khi thực hiện thao tác **Move (Cut & Paste) một file giữa hai thư mục nằm trên CÙNG MỘT PHÂN VÙNG Ổ ĐĨA NTFS (cùng ổ D:)**, hệ điều hành không hề tạo ra file mới mà chỉ cập nhật lại đường dẫn con trỏ trong bảng Master File Table (MFT). Do đó, file đó sẽ **GIỮ NGUYÊN bảng quyền ACL cũ từ thư mục nguồn (`D:\\PhongNhanSu`)** chứ không kế thừa quyền của thư mục đích! Trái lại, nếu thực hiện thao tác **Copy & Paste**, hoặc **Move khác phân vùng ổ đĩa** (ví dụ từ ổ `C:` sang ổ `D:`), Windows mới tạo file mới ở đích và file đó mới kế thừa quyền của `D:\\PhongKeToan`.",
          keyPoints: [
            "Khẳng định: Move cùng phân vùng ổ đĩa NTFS (cùng ổ D:) sẽ GIỮ NGUYÊN quyền cũ ở thư mục nguồn",
            "Giải thích bản chất: Move cùng ổ đĩa chỉ đổi con trỏ trong bảng MFT chứ không tạo file mới",
            "Phân biệt rõ: Copy (mọi trường hợp) hoặc Move khác ổ đĩa (C: sang D:) thì mới nhận quyền kế thừa của thư mục đích"
          ]
        },
        {
          question: "Tại sao trong thực tế quản trị doanh nghiệp, người ta luôn khuyên cấp quyền `Modify` cho nhân viên thay vì `Full Control`, và tại sao lại hạn chế tối đa việc tích vào ô `Deny`?",
          wrongAnswer: "Vì Full Control nghe nguy hiểm hơn Modify, còn ô Deny thì làm khóa file.",
          rightAnswer: "Có 2 lý do kỹ thuật rất rõ ràng:\n1. **Sự khác biệt giữa `Modify` và `Full Control`**: Quyền `Modify` đã cho phép người dùng làm mọi tác vụ công việc cần thiết (Đọc, Tạo mới, Chỉnh sửa nội dung và Xóa file/thư mục). Còn `Full Control` trao thêm 2 đặc quyền quản trị cực kỳ nguy hiểm là **Change Permissions (Sửa bảng phân quyền ACL)** và **Take Ownership (Chiếm quyền sở hữu)**. Nếu cấp `Full Control`, một nhân viên bình thường có thể tự ý sửa quyền để chặn Admin hoặc mở quyền cho người không có phận sự.\n2. **Tại sao tránh dùng `Deny`**: Vì trong Windows ACL, `Explicit Deny` có độ ưu tiên cao nhất, đè bẹp mọi quyền `Allow`. Nếu một người thuộc 5 Group khác nhau (do kiêm nhiệm nhiều dự án), chỉ cần 1 Group bị tích `Deny` là họ mất trắng quyền truy cập dù được 4 Group kia `Allow`, gây ra ác mộng khi đi tìm lỗi phân quyền. Thay vì dùng `Deny`, chuẩn thực tế là tắt kế thừa (Disable Inheritance) và xóa (Remove) nhóm không cần thiết khỏi danh sách `Allow`.",
          keyPoints: [
            "Phân biệt Modify vs Full Control: Full Control có thêm quyền sửa bảng phân quyền (Change Permissions) và chiếm quyền sở hữu (Take Ownership)",
            "Giải thích tác hại của Deny: Explicit Deny đè bẹp mọi quyền Allow từ các Group khác khi nhân viên kiêm nhiệm nhiều nhóm",
            "Giải pháp thay thế Deny: Tắt kế thừa (Disable Inheritance -> Convert) và Remove nhóm khỏi danh sách Allow"
          ]
        }
      ],
      quizzes: [
        {
          question: "Người quản trị vừa thêm tài khoản `minh.nv` vào Security Group `SG_IT_Support` trên Domain Controller để cấp quyền truy cập vào thư mục cài đặt phần mềm. Tuy nhiên `minh.nv` thử truy cập ngay trên máy tính đang làm việc thì vẫn bị từ chối (Access Denied). Cách xử lý nhanh và đúng bản chất nhất là gì?",
          options: [
            "Khởi động lại máy chủ Domain Controller và máy chủ File Server",
            "Chạy lệnh gpupdate /force trên máy chủ Domain Controller",
            "Yêu cầu minh.nv đăng xuất (Sign out) rồi đăng nhập lại (Sign in) trên máy trạm (hoặc chạy lệnh klist purge) để hệ thống cấp lại Access Token mới có chứa SID của Group vừa thêm",
            "Tắt tường lửa Windows Defender Firewall trên máy trạm của minh.nv"
          ],
          correctIndex: 2,
          explanation: "Access Token của người dùng (chứa danh sách SID của các Security Group mà họ thuộc về) chỉ được khởi tạo tại thời điểm đăng nhập (Logon). Do đó, khi thêm User vào Group mới, User phải Logoff/Logon lại hoặc xóa vé Kerberos cũ bằng `klist purge` để nhận Access Token mới."
        },
        {
          question: "Trong các quy tắc ưu tiên của bảng phân quyền NTFS (DACL), thứ tự ưu tiên từ CAO xuống THẤP nào sau đây là chính xác?",
          options: [
            "Explicit Allow > Explicit Deny > Inherited Allow > Inherited Deny",
            "Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow",
            "Inherited Deny > Explicit Deny > Inherited Allow > Explicit Allow",
            "Explicit Deny > Inherited Deny > Explicit Allow > Inherited Allow"
          ],
          correctIndex: 1,
          explanation: "Windows xử lý các mục phân quyền (ACE) theo thứ tự ưu tiên: Các quyền gán trực tiếp (Explicit) luôn thắng các quyền kế thừa từ thư mục cha (Inherited); và trong cùng một cấp độ thì quyền Từ chối (Deny) luôn thắng quyền Cho phép (Allow). Vậy thứ tự chuẩn là: **Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow**."
        },
        {
          question: "Trong mô hình phân quyền chuẩn AGDLP của Microsoft (`Account -> Global Group -> Domain Local Group -> Permission`), chữ 'G' (Global Group) và chữ 'DL' (Domain Local Group) đóng vai trò gì?",
          options: [
            "Global Group dùng để gom các User theo phòng ban/chức danh; Domain Local Group dùng để đại diện cho quyền hạn gắn trực tiếp lên tài nguyên (Folder/Printer)",
            "Global Group dùng để gắn trực tiếp vào Folder; Domain Local Group dùng để gửi email",
            "Cả hai đều là Organizational Unit (OU) dùng để gắn Group Policy",
            "Global Group chỉ dùng cho máy tính, còn Domain Local Group chỉ dùng cho người dùng"
          ],
          correctIndex: 0,
          explanation: "Trong mô hình AGDLP: `A` (User Accounts) được cho vào `G` (Global Group - gom theo vai trò/phòng ban như `G_KeToan`). Sau đó nhóm `G` được lồng vào nhóm `DL` (Domain Local Group - đại diện cho quyền truy cập một tài nguyên cụ thể như `DL_ShareKeToan_Modify`), và cuối cùng quyền NTFS `P` được gán cho nhóm `DL`."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 10: GROUP POLICY / GPO (TRỌNG TÂM P0 - CHƯA TỪNG THỰC HIỆN)
  // =========================================================================
  {
    id: 10,
    code: "10",
    week: 2,
    title: "Group Policy (GPO) Toàn Tập — Từ Con Số 0 Đến Làm Chủ Chính Sách",
    subtitle: "Kiến trúc GPO, Computer vs User Configuration, thứ tự LSDOU và triển khai chính sách thực tế",
    priority: "P0",
    duration: "90 phút",
    whyThisMatters: "Đây là bài học **Trọng tâm số 1 (P0)** của cậu trong Tuần 2 vì trong bảng đánh giá năng lực đầu vào, GPO là mảng cậu đánh dấu **\"Chưa từng thực hiện\"**. Thế nhưng trong 10 cuộc phỏng vấn SysAdmin thì cả 10 cuộc đều hỏi xoáy về GPO: *\"GPO lưu ở đâu?\", \"Computer Configuration khác gì User Configuration?\", \"Thứ tự áp dụng LSDOU là gì?\", \"Tại sao mình tạo GPO chặn USB rồi mà máy nhân viên vẫn cắm USB chạy ầm ầm?\"*. Bài học này sẽ dẫn dắt cậu đi từ con số 0 đến khi tự tay cấu hình và bắt bệnh GPO mượt mà như một Senior!",
    analogy: {
      title: "Ban Hành Nội Quy Tập Đoàn: Quy Định Gắn Theo 'Cái Bàn Làm Việc' vs Gắn Theo 'Con Người'",
      content: "Hãy tưởng tượng công ty cậu có 300 máy tính. Sếp bảo: *\"Em đi khóa cổng cắm USB của phòng Kế toán, đổi màn hình nền công ty và gắn sẵn ổ đĩa mạng `Z:` cho toàn bộ nhân viên nhé!\"*.\n- Nếu không biết **GPO (Group Policy)**: Cậu sẽ phải cầm USB chạy bộ đến từng máy trong 300 máy, mở Registry/gpedit.msc lên chỉnh tay từng cái — mất cả tuần lễ!\n- Khi có **GPO**: Cậu ngồi tại máy chủ Domain Controller, soạn ra một **Bản Nội Quy điện tử (GPO)** rồi dùng cái ghim bấm **Link (Gắn)** bản nội quy đó vào **OU Phòng Kế Toán**. Ngay lập tức, mọi máy tính và nhân viên trong OU đó tự động đọc bản nội quy từ thư mục `SYSVOL` của DC và tự chỉnh cấu hình theo!\n\nNhưng điểm mấu chốt nhất cậu cần phân biệt là trong mỗi bản GPO luôn chia làm **2 nửa độc lập**:\n1. **Computer Configuration (Quy định gắn theo Cái Máy Tính)**: Giống như quy định *\"Tại bàn làm việc số 05 này, ổ cắm USB đã bị đổ keo khóa chặt\"*. Bất kỳ ai (kể cả nhân viên phòng khác hay Giám đốc) ngồi vào chiếc máy tính đó đều bị khóa USB! Vì vậy, chính sách phần này **BẮT BUỘC phải gắn vào OU chứa các Máy tính (Computer Accounts)**.\n2. **User Configuration (Quy định gắn theo Con Người)**: Giống như quy định *\"ễ là nhân viên Kế toán Lan, dù cô ấy ngồi ở máy tính bàn của mình hay sang ngồi nhờ máy phòng Họp, hễ đăng nhập tên `lan.nt` là tự động có ổ đĩa kế toán `Z:` và màn hình nền Kế toán\"*. Chính sách phần này **BẮT BUỘC phải gắn vào OU chứa các Tài khoản người dùng (User Accounts)**!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "GPO (Group Policy Object) — Cấu trúc GPC & GPT",
          shortDef: "GPO là một đối tượng chính sách chứa các thiết lập cấu hình bảo mật, môi trường làm việc và phần mềm để áp dụng tập trung cho các máy tính và người dùng trong Active Directory, bao gồm 2 phần là GPC (trong `ntds.dit`) và GPT (trong `SYSVOL`).",
          easyExplain: "Khi cậu tạo 1 GPO mới trên công cụ **Group Policy Management (`gpmc.msc`)**, hệ thống sinh ra một mã định danh duy nhất gọi là `GUID` (ví dụ `{31B2F340-016D-11D2-945F-00C04FB984F9}`) và lưu GPO đó ở 2 nơi:\n1. **GPC (Group Policy Container)**: Nằm trong database AD `ntds.dit`, lưu tên GPO, trạng thái Enabled/Disabled và số phiên bản.\n2. **GPT (Group Policy Template)**: Là thư mục vật lý nằm tại `\\\\<domain>\\SYSVOL\\<domain>\\Policies\\{GUID}`, chứa toàn bộ các file cấu hình `.pol`, `.ini`, scripts mà máy trạm sẽ tải về để thực thi.",
          realExample: "Trong mọi Domain luôn có sẵn 2 GPO mặc định: **Default Domain Policy** (gắn ở cấp Domain, quy định chính sách mật khẩu, Kerberos) và **Default Domain Controllers Policy** (gắn ở OU Domain Controllers)."
        },
        {
          term: "Computer Configuration vs User Configuration",
          shortDef: "Computer Configuration chứa các chính sách áp dụng cho bản thân hệ điều hành máy tính (có hiệu lực ngay khi máy khởi động - Boot); còn User Configuration chứa các chính sách áp dụng cho cá nhân người dùng (có hiệu lực khi người đó đăng nhập - Logon).",
          easyExplain: "Mỗi khi mở chỉnh sửa một GPO (Group Policy Management Editor), cậu luôn thấy cây thư mục chia làm 2 nhánh lớn:\n- **Computer Configuration**: Áp dụng cho **Computer Account (`PC01$`)**. Dùng để cấu hình: Chặn cổng USB, bật Firewall, cài phần mềm theo máy, cấu hình Windows Update, đổi mật khẩu Local Admin (LAPS). **Lưu ý sống còn:** Chỉ có tác dụng khi GPO được Link vào OU chứa **Computers**!\n- **User Configuration**: Áp dụng cho **User Account (`lan.nt`)**. Dùng để cấu hình: Ẩn Control Panel/CMD, đặt hình nền Desktop, Map Network Drive (gán ổ đĩa mạng), Folder Redirection. **Lưu ý sống còn:** Chỉ có tác dụng khi GPO được Link vào OU chứa **Users**!",
          realExample: "Nếu cậu cấu hình 'Ẩn Control Panel' ở nhánh `User Configuration`, nhưng lại đem Link GPO đó vào `OU=Computers` (chỉ chứa máy tính, không chứa user nào), thì chính sách đó hoàn toàn VÔ TÁC DỤNG!"
        },
        {
          term: "Quy tắc thứ tự áp dụng LSDOU (Local -> Site -> Domain -> OU)",
          shortDef: "LSDOU là thứ tự hệ điều hành Windows xử lý các chính sách Group Policy từ phạm vi rộng đến hẹp: Local GPO xử lý đầu tiên, tiếp theo là Site, rồi đến Domain, sau đó là OU cha và cuối cùng là OU con.",
          easyExplain: "Cậu hãy nhớ nguyên tắc **\"Kẻ đến sau là kẻ chiến thắng (Last Writer Wins)\"**: Giống như việc sơn tường, lớp sơn quét sau cùng sẽ đè lên lớp sơn quét trước!\n1. **L (Local Group Policy)**: Chính sách cục bộ trên máy (`gpedit.msc`) chạy đầu tiên.\n2. **S (Site)**: GPO gắn ở cấp AD Site chạy tiếp theo và ghi đè lên Local.\n3. **D (Domain)**: GPO gắn ở cấp Domain (như *Default Domain Policy*) chạy thứ 3 và ghi đè lên Site.\n4. **OU (Organizational Unit)**: GPO gắn ở OU cha chạy thứ 4, rồi GPO gắn ở **OU con (trực tiếp chứa User/Computer)** chạy **CUỐI CÙNG**. Do chạy cuối cùng, nếu có xung đột cấu hình, **GPO ở cấp OU con sẽ có quyền ưu tiên cao nhất (thắng cuộc)**!",
          realExample: "Nếu GPO ở cấp `Domain` quy định Hình nền A, nhưng GPO ở cấp `OU=PhongKeToan` quy định Hình nền B, thì nhân viên phòng Kế toán sẽ nhìn thấy **Hình nền B** (vì OU áp dụng sau và đè lên Domain)."
        },
        {
          term: "Block Inheritance (Chặn kế thừa) vs Enforced (Ép buộc)",
          shortDef: "Block Inheritance là tùy chọn bật trên một OU để chặn không cho các GPO từ cấp trên (Domain, OU cha) truyền xuống OU đó; còn Enforced là tùy chọn bật trên một Link GPO cấp trên để ép buộc áp dụng xuống mọi OU con và không cho phép OU con ghi đè.",
          easyExplain: "Nếu cả hai cùng bật thì ai thắng? Hãy nhớ câu thần chú: **\"Enforced luôn luôn thắng Block Inheritance!\"**. Khi một GPO ở cấp Domain được đánh dấu **Enforced (No Override)**, nó sẽ xuyên thủng mọi lá chắn `Block Inheritance` của các OU bên dưới, đồng thời đảo ngược quy tắc ghi đè: không một GPO nào ở cấp OU con được phép sửa đổi thiết lập của một GPO đã bật `Enforced`!",
          realExample: "Giám đốc An toàn thông tin tạo GPO bắt buộc bật tường lửa ở cấp `Domain` và tích chọn **Enforced**. Dù quản trị viên của `OU=PhongIT` có bật `Block Inheritance` hay tạo GPO riêng để tắt tường lửa thì máy tính phòng IT vẫn bị bật tường lửa."
        },
        {
          term: "Policies vs Preferences trong GPO",
          shortDef: "Nhánh Policies là các thiết lập mang tính cưỡng chế nghiêm ngặt (khóa mờ giao diện, người dùng không thể tự sửa lại); còn nhánh Preferences (Group Policy Preferences - GPP) là các thiết lập mang tính khởi tạo mặc định (như Map ổ đĩa, tạo Shortcut, thêm máy in) mà người dùng vẫn có thể thay đổi nếu muốn.",
          easyExplain: "Khi mở `Computer Configuration` hoặc `User Configuration`, cậu sẽ thấy có 2 mục con là **Policies** và **Preferences**:\n- **Policies**: Ghi vào nhánh Registry bảo mật (`HKLM\\Software\\Policies...`), khóa cứng tùy chọn trên giao diện Windows của nhân viên (hiện dòng chữ *'Some settings are managed by your organization'*).\n- **Preferences**: Cực kỳ tiện lợi để triển khai hạ tầng hàng ngày như **Map Network Drive (Gán ổ đĩa mạng Z:)**, tạo biểu tượng ngoài Desktop, chỉnh Registry, copy file mẫu về máy trạm.",
          realExample: "Để chặn cắm USB, cậu vào `Policies -> Administrative Templates`. Còn để tự động gắn ổ đĩa mạng `Z: -> \\\\FS01\\KeToan` cho nhân viên, cậu vào `Preferences -> Windows Settings -> Drive Maps`."
        }
      ],
      comparisonTable: {
        title: "Bảng phân biệt cốt lõi: Computer Configuration vs User Configuration trong GPO",
        headers: ["Tiêu chí", "Computer Configuration (Cấu hình Máy tính)", "User Configuration (Cấu hình Người dùng)"],
        rows: [
          ["Áp dụng cho đối tượng nào?", "Áp dụng cho **Computer Account (`PC01$`)** — bất kể ai đăng nhập vào máy đó cũng chịu tác động", "Áp dụng cho **User Account (`lan.nt`)** — người đó đăng nhập vào máy nào trong Domain cũng đi theo"],
          ["Bắt buộc phải Link GPO vào đâu?", "Phải Link vào **OU chứa các đối tượng Máy tính (Computers)** (hoặc cấp Domain)", "Phải Link vào **OU chứa các đối tượng Người dùng (Users)** (hoặc cấp Domain)"],
          ["Thời điểm áp dụng chính", "Khi máy tính **Khởi động (System Boot / Startup)** — trước khi hiện màn hình đăng nhập", "Khi người dùng **Đăng nhập (User Logon)** vào Windows"],
          ["Chu kỳ tự động cập nhật ngầm", "Mỗi **90 phút** (+ ngẫu nhiên 0–30 phút). Riêng trên các máy DC là mỗi **5 phút**", "Mỗi **90 phút** (+ ngẫu nhiên 0–30 phút) khi đang trong phiên đăng nhập"],
          ["Các kịch bản thực tế điển hình", "• Chặn USB Removable Storage\n• Cấu hình Windows Firewall / BitLocker\n• Chính sách Mật khẩu & Khóa tài khoản (ở cấp Domain)\n• Startup Scripts / Cài phần mềm theo máy", "• Map Network Drive (Gán ổ đĩa mạng Z:)\n• Đặt hình nền Desktop (Wallpaper) đồng bộ\n• Ẩn Control Panel / Khóa CMD & Registry Editor\n• Folder Redirection / Logon Scripts"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Vì cậu chưa từng tự tay làm GPO trước đây, hãy nắm thật chắc **4 Nguyên lý Vận hành của Group Policy** dưới đây — chỉ cần hiểu 4 điều này, cậu sẽ không bao giờ bị rối khi thiết kế hay sửa lỗi GPO:\n<ul><li><b>1. Nguyên lý Tách biệt 'Tạo GPO' và 'Gắn (Link) GPO':</b> Mọi GPO khi mới tạo ra thực chất đều nằm trong một cái kho chung tên là <b><code>Group Policy Objects</code></b>. Một GPO nằm trong kho này chỉ là tờ giấy nháp — nó chưa có tác dụng lên bất kỳ ai cho đến khi cậu <b>Link (Gắn)</b> nó vào một <code>Site</code>, <code>Domain</code> hoặc <code>OU</code>! Đặc biệt, cậu chỉ cần tạo 1 GPO duy nhất (ví dụ <code>GPO_Block_USB</code>) rồi đem Link nó vào 5 OU khác nhau thay vì phải tạo 5 GPO trùng lặp.</li><li><b>2. Nguyên lý Đúng Đối Tượng (Target Object Matching):</b> GPO không tự đoán được ý cậu! Khi máy tính <code>PC01</code> khởi động, nó chỉ tìm xem <code>Computer Account (PC01$)</code> đang nằm ở OU nào để lấy phần <b>Computer Configuration</b> của các GPO gắn tại OU đó. Khi nhân viên <code>lan.nt</code> đăng nhập, hệ thống chỉ tìm xem <code>User Account (lan.nt)</code> đang nằm ở OU nào để lấy phần <b>User Configuration</b> của các GPO gắn tại OU đó. <i>(Ngoại lệ nâng cao duy nhất: Bật <b>Loopback Processing</b> khi muốn ép phần User Configuration chạy theo vị trí của cái Máy tính, ví dụ máy tính phòng Họp hoặc máy chủ Kiosk/RDS).</i></li><li><b>3. Nguyên lý Thứ tự LSDOU và Độ ưu tiên Link Order:</b> Thứ tự chạy là <code>Local -> Site -> Domain -> OU Cha -> OU Con</code>. Cái chạy <b>sau cùng (OU Con) sẽ ghi đè</b> cái chạy trước. Nếu trong cùng 1 OU cậu gắn nhiều GPO (Link Order 1, 2, 3), thì GPO có <b>Link Order số 1 có độ ưu tiên CAO NHẤT</b> (nó được thực thi sau các GPO số 3, số 2 để giữ quyền quyết định cuối cùng!).</li><li><b>4. Nguyên lý Chính sách Mật khẩu (Password & Account Lockout Policy):</b> Đây là một cái bẫy phỏng vấn cực lớn! Mặc dù mục <i>Password Policy</i> (độ dài mật khẩu, thời hạn đổi mật khẩu) nằm trong nhánh <code>Computer Configuration -> Windows Settings -> Security Settings -> Account Policies</code>, nhưng đối với các tài khoản Domain User, Active Directory <b>CHỈ ĐỌC chính sách mật khẩu từ GPO gắn ở cấp DOMAIN gốc</b> (thường là <i>Default Domain Policy</i>). Nếu cậu tạo một GPO đổi độ dài mật khẩu rồi gắn vào <code>OU=PhongIT</code>, nó hoàn toàn KHÔNG có tác dụng lên tài khoản Domain của nhân viên IT (muốn làm chính sách mật khẩu riêng cho từng nhóm trong cùng 1 Domain thì phải dùng tính năng <b>Fine-Grained Password Policy - PSO</b>!).</li></ul>",
      flowTitle: "Quy trình 5 bước tạo, lưu trữ và áp dụng Group Policy trong thực tế",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Khởi tạo GPO (Sinh ra GPC trong AD và GPT trong SYSVOL)",
          detail: "Quản trị viên mở Group Policy Management (`gpmc.msc`), tạo GPO mới và chỉnh sửa cấu hình. Hệ thống lưu thông tin thuộc tính vào `ntds.dit` (GPC) và ghi các file cấu hình `.pol` / `.xml` vào thư mục `\\\\corp.local\\SYSVOL\\corp.local\\Policies\\{GUID}` (GPT).",
          packetOrState: "GPC Version = 1 (AD ntds.dit) <===> GPT Version = 1 (\\\\corp.local\\SYSVOL\\...\\gpt.ini)"
        },
        {
          step: "Bước 2",
          title: "Link GPO vào OU mục tiêu và kiểm tra Security Filtering",
          detail: "Quản trị viên kéo thả (Link) GPO vào OU mong muốn (ví dụ `OU=Computers`). Mặc định mục `Security Filtering` của mọi GPO mới đều để là `Authenticated Users` (bao gồm cả mọi Domain Users lẫn mọi Domain Computers!).",
          packetOrState: "Attribute 'gPLink' của OU=Computers được gắn thêm GUID của GPO | Security Filtering: Authenticated Users (Read + Apply GPO)"
        },
        {
          step: "Bước 3",
          title: "Máy trạm tải danh sách GPO theo thứ tự LSDOU qua LDAP & SMB",
          detail: "Khi máy trạm khởi động (hoặc khi chạy `gpupdate /force`), dịch vụ Group Policy Client trên máy trạm hỏi DC qua LDAP để lấy danh sách các GPO gắn từ Site -> Domain -> OU cha -> OU con, sau đó kết nối SMB (Port 445) vào `\\\\corp.local\\SYSVOL` để tải các file GPT về.",
          packetOrState: "Thứ tự tải và áp dụng: [1] Local -> [2] Site -> [3] Domain -> [4] OU Cha -> [5] OU Con (Thắng cuộc!)"
        },
        {
          step: "Bước 4",
          title: "Thực thi Client-Side Extensions (CSE) để áp đặt cấu hình vào Registry",
          detail: "Máy trạm chạy các mô-đun CSE tương ứng: áp dụng nhánh `Computer Configuration` vào `HKEY_LOCAL_MACHINE (HKLM)` khi máy khởi động, và áp dụng nhánh `User Configuration` vào `HKEY_CURRENT_USER (HKCU)` khi người dùng đăng nhập.",
          packetOrState: "Computer Config ---> HKLM\\Software\\Policies... | User Config ---> HKCU\\Software\\Policies..."
        },
        {
          step: "Bước 5",
          title: "Kiểm tra kết quả áp dụng bằng gpresult (Resultant Set of Policy - RSoP)",
          detail: "Quản trị viên chạy lệnh `gpresult /r` hoặc xuất báo cáo HTML bằng `gpresult /h report.html` trên máy trạm để xác minh chính xác GPO nào đã được áp dụng (Applied) và GPO nào bị từ chối (Denied/Filtered Out).",
          packetOrState: "Applied Group Policy Objects: [Default Domain Policy], [GPO_KeToan_BlockUSB]"
        }
      ],
      asciiDiagram: ` THỨ TỰ ÁP DỤNG GPO (LSDOU) & NGUYÊN TẮC LINK ĐÚNG OU (COMPUTER vs USER)
 =====================================================================================

 [A] THỨ TỰ XỬ LÝ LSDOU (Cái áp dụng SAU CÙNG sẽ GHI ĐÈ cái trước!)

   (1) [ L - Local GPO ]       (Chạy đầu tiên - Yếu nhất)
              |
              v
   (2) [ S - Site GPO ]        (Ghi đè Local)
              |
              v
   (3) [ D - Domain GPO ]      (VD: Default Domain Policy) ===[Nếu bật ENFORCED]===> Thắng tuyệt đối!
              |
              v  <--- Nếu OU bật [BLOCK INHERITANCE]: Chặn các GPO thường từ trên xuống (nhưng thua Enforced)
   (4) [ OU Cha: PhongKeToan ] (Ghi đè Domain)
              |
              v
   (5) [ OU Con: Users / PCs ] (Chạy CUỐI CÙNG -> THẮNG CUỘC nếu không có Enforced ở trên!)

 -------------------------------------------------------------------------------------
 [B] SƠ ĐỒ GẮN (LINK) GPO CHUẨN XÁC — TRÁNH LỖI KINH ĐIỂN CỦA NGƯỜI MỚI!

   [OU] PhongKeToan
     |
     +---> [OU] Computers  (Chứa: PC-KT01$, PC-KT02$)
     |       ^
     |       |___ GẮN (LINK): [GPO_Block_USB]
     |            (Cấu hình tại nhánh: COMPUTER CONFIGURATION -> Chặn USB Storage)
     |
     +---> [OU] Users      (Chứa: lan.nt, minh.nv)
             ^
             |___ GẮN (LINK): [GPO_KeToan_Workspace]
                  (Cấu hình tại nhánh: USER CONFIGURATION -> Map ổ đĩa Z:, Khóa Control Panel)`,
      keyTakeaways: [
        "Quy tắc LSDOU: GPO áp dụng theo thứ tự `Local -> Site -> Domain -> OU Cha -> OU Con`. Cái áp dụng **sau cùng (OU Con)** sẽ **ghi đè** cái trước.",
        "Quy tắc Enforced vs Block Inheritance: `Enforced (No Override)` luôn luôn thắng `Block Inheritance`.",
        "Cấu hình ở nhánh `Computer Configuration` thì phải Link GPO vào **OU chứa Máy tính (Computers)**; cấu hình ở nhánh `User Configuration` thì phải Link vào **OU chứa Người dùng (Users)**.",
        "Hai câu lệnh bắt buộc phải nằm lòng: `gpupdate /force` (ép máy trạm tải và áp dụng GPO ngay lập tức) và `gpresult /r` hoặc `gpresult /h C:\\report.html` (kiểm tra xem máy đã nhận GPO nào)."
      ]
    },
    level3_practice: {
      scenario: "Đây là lần đầu tiên cậu tự tay triển khai Group Policy từ A-Z! Chúng ta sẽ thực hiện 3 nhiệm vụ thực tế phổ biến nhất trong doanh nghiệp cho Phòng Kế Toán (`OU=PhongKeToan`): (1) Tạo GPO chặn cắm USB lưu trữ áp cho các máy tính kế toán (`OU=Computers`), (2) Tạo GPO tự động gắn ổ đĩa mạng `Z:` và khóa Control Panel áp cho nhân viên kế toán (`OU=Users`), và (3) Dùng lệnh `gpupdate /force` cùng `gpresult` trên máy trạm để nghiệm thu.",
      steps: [
        {
          title: "Bước 1: Tạo và Link GPO Chặn USB (Computer Configuration) vào OU chứa Máy tính",
          instruction: "Trên máy chủ DC, mở `Server Manager -> Tools -> Group Policy Management (gpmc.msc)`. Mở rộng cây thư mục `Forest: corp.local -> Domains -> corp.local -> PhongKeToan`. Chuột phải vào OU con **`Computers`** -> chọn **`Create a GPO in this domain, and Link it here...`** -> Đặt tên là `GPO_Block_USB`. Sau đó chuột phải vào `GPO_Block_USB` chọn **`Edit...`** và đi theo đường dẫn bên dưới:",
          commandOrConfig: `[Đường dẫn trong cửa sổ Group Policy Management Editor]:
Computer Configuration
  └── Policies
        └── Administrative Templates
              └── System
                    └── Removable Storage Access
                          └── Nháy đúp vào: "All Removable Storage classes: Deny all access"
                          └── Chọn: [x] Enabled -> Nhấn OK!

# Hoặc tạo và Link nhanh bằng PowerShell trên DC:
PS C:\\> New-GPO -Name "GPO_Block_USB" | New-GPLink -Target "OU=Computers,OU=PhongKeToan,DC=corp,DC=local"`,
          explanation: "Tại sao lại chỉnh trong `Computer Configuration` và Link vào `OU=Computers`? Vì cổng USB gắn liền với phần cứng của chiếc máy tính bàn phòng Kế toán (`PC-KT01`). Khi làm như vậy, bất kỳ ai ngồi vào chiếc máy tính đó cắm USB vào đều bị từ chối truy cập ngay lập tức!"
        },
        {
          title: "Bước 2: Tạo và Link GPO Map ổ đĩa mạng Z: & Khóa Control Panel (User Configuration) vào OU chứa Users",
          instruction: "Quay lại cửa sổ `Group Policy Management`, chuột phải vào OU con **`Users`** (nằm dưới `PhongKeToan`) -> chọn **`Create a GPO in this domain, and Link it here...`** -> Đặt tên là `GPO_KeToan_UserPolicy` -> chuột phải chọn **`Edit...`** và cấu hình 2 mục thực tế sau:",
          commandOrConfig: `[Mục 1 - Tự động gắn ổ đĩa mạng Z: (Map Network Drive)]:
User Configuration
  └── Preferences
        └── Windows Settings
              └── Drive Maps
                    └── Chuột phải vào vùng trống -> New -> Mapped Drive:
                        - Action: Update (hoặc Create)
                        - Location: \\\\dc01.corp.local\\KeToan$
                        - Reconnect: [x] Tích chọn
                        - Label as: Tai Lieu Ke Toan
                        - Drive Letter: Use [ Z: ] -> Nhấn OK!

[Mục 2 - Khóa không cho nhân viên mở Control Panel & PC Settings]:
User Configuration
  └── Policies
        └── Administrative Templates
              └── Control Panel
                    └── Nháy đúp vào: "Prohibit access to Control Panel and PC settings"
                    └── Chọn: [x] Enabled -> Nhấn OK!`,
          explanation: "Đây là hai thiết lập kinh điển của nhánh `User Configuration`: Dùng `Preferences -> Drive Maps` để nhân viên kế toán đăng nhập vào bất kỳ máy nào cũng thấy sẵn ổ đĩa `Z: (Tai Lieu Ke Toan)`, và dùng `Policies -> Administrative Templates` để khóa cứng không cho nhân viên tự ý vào Control Panel/Settings gỡ phần mềm hay đổi IP."
        },
        {
          title: "Bước 3: Đưa máy trạm và tài khoản nhân viên vào đúng OU",
          instruction: "Trước khi thử nghiệm trên máy trạm `PC01`, cậu phải kiểm tra trong `Active Directory Users and Computers (dsa.msc)` xem tài khoản `lan.nt` đã nằm trong `OU=Users,OU=PhongKeToan` và máy tính `PC01` đã được Move từ `CN=Computers` vào `OU=Computers,OU=PhongKeToan` hay chưa!",
          commandOrConfig: `# Kiểm tra và di chuyển Computer Account PC01 vào đúng OU=Computers bằng PowerShell:
PS C:\\> Get-ADComputer "PC01" | Move-ADObject -TargetPath "OU=Computers,OU=PhongKeToan,DC=corp,DC=local"

# Kiểm tra vị trí hiện tại của User lan.nt và Computer PC01:
PS C:\\> (Get-ADUser "lan.nt").DistinguishedName
CN=Lan Nguyen,OU=Users,OU=PhongKeToan,DC=corp,DC=local

PS C:\\> (Get-ADComputer "PC01").DistinguishedName
CN=PC01,OU=Computers,OU=PhongKeToan,DC=corp,DC=local`,
          explanation: "90% người mới làm Lab GPO bị lỗi không nhận chính sách là do quên bước này: Máy tính mới Join Domain vẫn nằm ở Container `CN=Computers` mặc định chứ chưa được kéo thả (Move) vào trong `OU=Computers` nơi vừa gắn GPO!"
        },
        {
          title: "Bước 4: Cập nhật chính sách bằng gpupdate /force và kiểm tra bằng gpresult trên máy trạm",
          instruction: "Sang máy trạm `PC01`, đăng nhập bằng tài khoản `corp\\lan.nt`, mở CMD và gõ lệnh cập nhật GPO ngay lập tức, sau đó kiểm tra danh sách GPO đã áp dụng.",
          commandOrConfig: `C:\\Users\\lan.nt> gpupdate /force
Updating policy...

Computer Policy update has completed successfully.
User Policy update has completed successfully.

C:\\Users\\lan.nt> gpresult /r

RSOP data for CORP\\lan.nt on PC01 : Logging Mode
-------------------------------------------------
COMPUTER SETTINGS
    CN=PC01,OU=Computers,OU=PhongKeToan,DC=corp,DC=local
    Applied Group Policy Objects
    -----------------------------
        GPO_Block_USB
        Default Domain Policy

USER SETTINGS
    CN=Lan Nguyen,OU=Users,OU=PhongKeToan,DC=corp,DC=local
    Applied Group Policy Objects
    -----------------------------
        GPO_KeToan_UserPolicy
        Default Domain Policy

# Xuất báo cáo HTML trực quan ra ổ C để soi từng dòng cấu hình đã nhận:
C:\\Users\\lan.nt> gpresult /h C:\\gpo_report.html`,
          explanation: "Khi nhìn vào kết quả `gpresult /r`, cậu sẽ thấy rõ 2 phần: `COMPUTER SETTINGS` đã nhận `GPO_Block_USB` và `USER SETTINGS` đã nhận `GPO_KeToan_UserPolicy`. Lưu ý: Nếu chạy `gpresult /r` bằng CMD thường (không Run as Administrator), đôi khi phần `COMPUTER SETTINGS` sẽ hiển thị `N/A` do thiếu quyền đọc RSoP của hệ thống — lúc đó hãy mở CMD với quyền Admin hoặc thêm tham số `/scope:user` / `/scope:computer`."
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Đã tạo GPO chặn USB trong Computer Configuration, đã chạy `gpupdate /force` trên máy trạm báo thành công, nhưng cắm USB vào máy trạm vẫn mở được bình thường và gõ `gpresult /r` không thấy tên GPO đó",
          hypothesis: "Có 2 nguyên nhân phổ biến nhất: (1) Đã Link nhầm GPO chứa cấu hình Computer vào OU chỉ chứa Users, hoặc (2) Chưa di chuyển (Move) Computer Account của máy trạm từ mục `Computers` mặc định vào trong OU đã gắn GPO.",
          testCommand: "gpresult /r (kiểm tra dòng DistinguishedName dưới mục COMPUTER SETTINGS xem máy đang nằm ở OU nào)",
          fix: "Mở ADUC (`dsa.msc`), kéo máy trạm `PC01` vào đúng `OU=Computers` nơi đã Link `GPO_Block_USB`, sau đó chạy lại `gpupdate /force` trên máy trạm."
        },
        {
          symptom: "Trong Group Policy Management, cậu xóa `Authenticated Users` khỏi mục Security Filtering và chỉ thêm mỗi nhóm `SG_KeToan` để giới hạn GPO cho nhóm Kế toán, nhưng sau đó GPO đột nhiên không áp dụng được nữa (hoặc báo Denied due to Security Filtering)",
          hypothesis: "Từ sau bản vá bảo mật MS16-072 của Microsoft, máy trạm sử dụng danh tính của **Computer Account (`PC01$`)** để đọc GPO từ SYSVOL. Khi xóa `Authenticated Users` khỏi Security Filtering, các máy tính (`Domain Computers`) mất luôn quyền **Read** đối với GPO đó nên không thể tải GPO về cho User!",
          testCommand: "gpresult /h C:\\report.html (mở file HTML xem mục Denied GPOs -> Reason: Access Denied (Security Filtering))",
          fix: "Khi dùng Security Filtering để lọc riêng cho một nhóm User (ví dụ `SG_KeToan`), hãy qua tab **Delegation** của GPO đó -> bấm **Add...** -> thêm nhóm **`Domain Computers`** (hoặc `Authenticated Users`) với quyền tối thiểu là **`Read`** (không tích Apply group policy) để máy trạm đọc được file GPO."
        },
        {
          symptom: "Đã cấu hình GPO Map Network Drive (hoặc Folder Redirection / Software Installation), chạy `gpupdate /force` nhưng ổ đĩa mạng vẫn chưa hiện ra ngay",
          hypothesis: "Một số chính sách thuộc nhóm **Synchronous Processing (Xử lý đồng bộ)** như Drive Maps (ở chế độ Create/Replace), Folder Redirection, Software Installation chỉ thực thi tại thời điểm khởi động máy (Startup) hoặc tại thời điểm bắt đầu phiên đăng nhập (Logon) chứ không áp dụng nóng giữa chừng.",
          testCommand: "gpupdate /force (sẽ thấy dòng nhắc: 'Certain User policies are enabled that can only run during logon. Ok to logoff? (Y/N)')",
          fix: "Nhấn `Y` (hoặc chủ động Sign out rồi Sign in lại / Restart máy) để tiến trình Logon thực thi trọn vẹn chính sách."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Câu hỏi bẫy thứ tự ưu tiên GPO: Giả sử mình có 3 GPO cùng chỉnh Hình nền Desktop (Wallpaper) khác nhau:\n- GPO_1 gắn ở cấp Domain (quy định Hình nền Xanh)\n- GPO_2 gắn ở OU Cha 'Phòng Kế Toán' (quy định Hình nền Vàng)\n- GPO_3 gắn ở OU Con 'Nhóm Thuế' nằm trong Phòng Kế Toán (quy định Hình nền Đỏ).\nHỏi: (1) Mặc định nhân viên trong 'Nhóm Thuế' sẽ thấy hình nền màu gì? (2) Nếu mình tích chọn 'Enforced' cho GPO_1 ở cấp Domain và bật 'Block Inheritance' ở OU Con 'Nhóm Thuế', thì nhân viên sẽ thấy hình nền màu gì?",
          wrongAnswer: "Câu (1) thấy màu Xanh vì Domain to nhất nên ưu tiên cao nhất. Câu (2) thấy màu Đỏ vì OU Con đã bật Block Inheritance chặn ở trên rồi.",
          rightAnswer: "Câu trả lời chuẩn nguyên lý LSDOU như sau:\n- **Trả lời câu (1) — Mặc định thấy Hình nền ĐỎ (`GPO_3`)**: Vì Windows áp dụng GPO theo thứ tự **LSDOU** (`Local -> Site -> Domain -> OU Cha -> OU Con`). Chính sách nào được áp dụng **SAU CÙNG** sẽ ghi đè lên các chính sách trước đó. Cụ thể: Domain (Xanh) chạy trước $\\rightarrow$ bị OU Cha (Vàng) đè lên $\\rightarrow$ cuối cùng bị **OU Con (Đỏ)** đè lên và giữ nguyên kết quả là màu Đỏ.\n- **Trả lời câu (2) — Khi bật Enforced ở Domain và Block Inheritance ở OU Con thì thấy Hình nền XANH (`GPO_1`)**: Vì theo quy tắc của Active Directory, **`Enforced (No Override)` luôn luôn thắng `Block Inheritance`** và không cho phép bất kỳ GPO cấp dưới nào ghi đè lên nó. Lúc này `Block Inheritance` ở OU Con chỉ chặn được `GPO_2` (Vàng) của OU Cha, nhưng hoàn toàn bất lực trước `GPO_1` (Xanh - đã Enforced) từ cấp Domain truyền xuống, và `GPO_3` (Đỏ) cũng không được phép đè lên `GPO_1`!",
          keyPoints: [
            "Câu (1): Giải thích đúng thứ tự LSDOU — cái chạy sau cùng (OU Con) ghi đè cái trước -> Màu Đỏ thắng",
            "Câu (2): Khẳng định quy tắc 'Enforced luôn thắng Block Inheritance' và chống bị ghi đè -> Màu Xanh (Domain Enforced) thắng",
            "Tránh nhầm lẫn giữa 'chạy trước' và 'thắng cuộc': Chạy đầu tiên là bị đè, chạy cuối cùng mới là người quyết định!"
          ]
        },
        {
          question: "Mình muốn chặn không cho nhân viên Phòng Nhân Sự cắm USB vào máy tính làm việc. Mình đã tạo một GPO, vào nhánh `Computer Configuration -> Policies -> Administrative Templates -> System -> Removable Storage Access` bật `Deny all access`, sau đó mình Link GPO này vào `OU=Users_NhanSu` (nơi chứa toàn bộ tài khoản đăng nhập của nhân viên Nhân sự) rồi chạy `gpupdate /force`. Tại sao nhân viên vẫn cắm USB dùng bình thường?",
          wrongAnswer: "Do chưa khởi động lại máy tính hoặc do USB đó là USB chuẩn 3.0 nên GPO chưa nhận diện được.",
          rightAnswer: "Nguyên nhân gốc rễ là do **Link sai đối tượng mục tiêu của GPO**! Thiết lập chặn USB nằm trong nhánh **`Computer Configuration`** — đây là nhánh chính sách chỉ áp dụng cho các đối tượng **Máy tính (`Computer Accounts`)**. Trong khi đó, bạn lại đem Link GPO này vào `OU=Users_NhanSu` là nơi chỉ chứa các **Tài khoản người dùng (`User Accounts`)**, không hề có chiếc máy tính nào nằm trong OU đó cả! Khi máy tính khởi động và tải chính sách Computer, nó chỉ kiểm tra các GPO gắn vào OU chứa bản thân cái máy tính đó. **Cách sửa đúng:** Phải Link GPO chặn USB này vào **`OU=Computers_NhanSu`** (nơi chứa các Computer Account của phòng Nhân sự).",
          keyPoints: [
            "Chỉ ra ngay lỗi sai bản chất: Cấu hình trong `Computer Configuration` nhưng lại Link vào OU chỉ chứa `User Accounts`",
            "Giải thích nguyên lý: Nhánh `Computer Configuration` chỉ tác động lên các đối tượng `Computer` nằm trong phạm vi OU được Link",
            "Cách khắc phục: Link GPO đó vào OU chứa các Computer Account của phòng Nhân sự"
          ]
        },
        {
          question: "Sếp yêu cầu: 'Riêng đối với Phòng IT (`OU=PhongIT`), hãy tạo một GPO quy định mật khẩu chỉ cần dài 4 ký tự và không bao giờ hết hạn để anh em IT test hệ thống cho tiện, còn các phòng ban khác giữ nguyên 10 ký tự theo Default Domain Policy'. Em tạo một GPO chỉnh Password Policy rồi Link vào `OU=PhongIT` thì có chạy được không? Tại sao?",
          wrongAnswer: "Dạ chạy được ạ, vì theo quy tắc LSDOU thì GPO gắn ở OU=PhongIT sẽ chạy sau và ghi đè lên Default Domain Policy ở cấp Domain.",
          rightAnswer: "Hoàn toàn **KHÔNG CHẠY ĐƯỢC** đối với tài khoản Domain User! Đây là ngoại lệ nổi tiếng nhất của Group Policy: Trong một Active Directory Domain, toàn bộ các tài khoản người dùng thuộc Domain (`ntds.dit`) đều do các Domain Controller quản lý tập trung, vì vậy hệ thống **CHỈ chấp nhận một chính sách Mật khẩu và Khóa tài khoản (Password & Account Lockout Policy) duy nhất được gắn ở cấp DOMAIN gốc** (thường là *Default Domain Policy*). Nếu bạn tạo GPO chỉnh Password Policy rồi gắn vào một OU thường như `OU=PhongIT`, chính sách đó sẽ bị AD bỏ qua đối với Domain Users (nó chỉ có tác dụng lên các tài khoản Local SAM nằm trên các máy trạm trong OU đó). Nếu muốn áp dụng chính sách mật khẩu riêng biệt cho từng nhóm người dùng trong cùng 1 Domain, ta bắt buộc phải sử dụng tính năng **Fine-Grained Password Policy (FGPP / PSO - Password Settings Object)** trong Active Directory Administrative Center (`dsac.msc`) và gắn trực tiếp PSO đó cho Security Group `SG_IT`.",
          keyPoints: [
            "Khẳng định: GPO chỉnh Password Policy gắn ở cấp OU thường KHÔNG có tác dụng lên tài khoản Domain Users",
            "Giải thích lý do: Tài khoản Domain nằm tập trung trên DC nên GPO Password Policy chỉ có hiệu lực khi gắn ở cấp Domain gốc (hoặc OU Domain Controllers)",
            "Đưa ra giải pháp chuẩn xác: Sử dụng **Fine-Grained Password Policy (FGPP / PSO)** trong AD Administrative Center gắn cho Security Group"
          ]
        }
      ],
      quizzes: [
        {
          question: "Các file cấu hình vật lý thực tế của một Group Policy Object (như `Registry.pol`, `gpt.ini`, logon scripts) được lưu trữ tại đâu trên máy chủ Domain Controller để các máy trạm tải về?",
          options: [
            "Trong file C:\\Windows\\System32\\config\\SYSTEM",
            "Trong thư mục chia sẻ \\\\<domain>\\SYSVOL\\<domain>\\Policies\\{GUID} (gọi là GPT - Group Policy Template)",
            "Trong thư mục C:\\Users\\Public\\Documents",
            "Trên máy chủ DNS Server dưới dạng các bản ghi TXT"
          ],
          correctIndex: 1,
          explanation: "Mỗi GPO gồm 2 phần: `GPC (Group Policy Container)` lưu metadata trong `ntds.dit` và `GPT (Group Policy Template)` lưu toàn bộ các file cấu hình vật lý trong thư mục chia sẻ `\\\\<domain>\\SYSVOL\\<domain>\\Policies\\{GUID}`. Máy trạm sẽ kết nối SMB vào `SYSVOL` để tải các file này về."
        },
        {
          question: "Theo mặc định, các máy trạm Windows trong Domain sẽ tự động cập nhật lại (Background Refresh) các chính sách Group Policy theo chu kỳ thời gian là bao lâu?",
          options: [
            "Mỗi 5 phút một lần",
            "Mỗi 90 phút một lần (cộng thêm độ trễ ngẫu nhiên từ 0 đến 30 phút)",
            "Chỉ cập nhật duy nhất 1 lần khi cài lại Windows",
            "Mỗi 7 ngày một lần"
          ],
          correctIndex: 1,
          explanation: "Mặc định trên các máy trạm (Client) và Member Server, Group Policy tự động làm mới ngầm mỗi **90 phút**, cộng thêm một khoảng thời gian ngẫu nhiên (Random Offset) từ **0 đến 30 phút** để tránh việc hàng ngàn máy trạm đồng loạt gửi yêu cầu tải GPO về Domain Controller cùng một giây. Riêng trên các máy chủ **Domain Controller**, chu kỳ này là mỗi **5 phút**."
        },
        {
          question: "Khi muốn kiểm tra nhanh trên máy trạm của nhân viên xem những GPO nào đã thực sự được áp dụng (Applied) và những GPO nào bị từ chối (Denied), đồng thời xuất ra một file báo cáo giao diện Web trực quan, người quản trị nên dùng câu lệnh nào?",
          options: [
            "gpupdate /sync",
            "gpresult /h C:\\gpo_report.html",
            "dcdiag /test:gpo",
            "nltest /gpo_verify"
          ],
          correctIndex: 1,
          explanation: "Lệnh `gpresult /r` hiển thị tóm tắt kết quả RSoP ngay trên cửa sổ dòng lệnh, còn `gpresult /h C:\\gpo_report.html` sẽ xuất ra một file báo cáo định dạng HTML cực kỳ chi tiết (hiển thị rõ từng thiết lập đã áp dụng, GPO nào thắng cuộc và lý do tại sao một GPO bị từ chối)."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 11: WINDOWS SERVICES & EVENT VIEWER
  // =========================================================================
  {
    id: 11,
    code: "11",
    week: 2,
    title: "Windows Services Cốt Lõi & Đọc Event Viewer Bắt Bệnh Hệ Thống",
    subtitle: "5 dịch vụ sống còn trên Domain Controller và nghệ thuật điều tra Event ID (4624, 4625, 4740)",
    priority: "P1",
    duration: "75 phút",
    whyThisMatters: "Trong các buổi phỏng vấn vị trí Quản trị hệ thống, nhà tuyển dụng cực kỳ thích đưa ra các bài toán xử lý sự cố thực tế: *\"Sáng thứ Hai giám đốc báo tài khoản cứ mở khóa (Unlock) được 2 phút là lại tự động bị khóa (Locked out), em tìm máy tính nào đang làm khóa tài khoản của sếp bằng cách nào?\"*, hoặc *\"Trên Domain Controller có những Service nào mà nếu bị Stop thì cả công ty không làm việc được?\"*. Nắm vững 5 dịch vụ lõi và các mã Event ID 4624, 4625, 4740 chính là chìa khóa giúp cậu ghi điểm tuyệt đối.",
    analogy: {
      title: "Bảng Điều Khiển Động Cơ (Windows Services) & Hộp Đen Camera An Ninh (Event Viewer)",
      content: "Hãy hình dung máy chủ Windows Server giống như một **Tòa nhà Ngân hàng Trung tâm**:\n\n- **Windows Services (`services.msc`)**: Chính là **Phòng Kỹ thuật vận hành tòa nhà** (Máy phát điện, Hệ thống thang máy, Tổng đài nội bộ, Quầy phát thẻ từ). Nếu nhân viên kỹ thuật vô tình tắt cầu dao của *Quầy phát thẻ từ* (**Dịch vụ KDC**) hoặc *Hệ thống cửa chia sẻ* (**Dịch vụ Server / SMB**), thì dù tòa nhà vẫn sáng đèn (ping vẫn thông), không một khách hàng nào bước vào giao dịch được!\n- **Event Viewer (`eventvwr.msc`)**: Chính là **Phòng Camera An Ninh & Sổ Nhật Ký Hộp Đen**. Mọi hành động diễn ra trong ngân hàng đều được ghi lại thành một mã số chuẩn (**Event ID**):\n  • **Mã `4624`**: *\"Anh Nam vừa quẹt thẻ mở cửa thành công lúc 08:05 sáng từ máy tính PC01\"*.\n  • **Mã `4625`**: *\"Có kẻ vừa bấm sai mật khẩu 3 lần liên tiếp vào tài khoản Giám đốc từ địa chỉ IP 192.168.10.55\"*.\n  • **Mã `4740`**: *\"Hệ thống vừa tự động KHÓA TÀI KHOẢN của Giám đốc do máy tính `LAPTOP-CU-02` gửi mật khẩu sai quá 5 lần!\"*."
    },
    level1_definitions: {
      concepts: [
        {
          term: "Active Directory Domain Services (Tên dịch vụ: NTDS)",
          shortDef: "NTDS là dịch vụ lõi vận hành trực tiếp cơ sở dữ liệu Active Directory (`ntds.dit`), xử lý các truy vấn thư mục LDAP và đồng bộ dữ liệu giữa các Domain Controller.",
          easyExplain: "Trong cửa sổ `services.msc`, dịch vụ này hiển thị tên là **Active Directory Domain Services** (Service Name ngắn gọn là `NTDS`). Nếu dịch vụ này bị dừng (Stopped), chiếc máy chủ Domain Controller sẽ ngừng hoạt động hoàn toàn vai trò AD và kéo theo hàng loạt dịch vụ phụ thuộc khác (như KDC, Netlogon, DFS Replication) dừng theo.",
          realExample: "Khi cần bảo trì hoặc kiểm tra toàn vẹn file cơ sở dữ liệu `ntds.dit` bằng công cụ `ntdsutil`, người quản trị có thể tạm dừng dịch vụ `NTDS` bằng lệnh `Stop-Service NTDS -Force`."
        },
        {
          term: "Netlogon Service",
          shortDef: "Netlogon là dịch vụ duy trì kênh liên lạc bảo mật (Secure Channel) giữa máy trạm với Domain Controller, xử lý xác thực NTLM Pass-through và tự động đăng ký các bản ghi DNS SRV cho Domain Controller.",
          easyExplain: "Dịch vụ `Netlogon` chạy trên cả máy trạm đã Join Domain lẫn trên máy chủ DC:\n- Trên **Máy trạm**: Giúp máy trạm tìm thấy DC (DC Locator) và duy trì mật khẩu Computer Account.\n- Trên **Domain Controller**: Đọc file `C:\\Windows\\System32\\config\\netlogon.dns` và tự động đẩy toàn bộ các bản ghi **DNS SRV** (`_ldap._tcp.dc._msdcs...`) lên DNS Server! Vì vậy, nếu ai đó lỡ xóa mất bản ghi SRV trong DNS, cậu chỉ cần **Restart dịch vụ Netlogon** trên DC là các bản ghi SRV tự động mọc lại đầy đủ!",
          realExample: "Chạy lệnh `Restart-Service Netlogon` trên DC để ép Domain Controller đăng ký lại toàn bộ bản ghi DNS SRV ngay lập tức."
        },
        {
          term: "Kerberos Key Distribution Center (Tên dịch vụ: kdc)",
          shortDef: "KDC là dịch vụ chạy trên các máy chủ Domain Controller có nhiệm vụ lắng nghe ở cổng 88 để cấp phát vé xác thực TGT và vé dịch vụ TGS theo giao thức Kerberos.",
          easyExplain: "Dịch vụ này chỉ tồn tại trên các máy chủ đã nâng cấp lên Domain Controller. Nếu dịch vụ `kdc` bị Stopped hoặc Disabled, toàn bộ người dùng và máy tính trong mạng sẽ không thể xin vé Kerberos để đăng nhập hay truy cập tài nguyên bằng tên miền.",
          realExample: "Kiểm tra dịch vụ KDC đang chạy trên Port 88 bằng lệnh `Get-Service kdc` và `netstat -ano | findstr :88`."
        },
        {
          term: "Server (LanmanServer) & Workstation (LanmanWorkstation)",
          shortDef: "Dịch vụ `Server` (LanmanServer) giúp máy tính chia sẻ file/máy in ra mạng cho máy khác truy cập qua giao thức SMB; còn dịch vụ `Workstation` (LanmanWorkstation) giúp máy tính đi kết nối tới thư mục chia sẻ của các máy chủ khác.",
          easyExplain: "Cặp đôi này rất dễ bị nhầm trong phỏng vấn:\n- Nếu máy chủ File Server (hoặc DC) bị tắt dịch vụ **`Server` (`LanmanServer`)**: Không một ai từ bên ngoài có thể truy cập vào `\\\\FS01\\Share` hay `\\\\DC01\\SYSVOL` được nữa!\n- Nếu máy trạm của nhân viên bị tắt dịch vụ **`Workstation` (`LanmanWorkstation`)**: Nhân viên đó không thể mở bất kỳ đường dẫn mạng `\\\\...` nào, không Map được ổ đĩa mạng và không tải được GPO từ `SYSVOL`!",
          realExample: "Khi toàn bộ công ty vẫn ping thấy File Server nhưng không ai mở được `\\\\FS01\\Data`, việc đầu tiên cần kiểm tra trên `FS01` là `Get-Service LanmanServer`."
        },
        {
          term: "Event Viewer & Bộ 3 Event ID Bảo mật (4624, 4625, 4740)",
          shortDef: "Event Viewer (`eventvwr.msc`) là công cụ quản lý nhật ký sự kiện tập trung của Windows; trong đó nhánh `Windows Logs -> Security` ghi nhận các sự kiện kiểm toán bảo mật với 3 mã quan trọng nhất là `4624` (Đăng nhập thành công), `4625` (Đăng nhập thất bại) và `4740` (Tài khoản bị khóa tự động).",
          easyExplain: "Ngoài 3 mã vàng `4624`, `4625`, `4740`, cậu nên biết thêm 4 mã quản trị tài khoản thường gặp trong phỏng vấn:\n- **`4720`**: Một tài khoản User vừa được **Tạo mới (Created)**.\n- **`4726`**: Một tài khoản User vừa bị **Xóa (Deleted)**.\n- **`4724`**: Một người quản trị vừa thực hiện **Reset mật khẩu** cho một tài khoản.\n- **`4728` / `4732`**: Một tài khoản vừa được **Thêm vào Security Group**.",
          realExample: "Để truy tìm xem máy tính nào trong mạng đang lưu mật khẩu cũ làm khóa tài khoản của Giám đốc, quản trị viên mở Event Viewer trên máy chủ PDC Emulator và lọc (Filter) theo **Event ID `4740`**."
        }
      ],
      comparisonTable: {
        title: "Bảng tra cứu nhanh: Các Event ID Bảo mật & Logon Types bắt buộc phải nhớ khi đi phỏng vấn",
        headers: ["Mã Event ID / Logon Type", "Ý nghĩa sự kiện", "Thông tin quan trọng cần đọc trong Event Details"],
        rows: [
          ["**Event ID 4624**", "Đăng nhập **THÀNH CÔNG** (An account was successfully logged on)", "Xem `Account Name` (Ai đăng nhập), `Logon Type` (Đăng nhập kiểu gì) và `Source Network Address` (Từ IP nào)"],
          ["**Event ID 4625**", "Đăng nhập **THẤT BẠI** (An account failed to log on — sai mật khẩu, tài khoản bị khóa/disable)", "Xem `Failure Reason`, `Status / Sub Status` (`0xC000006A` = Sai mật khẩu, `0xC0000234` = Tài khoản đang bị khóa) và `Workstation Name` / `Source IP`"],
          ["**Event ID 4740**", "Tài khoản người dùng bị **KHÓA TỰ ĐỘNG** (A user account was locked out)", "Xem trên máy chủ **PDC Emulator**: Đọc trường **`Caller Computer Name`** — đây chính là tên chiếc máy tính/thiết bị thủ phạm gây khóa tài khoản!"],
          ["**Event ID 4720 / 4726**", "Tài khoản User được **Tạo mới (4720)** hoặc bị **Xóa (4726)**", "Xem `Subject: Account Name` (Admin nào đã thực hiện thao tác) và `New/Target Account` (Tài khoản nào bị tác động)"],
          ["**Logon Type 2 vs Type 3 vs Type 10**", "Phân loại hình thức đăng nhập bên trong Event 4624 / 4625", "• **Type 2 (Interactive)**: Ngồi gõ bàn phím trực tiếp tại máy\n• **Type 3 (Network)**: Truy cập qua mạng (mở SMB Share, xác thực AD)\n• **Type 10 (RemoteInteractive)**: Đăng nhập qua **Remote Desktop (RDP)**"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Để xử lý sự cố Windows Server như một chuyên gia thực thụ, cậu cần nắm vững **2 Nguyên lý Cốt lõi** sau:\n<ul><li><b>1. Chuỗi phụ thuộc sống còn của các Dịch vụ trên Domain Controller:</b> Một Domain Controller khỏe mạnh là sự phối hợp nhịp nhàng của <b>6 dịch vụ cốt lõi</b>:\n  <br/>• <code>Active Directory Domain Services (NTDS)</code>: Trái tim vận hành database <code>ntds.dit</code>.\n  <br/>• <code>DNS Server (DNS)</code>: Đôi mắt giúp các máy trạm tìm thấy DC qua bản ghi SRV.\n  <br/>• <code>Netlogon</code>: Duy trì Secure Channel, xác thực NTLM và tự động đăng ký bản ghi SRV vào DNS.\n  <br/>• <code>Kerberos Key Distribution Center (kdc)</code>: Cấp phát vé xác thực Kerberos (Port 88).\n  <br/>• <code>Server (LanmanServer)</code> & <code>DFS Replication (DFSR)</code>: Chia sẻ và đồng bộ thư mục <code>SYSVOL</code> & <code>NETLOGON</code> giữa các DC.\n  <br/>• <code>Windows Time (W32Time)</code>: Đồng bộ thời gian chuẩn cho toàn Domain để Kerberos không bị lỗi lệch giờ quá 5 phút.</li><li><b>2. Nguyên lý điều tra 'Hung thủ gây khóa tài khoản liên tục (Account Lockout Storm)':</b> Đây là sự cố xảy ra hàng tuần ở mọi doanh nghiệp! Kịch bản luôn là: Nhân viên vừa đổi mật khẩu mới theo định kỳ 90 ngày, nhưng chỉ 2 phút sau tài khoản liên tục bị khóa (Locked out) dù họ thề là không hề gõ sai mật khẩu. <b>Tại sao lại thế?</b> Vì ở đâu đó trên một chiếc máy tính khác (hoặc ngay trên máy của họ), có một tiến trình ngầm đang lưu mật khẩu cũ và liên tục tự động kết nối lại với DC (ví dụ: <i>Một phiên Remote Desktop (RDP) cũ quên chưa Sign out trên một server khác; một ổ đĩa Map Network Drive tích chọn Reconnect với mật khẩu cũ; mật khẩu cũ lưu trong Windows Credential Manager; hoặc một dịch vụ/Scheduled Task chạy dưới tên User đó</i>). Khi số lần thử sai chạm ngưỡng <code>Account Lockout Threshold</code> (ví dụ 5 lần), máy chủ DC nắm vai trò <b>PDC Emulator</b> sẽ khóa tài khoản và ghi lại một bản ghi <b>Event ID 4740</b>. Trong Event 4740 này, trường <b><code>Caller Computer Name</code></b> sẽ chỉ đích danh tên chiếc máy tính đang gửi mật khẩu cũ!</li></ul>",
      flowTitle: "Quy trình 5 bước điều tra và xử lý dứt điểm sự cố User bị khóa tài khoản (Account Lockout)",
      flowSteps: [
        {
          step: "Bước 1",
          title: "Xác nhận triệu chứng và xác định máy chủ PDC Emulator",
          detail: "Nhân viên `lan.nt` báo không đăng nhập được. Admin kiểm tra trong ADUC thấy tài khoản bị khóa. Trước khi vội vàng Unlock, Admin chạy lệnh `netdom query fsmo` để biết máy DC nào đang giữ vai trò **PDC Emulator** (mọi sự kiện khóa tài khoản trong Domain đều hội tụ về PDC Emulator!).",
          packetOrState: "netdom query fsmo ---> PDC Emulator = DC01.corp.local"
        },
        {
          step: "Bước 2",
          title: "Lọc Event ID 4740 trong Security Log trên máy chủ PDC Emulator",
          detail: "Admin mở `Event Viewer (eventvwr.msc) -> Windows Logs -> Security` trên máy chủ `DC01`, bấm `Filter Current Log` và nhập mã **Event ID: `4740`**.",
          packetOrState: "Filter Security Log: Event ID = 4740 (A user account was locked out)"
        },
        {
          step: "Bước 3",
          title: "Đọc trường 'Caller Computer Name' để bắt tận tay máy tính thủ phạm",
          detail: "Mở bản ghi Event 4740 mới nhất của `lan.nt`. Tại mục `Additional Information -> Caller Computer Name`, hệ thống hiển thị rõ tên máy tính vừa gây ra cú khóa tài khoản, ví dụ: `SRV-APP02` (hoặc `PC-KETOAN01`).",
          packetOrState: "Event 4740 Details: Account Locked Out = lan.nt | Caller Computer Name = SRV-APP02"
        },
        {
          step: "Bước 4",
          title: "Kiểm tra 4 ổ chứa mật khẩu cũ trên chiếc máy thủ phạm",
          detail: "Admin kết nối vào máy `SRV-APP02` và kiểm tra 4 vị trí kinh điển: (1) Phiên Remote Desktop bị Disconnected của `lan.nt` (`quser` / Task Manager -> Users), (2) **Windows Credential Manager** (`control /name Microsoft.CredentialManager`), (3) Các ổ đĩa mạng đã Map (`net use`), và (4) Các Services / Scheduled Tasks đang cấu hình Run As `corp\\lan.nt`.",
          packetOrState: "Phát hiện trên SRV-APP02: Phiên RDP của lan.nt đang ở trạng thái 'Disc' (Disconnected) và có Credential cũ!"
        },
        {
          step: "Bước 5",
          title: "Xóa mật khẩu cũ / Logoff phiên kẹt và Mở khóa (Unlock) tài khoản",
          detail: "Admin xóa Credential cũ, thoát (Logoff) phiên RDP bị treo của `lan.nt` trên `SRV-APP02`, sau đó quay về ADUC mở khóa tài khoản (`Unlock-ADAccount -Identity lan.nt`). Sự cố được giải quyết triệt để!",
          packetOrState: "logoff <SessionID> /server:SRV-APP02 ---> Unlock-ADAccount lan.nt ---> Tài khoản ổn định 100%!"
        }
      ],
      asciiDiagram: ` CHUỖI DỊCH VỤ SỐNG CÒN TRÊN DC & LUỒNG TRUY VẾT EVENT ID 4740 (ACCOUNT LOCKOUT)
 =====================================================================================

 [A] 6 DỊCH VỤ SỐNG CÒN TRÊN DOMAIN CONTROLLER (services.msc)

   +-------------------------------------------------------------------------------+
   | 1. Active Directory Domain Services (NTDS) : Trái tim chạy database ntds.dit  |
   | 2. DNS Server (DNS)                        : Phân giải SRV record tìm DC      |
   | 3. Netlogon                                : Secure Channel & Đăng ký SRV DNS |
   | 4. Kerberos Key Distribution Center (kdc)  : Cấp vé TGT / TGS (Port 88)       |
   | 5. Server (LanmanServer) + DFSR            : Chia sẻ & đồng bộ SYSVOL (GPO)   |
   | 6. Windows Time (W32Time)                  : Giữ lệch giờ <= 5 phút cho KDC   |
   +-------------------------------------------------------------------------------+

 [B] TẠI SAO USER VỪA ĐỔI MẬT KHẨU XONG CỨ BỊ KHÓA LIÊN TỤC? (ĐIỀU TRA EVENT 4740)

   +---------------------------+       (1) Tự động gửi Password CŨ liên tục (5 lần)
   | Máy chủ ứng dụng SRV-APP02| ---------------------------------------------------+
   | (Còn treo phiên RDP cũ    |                                                    |
   |  hoặc lưu Credential cũ   |                                                    v
   |  của User: lan.nt)        |                              +------------------------------------+
   +---------------------------+                              |   DC01 (Nắm giữ role PDC Emulator) |
                                                              |                                    |
                                                              | - Ghi 5 lần Event ID 4625 (Failed) |
                                                              | - Chạm ngưỡng Lockout = 5 lần!     |
                                                              | - Sinh ra EVENT ID 4740:           |
                                                              |   • Account: lan.nt                |
                                                              |   • Caller Computer: SRV-APP02 <===|== BẮT THỦ PHẠM!
                                                              +------------------------------------+`,
      keyTakeaways: [
        "Nằm lòng 3 mã Event ID Bảo mật: `4624` (Đăng nhập thành công), `4625` (Đăng nhập thất bại) và `4740` (Tài khoản bị khóa tự động).",
        "Khi điều tra lỗi tài khoản tự động bị khóa liên tục, hãy mở Event Viewer trên máy chủ **PDC Emulator**, lọc **Event ID `4740`** và nhìn vào trường **`Caller Computer Name`** để tìm máy tính đang lưu mật khẩu cũ.",
        "Nằm lòng 3 loại Logon Type phổ biến nhất: `Type 2` (Interactive - ngồi trực tiếp tại máy), `Type 3` (Network - qua SMB/mạng), `Type 10` (RemoteInteractive - qua Remote Desktop RDP).",
        "Nếu xóa nhầm bản ghi DNS SRV của DC, chỉ cần chạy `Restart-Service Netlogon` (hoặc `nltest /dsregdns`) là DC tự động đăng ký lại toàn bộ bản ghi SRV."
      ]
    },
    level3_practice: {
      scenario: "Trong ca trực sáng nay, cậu cần thực hiện bài kiểm tra sức khỏe định kỳ cho máy chủ Domain Controller `DC01` (kiểm tra 6 dịch vụ lõi và chạy công cụ chẩn đoán `dcdiag`), đồng thời truy vấn nhật ký Event Viewer để tìm nguyên nhân tại sao tài khoản `lan.nt` bị khóa.",
      steps: [
        {
          title: "Bước 1: Kiểm tra trạng thái 6 dịch vụ sống còn trên Domain Controller",
          instruction: "Mở PowerShell với quyền Administrator trên `DC01` và kiểm tra trạng thái cùng chế độ khởi động của 6 dịch vụ cốt lõi.",
          commandOrConfig: `PS C:\\> Get-Service NTDS, DNS, Netlogon, kdc, LanmanServer, DFSR, W32Time | Select-Object Name, DisplayName, Status, StartType

Name         DisplayName                             Status StartType
----         -----------                             ------ ---------
DFSR         DFS Replication                        Running Automatic
DNS          DNS Server                             Running Automatic
kdc          Kerberos Key Distribution Center       Running Automatic
LanmanServer Server                                 Running Automatic
Netlogon     Netlogon                               Running Automatic
NTDS         Active Directory Domain Services       Running Automatic
W32Time      Windows Time                           Running Automatic`,
          explanation: "Tất cả 7 dịch vụ trên bắt buộc phải ở trạng thái `Status = Running` và `StartType = Automatic`. Nếu bất kỳ dịch vụ nào trong danh sách này bị `Stopped`, hệ thống Domain chắc chắn sẽ phát sinh lỗi nghiêm trọng."
        },
        {
          title: "Bước 2: Chạy công cụ chẩn đoán toàn diện Domain Controller (dcdiag)",
          instruction: "Sử dụng câu lệnh `dcdiag` — công cụ tích hợp sẵn của Microsoft để kiểm tra toàn bộ sức khỏe của AD DS, từ kết nối, đồng bộ (Replication), chia sẻ SYSVOL/NETLOGON cho đến các dịch vụ và DNS.",
          commandOrConfig: `C:\\Users\\Administrator> dcdiag /q
# (Tham số /q chỉ in ra những bài test bị LỖI. Nếu không in ra dòng lỗi nào tức là DC hoàn toàn khỏe mạnh!)

# Hoặc chạy kiểm tra chi tiết từng hạng mục:
C:\\Users\\Administrator> dcdiag /test:NetLogons /test:Services /test:Advertising
Doing initial required tests
   Testing server: Default-First-Site-Name\\DC01
      Starting test: Connectivity
         ......................... DC01 passed test Connectivity

Doing primary tests
   Testing server: Default-First-Site-Name\\DC01
      Starting test: Advertising
         ......................... DC01 passed test Advertising
      Starting test: NetLogons
         ......................... DC01 passed test NetLogons
      Starting test: Services
         ......................... DC01 passed test Services`,
          explanation: "Trong phỏng vấn, khi được hỏi *\"Làm sao để kiểm tra tổng thể một Domain Controller có đang hoạt động tốt không?\"*, hãy nhắc ngay đến bộ đôi câu lệnh **`dcdiag`** (chẩn đoán sức khỏe DC) và **`repadmin /replsummary`** (kiểm tra đồng bộ giữa các DC) — nhà tuyển dụng sẽ đánh giá rất cao tính thực chiến của cậu!"
        },
        {
          title: "Bước 3: Truy vấn Event ID 4740 (Khóa tài khoản) và 4625 (Sai mật khẩu) trong Event Viewer",
          instruction: "Trên giao diện đồ họa, cậu mở `Event Viewer (eventvwr.msc) -> Windows Logs -> Security -> bấm Filter Current Log... -> ô Includes/Excludes Event IDs nhập: 4740, 4625`. Hoặc dùng lệnh PowerShell siêu tốc dưới đây để trích xuất ngay tên máy thủ phạm:",
          commandOrConfig: `# Truy vấn các sự kiện khóa tài khoản (Event ID 4740) trong 24 giờ qua trên PDC Emulator:
PS C:\\> Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4740} -MaxEvents 5 |
        Select-Object TimeCreated,
                      @{Name='LockedUser';Expression={$_.Properties[0].Value}},
                      @{Name='CallerComputer';Expression={$_.Properties[1].Value}}

TimeCreated            LockedUser  CallerComputer
-----------            ----------  --------------
10/12/2026 9:15:42 AM  lan.nt      PC01`,
          explanation: "Chỉ với một lệnh `Get-WinEvent` lọc mã `4740` (hoặc nhìn trong giao diện Event Viewer), cậu thấy ngay: Tài khoản bị khóa là `lan.nt` và chiếc máy tính gây khóa chính là `PC01` (`CallerComputer`)."
        },
        {
          title: "Bước 4: Xóa mật khẩu cũ lưu trên máy trạm và Mở khóa tài khoản (Unlock)",
          instruction: "Trên máy trạm `PC01` của `lan.nt`, kiểm tra và xóa các thông tin đăng nhập cũ đang lưu trong Windows Credential Manager bằng lệnh `cmdkey`, sau đó mở khóa tài khoản trên DC.",
          commandOrConfig: `# 1. Trên máy trạm PC01 — Liệt kê và xóa Credential cũ lưu trong Windows:
C:\\Users\\lan.nt> cmdkey /list
Currently stored credentials:
    Target: Domain:target=fs01.corp.local
    Type: Domain Password
    User: CORP\\lan.nt

C:\\Users\\lan.nt> cmdkey /delete:Domain:target=fs01.corp.local
CMDKEY: Credential deleted successfully.

# 2. Trên máy chủ DC01 — Mở khóa tài khoản cho lan.nt:
PS C:\\> Search-ADAccount -LockedOut | Select-Object Name, SamAccountName, LockedOut
PS C:\\> Unlock-ADAccount -Identity "lan.nt"`,
          explanation: "Lệnh `cmdkey /list` và `cmdkey /delete` (hoặc mở GUI `Control Panel -> Credential Manager -> Windows Credentials`) giúp dọn sạch mật khẩu cũ còn lưu trên máy nhân viên. Kết hợp với `Search-ADAccount -LockedOut` và `Unlock-ADAccount`, cậu xử lý gọn gàng sự cố trong vòng chưa đầy 2 phút!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Nhân viên vừa đổi mật khẩu Domain vào sáng đầu tuần, sau đó cứ mỗi 5-10 phút tài khoản lại tự động bị khóa (Account is locked out), mở khóa xong lại bị khóa tiếp",
          hypothesis: "Có một thiết bị hoặc tiến trình đang lưu mật khẩu cũ và tự động gửi yêu cầu xác thực liên tục về DC (ví dụ: Phiên Remote Desktop bị Disconnected trên một server khác, Windows Credential Manager, ổ đĩa mạng Map với mật khẩu cũ, hoặc điện thoại kết nối Wifi/Email công ty).",
          testCommand: "Mở Event Viewer -> Security trên PDC Emulator, lọc Event ID 4740 và đọc trường 'Caller Computer Name'",
          fix: "Vào đúng máy tính ghi trong `Caller Computer Name`, thoát phiên RDP bị treo (`logoff`), xóa mật khẩu cũ trong Credential Manager (`cmdkey /list`), cập nhật lại mật khẩu Wifi/Mail trên điện thoại, sau đó mới Unlock tài khoản trong ADUC."
        },
        {
          symptom: "Máy chủ File Server `FS01` vẫn đang bật, ping tới IP của `FS01` rất mượt và vẫn Remote Desktop vào `FS01` được, nhưng toàn bộ nhân viên trong công ty không thể truy cập bất kỳ thư mục chia sẻ nào trên `\\\\FS01\\...`",
          hypothesis: "Dịch vụ **Server (`LanmanServer`)** trên máy chủ `FS01` đã bị dừng (Stopped) hoặc cổng SMB TCP 445 bị chặn trên Windows Firewall của `FS01`.",
          testCommand: "Get-Service LanmanServer (chạy trên FS01) && Test-NetConnection -ComputerName FS01 -Port 445 (từ máy trạm)",
          fix: "Khởi động lại dịch vụ Server trên `FS01` bằng lệnh `Start-Service LanmanServer` và đặt chế độ `Set-Service LanmanServer -StartupType Automatic`, đồng thời kiểm tra Rule 'File and Printer Sharing (SMB-In)' trên Firewall."
        },
        {
          symptom: "Một quản trị viên tập sự lỡ tay xóa mất thư mục `_msdcs` hoặc các bản ghi SRV trong DNS Manager của Domain Controller, khiến các máy trạm mới không tìm thấy DC nữa",
          hypothesis: "Thiếu các bản ghi định vị dịch vụ DNS SRV (`_ldap._tcp.dc._msdcs...` và `_kerberos._tcp.dc._msdcs...`).",
          testCommand: "dcdiag /test:Advertising && nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local",
          fix: "Không cần tạo lại từng bản ghi SRV bằng tay! Chỉ cần chạy lệnh `Restart-Service Netlogon` (hoặc `nltest /dsregdns` và `ipconfig /registerdns`) trên Domain Controller, dịch vụ Netlogon sẽ tự động đọc file `netlogon.dns` và tạo lại toàn bộ bản ghi SRV chỉ trong vài giây."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Tình huống thực tế: Sáng thứ Hai, Trưởng phòng Kế toán gọi điện báo tài khoản bị khóa. Em vào Active Directory Users and Computers tích bỏ ô 'Unlock account' cho chị ấy làm việc. Nhưng chỉ 3 phút sau chị ấy lại gọi báo bị khóa tiếp! Em sẽ xử lý tình huống này theo quy trình như thế nào?",
          wrongAnswer: "Em sẽ vào Group Policy tắt tính năng khóa tài khoản đi hoặc đổi tên tài khoản mới cho chị ấy dùng tạm.",
          rightAnswer: "Tuyệt đối không được tắt chính sách khóa tài khoản vì sẽ làm mất an toàn bảo mật! Nguyên nhân của hiện tượng mở khóa xong lại tự khóa ngay là do có một máy tính hoặc thiết bị nào đó đang lưu mật khẩu cũ của chị Trưởng phòng và liên tục tự động thử đăng nhập ngầm. Quy trình xử lý chuẩn của em gồm 4 bước:\n1. Xác định máy chủ DC nào đang nắm vai trò **PDC Emulator** (bằng lệnh `netdom query fsmo`).\n2. Mở **Event Viewer** (`Windows Logs -> Security`) trên máy chủ PDC Emulator đó và lọc theo **Event ID `4740`** (A user account was locked out).\n3. Mở chi tiết bản ghi Event 4740 của tài khoản đó, đọc trường **`Caller Computer Name`** để biết chính xác tên chiếc máy tính/server nào đang gửi mật khẩu sai.\n4. Truy cập vào chiếc máy tính thủ phạm đó để kiểm tra và xử lý 4 nơi hay lưu mật khẩu cũ nhất: Các phiên **Remote Desktop (RDP) đang bị Disconnected** quên chưa Sign out, **Windows Credential Manager**, các **Mapped Network Drives** hoặc các **Scheduled Tasks / Services**, cùng với kết nối Wifi/Mail trên điện thoại cá nhân. Sau khi dọn sạch mật khẩu cũ ở máy thủ phạm rồi mới Unlock lại tài khoản.",
          keyPoints: [
            "Nêu đúng nguyên nhân: Có phiên làm việc cũ hoặc thiết bị đang lưu mật khẩu cũ tự động gửi request xác thực ngầm",
            "Nhớ chính xác mã Event ID `4740` xem trên máy chủ giữ role **PDC Emulator**",
            "Chỉ ra trường thông tin quyết định: `Caller Computer Name` và 4 vị trí cần dọn (Disconnected RDP, Credential Manager, Mapped Drives, Services/Tasks)"
          ]
        },
        {
          question: "Khi kiểm tra nhật ký Security Log trên Windows Server và thấy nhiều bản ghi Event ID 4624 và 4625, làm sao em phân biệt được đâu là người đang ngồi trực tiếp trước màn hình máy chủ để đăng nhập, đâu là người truy cập thư mục chia sẻ qua mạng, và đâu là người đang Remote Desktop (RDP) vào máy chủ?",
          wrongAnswer: "Em nhìn vào tên tài khoản, nếu là Administrator thì là đang Remote Desktop còn tên nhân viên là đang truy cập file share.",
          rightAnswer: "Ta không thể đoán qua tên tài khoản mà phải nhìn vào trường **`Logon Type` (Loại đăng nhập)** bên trong chi tiết của Event ID 4624 hoặc 4625:\n- **`Logon Type 2` (Interactive)**: Là đăng nhập trực tiếp tại bàn phím/màn hình vật lý (Console) của máy chủ.\n- **`Logon Type 3` (Network)**: Là đăng nhập qua mạng, thường gặp nhất khi người dùng truy cập vào thư mục chia sẻ SMB (`\\\\Server\\Share`) hoặc máy in mạng.\n- **`Logon Type 10` (RemoteInteractive)**: Là đăng nhập từ xa qua giao diện đồ họa **Remote Desktop Protocol (RDP / Terminal Services)**.",
          keyPoints: [
            "Chỉ rõ trường cần đọc trong Event 4624/4625 là `Logon Type`",
            "Phân biệt chuẩn 3 con số: `Type 2` = Interactive (Trực tiếp tại máy), `Type 3` = Network (SMB Share qua mạng), `Type 10` = RemoteInteractive (Remote Desktop - RDP)"
          ]
        },
        {
          question: "Trên máy chủ Domain Controller, dịch vụ `Netlogon` và dịch vụ `Server (LanmanServer)` đóng vai trò gì? Nếu một trong hai dịch vụ này bị dừng (Stopped) thì gây ra hậu quả cụ thể nào?",
          wrongAnswer: "Cả hai đều là dịch vụ mạng của Windows, nếu dừng thì máy chủ mất kết nối mạng LAN không ping được nữa.",
          rightAnswer: "Dừng 2 dịch vụ này không làm mất kết nối ping (ICMP), nhưng sẽ làm tê liệt chức năng của Domain Controller theo 2 cách khác nhau:\n1. **Dịch vụ `Netlogon`**: Có nhiệm vụ duy trì kênh bảo mật (Secure Channel) với các máy trạm, xử lý xác thực NTLM và tự động đăng ký các bản ghi DNS SRV của DC. Nếu `Netlogon` bị dừng, DC sẽ ngừng quảng bá mình là Domain Controller, máy trạm không thể xác thực kênh tin cậy hay tìm thấy DC.\n2. **Dịch vụ `Server` (`LanmanServer`)**: Có nhiệm vụ cung cấp giao thức chia sẻ tệp SMB từ máy chủ ra mạng. Trên Domain Controller, thư mục `SYSVOL` và `NETLOGON` được chia sẻ qua dịch vụ này. Nếu dịch vụ `Server` bị dừng, toàn bộ máy trạm trong công ty sẽ không thể truy cập vào `\\\\DC\\SYSVOL`, dẫn đến **toàn bộ hệ thống Group Policy (GPO) và Logon Scripts bị tê liệt**!",
          keyPoints: [
            "Netlogon: Duy trì Secure Channel, xác thực NTLM và đăng ký bản ghi DNS SRV cho DC",
            "Server (LanmanServer): Chia sẻ SMB ra mạng (bao gồm 2 share sống còn của DC là `SYSVOL` và `NETLOGON`)",
            "Hậu quả khi dừng Server: Máy trạm không đọc được `SYSVOL` -> không tải được bất kỳ GPO nào"
          ]
        }
      ],
      quizzes: [
        {
          question: "Khi kiểm tra Security Log trong Event Viewer của máy chủ Windows Server, cặp mã Event ID nào dưới đây tương ứng với 'Đăng nhập thành công' và 'Đăng nhập thất bại'?",
          options: [
            "Event ID 1000 (Thành công) và Event ID 1001 (Thất bại)",
            "Event ID 4624 (Thành công) và Event ID 4625 (Thất bại)",
            "Event ID 4720 (Thành công) và Event ID 4726 (Thất bại)",
            "Event ID 6005 (Thành công) và Event ID 6006 (Thất bại)"
          ],
          correctIndex: 1,
          explanation: "Trong Windows Security Auditing: **Event ID `4624`** là *An account was successfully logged on* (Đăng nhập thành công), và **Event ID `4625`** là *An account failed to log on* (Đăng nhập thất bại). Còn `4720`/`4726` là Tạo/Xóa user; `6005`/`6006` trong System Log là dịch vụ Event Log khởi động/tắt máy."
        },
        {
          question: "Trong chi tiết của một bản ghi Event ID 4624 (Đăng nhập thành công), nếu trường `Logon Type` có giá trị là `10`, điều đó có nghĩa là người dùng đã đăng nhập vào máy chủ bằng phương thức nào?",
          options: [
            "Ngồi gõ bàn phím trực tiếp tại màn hình vật lý của máy chủ (Interactive)",
            "Truy cập vào một thư mục chia sẻ SMB qua mạng (Network)",
            "Kết nối từ xa qua giao diện đồ họa Remote Desktop (RemoteInteractive / RDP)",
            "Chạy một dịch vụ nền Windows Service (Service)"
          ],
          correctIndex: 2,
          explanation: "`Logon Type 10` (RemoteInteractive) cho biết phiên đăng nhập được thực hiện thông qua **Remote Desktop (RDP)**. (`Type 2` là trực tiếp tại máy, `Type 3` là qua mạng SMB, `Type 5` là Windows Service)."
        },
        {
          question: "Công cụ dòng lệnh tích hợp sẵn nào của Windows Server chuyên dùng để kiểm tra và chẩn đoán toàn diện sức khỏe của một Domain Controller (kiểm tra Connectivity, Services, Advertising, NetLogons, Replications...)?",
          options: [
            "tracert",
            "dcdiag",
            "diskpart",
            "sfc /scannow"
          ],
          correctIndex: 1,
          explanation: "`dcdiag` (Domain Controller Diagnostics) là công cụ chuẩn của Microsoft để kiểm tra toàn bộ các khía cạnh vận hành của một Domain Controller từ dịch vụ, quảng bá AD, chia sẻ SYSVOL cho đến DNS và đồng bộ."
        }
      ]
    }
  },

  // =========================================================================
  // BÀI 12: LAB WINDOWS SERVER TOÀN DIỆN (END-TO-END LAB)
  // =========================================================================
  {
    id: 12,
    code: "12",
    week: 2,
    title: "LAB Tổng Hợp Tuần 2: Triển Khai Hạ Tầng Active Directory, File Server & GPO Thực Chiến",
    subtitle: "Dựng Domain từ con số 0, quy hoạch OU/Group chuẩn AGDLP, phân quyền Share+NTFS và áp GPO chặn USB",
    priority: "LAB",
    duration: "120 phút",
    whyThisMatters: "Đã đến lúc ghép nối toàn bộ kiến thức từ Bài 07 đến Bài 11 thành một hệ thống doanh nghiệp hoàn chỉnh! Bài Lab tổng hợp này được thiết kế để cậu vừa thực hành từng bước trên máy ảo (VMware Workstation / Hyper-V), vừa hiểu rõ **lý do đằng sau mỗi cú click chuột và mỗi dòng lệnh**. Sau khi tự tay hoàn thành bài Lab này, cậu sẽ xóa bỏ hoàn toàn điểm yếu 'Chưa từng làm GPO', làm chủ bài toán phân quyền File Server và sẵn sàng trả lời mọi câu hỏi thực hành về Windows Server khi đi phỏng vấn.",
    analogy: {
      title: "Tổng Công Trình Sư: Xây Dựng Trụ Sở Tập Đoàn Từ Bãi Đất Trống",
      content: "Trong bài Lab này, cậu chính là **Kiến trúc sư Hệ thống (System Architect)** xây dựng hạ tầng CNTT cho một chi nhánh công ty mới:\n1. **Giai đoạn 1 (Dựng móng & Trung tâm chỉ huy)**: Cài đặt máy chủ `DC01`, đặt IP tĩnh, nâng cấp lên Domain Controller quản lý tên miền `corp.local` kèm tổng đài chỉ dẫn nội bộ `AD DNS`.\n2. **Giai đoạn 2 (Quy hoạch phòng ban & Nhân sự)**: Xây dựng sơ đồ các tầng lầu (`OU=PhongKeToan`, tách rõ `OU=Users` và `OU=Computers`), tuyển nhân viên (`lan.nt`, `hoa.tt`) và cấp thẻ từ theo chức danh (`SG_KeToan_Staff`, `SG_KeToan_Manager`).\n3. **Giai đoạn 3 (Nhập tịch máy trạm)**: Đưa máy tính bàn của nhân viên (`PC01`) vào mạng, trỏ DNS về `DC01`, thực hiện Join Domain và chuyển `PC01` về đúng tầng lầu `OU=Computers`.\n4. **Giai đoạn 4 (Xây kho tài liệu bảo mật 2 lớp)**: Dựng kho lưu trữ `KeToan$` với bảo vệ cổng ngoài (`SMB Share`) và khóa két sắt bên trong (`NTFS Permission` + tắt kế thừa cho thư mục Mật).\n5. **Giai đoạn 5 (Ban hành Nội quy tự động)**: Ban hành lệnh cấm cắm USB (`GPO_Block_USB` gắn vào `OU=Computers`) và tự động gắn ổ đĩa mạng `Z:` (`GPO_KeToan_UserPolicy` gắn vào `OU=Users`).\n6. **Giai đoạn 6 (Nghiệm thu & Giám sát)**: Đăng nhập trên `PC01` để kiểm chứng toàn bộ quyền hạn, chạy `gpresult` và kiểm tra nhật ký đăng nhập trên `Event Viewer`!"
    },
    level1_definitions: {
      concepts: [
        {
          term: "Mô hình Topo Phòng Lab (2 Máy ảo kết nối LAN Segment / Host-Only)",
          shortDef: "Môi trường Lab tối ưu chỉ cần 2 máy ảo: 1 máy Windows Server 2019/2022 làm Domain Controller kiêm DNS & File Server (`DC01` - RAM 2GB-4GB) và 1 máy Windows 10/11 Pro làm máy trạm nhân viên (`PC01` - RAM 2GB).",
          easyExplain: "Để 2 máy ảo nhìn thấy nhau tuyệt đối và không bị xung đột với bộ phát DHCP của cục Router Wifi nhà cậu, hãy đặt card mạng của cả 2 máy ảo vào cùng một **LAN Segment** (hoặc **Host-Only / Internal Network**) trên VMware/Hyper-V:\n- **`DC01.corp.local`**: IP `192.168.10.10/24`, Preferred DNS: `127.0.0.1` (hoặc `192.168.10.10`).\n- **`PC01.corp.local`**: IP `192.168.10.101/24`, Preferred DNS: `192.168.10.10` (**Bắt buộc trỏ về IP của DC01!**).",
          realExample: "Chỉ với 1 chiếc Laptop có 8GB - 16GB RAM, cậu hoàn toàn có thể bật đồng thời 2 máy ảo `DC01` và `PC01` chạy mượt mà để thực hành toàn bộ bài Lab này."
        },
        {
          term: "Quy hoạch cây OU chuẩn Best Practice (Tách biệt Users và Computers)",
          shortDef: "Là phương pháp thiết kế một OU gốc đại diện cho công ty (ví dụ `OU=_CORP`), bên trong chia theo từng phòng ban và trong mỗi phòng ban luôn có 2 OU con tách biệt là `OU=Users` và `OU=Computers`.",
          easyExplain: "Tại sao không tạo OU ngay ngoài gốc mà nên gom vào một OU cha như `OU=_CORP`? Vì làm vậy giúp tách bạch hoàn toàn các đối tượng do cậu tạo ra với các Container hệ thống mặc định của Microsoft, đồng thời khi cần gắn một GPO chung cho toàn bộ nhân viên công ty (mà không muốn ảnh hưởng đến tài khoản Administrator hay máy chủ DC), cậu chỉ cần Link GPO vào `OU=_CORP`!",
          realExample: "Cấu trúc chuẩn: `DC=corp,DC=local` -> `OU=_CORP` -> `OU=PhongKeToan` -> `OU=Users` + `OU=Computers` + `OU=Groups`."
        },
        {
          term: "Thiết kế Ma trận Phân quyền File Server (Permission Matrix)",
          shortDef: "Là bảng quy hoạch rõ ràng từng thư mục chia sẻ sẽ cấp quyền gì cho Security Group nào trước khi bắt tay vào cấu hình thực tế trên Windows Server.",
          easyExplain: "Trong bài Lab này, chúng ta áp dụng đúng công thức chuẩn doanh nghiệp:\n- **SMB Share (`\\\\DC01\\KeToan$`)**: `Authenticated Users = Change`, `Domain Admins = Full Control`.\n- **NTFS tại thư mục gốc (`C:\\Shares\\KeToan`)**: `SG_KeToan_Staff = Modify`, `SG_KeToan_Manager = Modify`.\n- **NTFS tại thư mục con (`C:\\Shares\\KeToan\\BaoCaoMat`)**: Tắt kế thừa (`Disable Inheritance`), chỉ giữ lại `SG_KeToan_Manager = Modify` và `Administrators/SYSTEM = Full Control`.",
          realExample: "Khi đăng nhập bằng `lan.nt` (thuộc `SG_KeToan_Staff`), cô ấy tạo/sửa/xóa file trong `Z:\\` bình thường, nhưng nháy đúp vào thư mục `Z:\\BaoCaoMat` sẽ bị chặn ngay lập tức!"
        },
        {
          term: "Bộ đôi GPO Thực chiến (Computer Policy + User Policy)",
          shortDef: "Kết hợp triển khai cả GPO nhánh Computer (chặn USB lưu trữ) và GPO nhánh User (Map ổ đĩa mạng `Z:`, đặt màn hình khóa/khóa Control Panel) để kiểm chứng sự khác biệt bản chất giữa hai nhánh cấu hình.",
          easyExplain: "Việc tự tay tạo cả 2 GPO này và gắn vào 2 OU khác nhau (`OU=Computers` và `OU=Users`) sẽ giúp cậu nhớ suốt đời quy tắc: *Computer Config đi với OU Computers, User Config đi với OU Users*.",
          realExample: "`GPO_Block_USB` gắn vào `OU=Computers,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local`; còn `GPO_KeToan_UserPolicy` gắn vào `OU=Users,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local`."
        },
        {
          term: "Checklist Nghiệm thu Hệ thống (System Verification Checklist)",
          shortDef: "Là bộ 5 phép thử cuối cùng trên cả máy trạm và máy chủ để chứng minh toàn bộ hạ tầng AD, DNS, File Server và GPO đã hoạt động đúng thiết kế 100%.",
          easyExplain: "Một SysAdmin chuyên nghiệp không bao giờ cấu hình xong rồi để đó! Cậu luôn phải nghiệm thu qua 5 bước:\n1. Kiểm tra DNS SRV: `nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local`\n2. Kiểm tra vị trí OU của máy và user: `gpresult /r`\n3. Kiểm tra ổ đĩa mạng `Z:` tự động xuất hiện và thử tạo file mới.\n4. Kiểm tra quyền bị chặn khi `lan.nt` bấm vào thư mục `BaoCaoMat` và khi bấm mở `Control Panel`.\n5. Kiểm tra bản ghi `Event ID 4624` trên Event Viewer của `DC01`.",
          realExample: "Khi đi phỏng vấn, nếu cậu trình bày mạch lạc cả quy trình thiết kế lẫn 5 bước nghiệm thu này, người phỏng vấn sẽ biết ngay cậu là người đã làm thật và hiểu rất sâu!"
        }
      ],
      comparisonTable: {
        title: "Bảng đối chiếu: Cách làm Nghiệp dư (Hay gặp lỗi) vs Cách làm Chuẩn Chuyên Nghiệp trong Lab & Thực tế",
        headers: ["Hạng mục triển khai", "Cách làm Nghiệp dư (Dễ lỗi & Trừ điểm phỏng vấn)", "Cách làm Chuẩn Doanh Nghiệp (Best Practice)"],
        rows: [
          ["**1. Cấu hình DNS trên máy trạm**", "Đặt Preferred DNS = IP của DC (`192.168.10.10`), Alternate DNS = `8.8.8.8`", "Trên máy trạm **CHỈ trỏ DNS về các máy chủ DC** (`192.168.10.10`). Cấu hình **DNS Forwarder** ra `8.8.8.8` trên DNS Server của DC"],
          ["**2. Vị trí đặt User & Computer**", "Để mặc kệ User trong Container `Users` và máy trạm trong Container `Computers` mặc định", "Thiết kế cây `OU=_CORP -> OU=PhongKeToan -> OU=Users & OU=Computers` và **Move máy trạm về đúng OU** ngay sau khi Join Domain"],
          ["**3. Phân quyền File Server**", "Gán quyền trực tiếp cho từng User lẻ; hoặc quên chỉnh Share Permission (để mặc định `Everyone = Read`); hoặc lạm dụng tích ô `Deny`", "Phân quyền theo **Security Group (AGDLP)**; mở `Authenticated Users = Change` ở Share, khóa chặt ở NTFS (`Modify`); dùng **Disable Inheritance + Remove** thay vì `Deny`"],
          ["**4. Triển khai Group Policy (GPO)**", "Sửa thẳng vào *Default Domain Policy*; hoặc cấu hình Computer Config nhưng lại Link vào OU chỉ chứa User", "Tạo **GPO riêng biệt theo từng chức năng** và Link chính xác vào `OU=Computers` (cho Computer Config) hoặc `OU=Users` (cho User Config)"]
        ]
      }
    },
    level2_principles: {
      corePrinciple: "Hãy nhìn vào **Bức tranh tổng thể (End-to-End Architecture)** khi tất cả các thành phần của Tuần 2 kết hợp lại với nhau trong một buổi sáng làm việc của nhân viên Kế toán tên Lan (<code>corp\\lan.nt</code>):\n<ul><li><b>Lúc 08:00 (Bật nút nguồn máy tính <code>PC01</code>):</b> Máy <code>PC01</code> hỏi <b>AD DNS</b> trên <code>DC01</code> bản ghi SRV <code>_ldap._tcp.dc._msdcs.corp.local</code> để tìm DC. Sau đó tài khoản máy tính <code>PC01$</code> xác thực qua <b>Netlogon / Kerberos</b>, kiểm tra thấy mình đang nằm trong <code>OU=Computers</code> nên tải <b><code>GPO_Block_USB</code></b> từ thư mục <b><code>\\\\corp.local\\SYSVOL</code></b> về và khóa chặt cổng USB trước khi hiện màn hình đăng nhập.</li><li><b>Lúc 08:02 (Nhân viên <code>lan.nt</code> nhập mật khẩu đăng nhập):</b> Máy <code>PC01</code> gửi gói tin <code>AS-REQ</code> tới dịch vụ <b>KDC (Port 88)</b> trên <code>DC01</code> để xin vé tổng <b>TGT</b>. <code>DC01</code> ghi nhận sự kiện đăng nhập thành công vào <b>Event Viewer (Event ID 4624)</b> và tạo <b>Access Token</b> cho <code>lan.nt</code> (chứa SID của nhóm <code>SG_KeToan_Staff</code>).</li><li><b>Lúc 08:03 (Màn hình Desktop hiện lên):</b> Hệ thống thấy <code>lan.nt</code> nằm trong <code>OU=Users</code> nên thực thi <b><code>GPO_KeToan_UserPolicy</code></b>: Tự động khóa Control Panel và gắn ổ đĩa mạng <b><code>Z:</code></b> trỏ vào <code>\\\\dc01.corp.local\\KeToan$</code>.</li><li><b>Lúc 08:05 (Mở ổ đĩa <code>Z:</code> làm việc):</b> Máy <code>PC01</code> dùng TGT xin vé dịch vụ <b>TGS (<code>cifs/dc01.corp.local</code>)</b> rồi kết nối qua dịch vụ <b>Server (SMB Port 445)</b>. Hệ thống tính toán <b>Effective Permission</b>: <code>Share (Change)</code> $\\cap$ <code>NTFS (Modify)</code> = <b><code>Modify</code></b>. Lan tạo và lưu bảng tính Excel mượt mà, nhưng khi bấm vào thư mục con <code>BaoCaoMat</code> (đã tắt kế thừa và gỡ nhóm Staff), hệ thống chặn lại ngay lập tức!</li></ul>",
      flowTitle: "Lộ trình 6 Giai đoạn triển khai Phòng Lab Windows Server End-to-End",
      flowSteps: [
        {
          step: "Giai đoạn 1",
          title: "Dựng Domain Controller (DC01) & AD-Integrated DNS",
          detail: "Đặt IP tĩnh `192.168.10.10/24`, đổi tên máy thành `DC01`, cài đặt role AD DS và nâng cấp lên Domain Controller cho forest mới `corp.local`. Kiểm tra share `SYSVOL` và bản ghi SRV.",
          packetOrState: "Server: DC01.corp.local (192.168.10.10) | Role: AD DS + DNS Server | Status: Active"
        },
        {
          step: "Giai đoạn 2",
          title: "Quy hoạch Cây OU, Tạo Users & Security Groups",
          detail: "Tạo cây OU: `OU=_CORP -> OU=PhongKeToan -> (OU=Users & OU=Computers)`. Tạo 2 tài khoản `lan.nt` (Nhân viên), `hoa.tt` (Trưởng phòng) trong `OU=Users` và đưa vào 2 Security Group `SG_KeToan_Staff`, `SG_KeToan_Manager`.",
          packetOrState: "lan.nt ---> SG_KeToan_Staff | hoa.tt ---> SG_KeToan_Manager"
        },
        {
          step: "Giai đoạn 3",
          title: "Cấu hình DNS Máy trạm (PC01), Join Domain & Move vào OU",
          detail: "Trên máy Windows 10/11 (`PC01`), đặt IP `192.168.10.101/24` và Preferred DNS = `192.168.10.10`. Thực hiện Join vào domain `corp.local`, sau đó lên `DC01` di chuyển đối tượng `PC01` từ `CN=Computers` vào `OU=Computers` của Phòng Kế Toán.",
          packetOrState: "PC01 DistinguishedName = CN=PC01,OU=Computers,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"
        },
        {
          step: "Giai đoạn 4",
          title: "Thiết lập File Server (SMB Share + NTFS Permission + Inheritance)",
          detail: "Tạo thư mục `C:\\Shares\\KeToan` và thư mục con `BaoCaoMat`. Chia sẻ SMB tên `KeToan$` (`Authenticated Users = Change`). Cấu hình NTFS cho phép cả 2 nhóm `Modify` ở thư mục cha, nhưng tắt kế thừa ở `BaoCaoMat` để chỉ cho phép `SG_KeToan_Manager`.",
          packetOrState: "KeToan$: Staff = Modify, Manager = Modify | BaoCaoMat: Staff = Denied/Removed, Manager = Modify"
        },
        {
          step: "Giai đoạn 5",
          title: "Triển khai Group Policy (GPO Chặn USB & GPO Map ổ đĩa + Khóa Control Panel)",
          detail: "Tạo `GPO_Block_USB` (Computer Config) gắn vào `OU=Computers` và tạo `GPO_KeToan_UserPolicy` (User Config: Map ổ `Z:` vào `\\\\dc01.corp.local\\KeToan$` + Khóa Control Panel) gắn vào `OU=Users`.",
          packetOrState: "OU=Computers <--- [GPO_Block_USB] | OU=Users <--- [GPO_KeToan_UserPolicy]"
        },
        {
          step: "Giai đoạn 6",
          title: "Nghiệm thu tổng thể trên PC01 và Kiểm tra Event Viewer trên DC01",
          detail: "Đăng nhập `corp\\lan.nt` trên `PC01`, chạy `gpupdate /force` và `gpresult /r`, kiểm tra ổ đĩa `Z:`, thử mở `BaoCaoMat`, thử mở Control Panel và kiểm tra vé Kerberos bằng `klist` cùng nhật ký `Event ID 4624` trên `DC01`.",
          packetOrState: "Verification: DNS SRV [OK] | Kerberos TGT/TGS [OK] | GPO RSoP [OK] | NTFS ACL [OK]"
        }
      ],
      asciiDiagram: ` SƠ ĐỒ KIẾN TRÚC TỔNG THỂ BÀI LAB TUẦN 2 (DOMAIN: corp.local)
 =====================================================================================

   +---------------------------------------------------+       LAN Segment: 192.168.10.0/24
   | MÁY CHỦ: DC01.corp.local (Windows Server 2022)    | <====================================+
   | IP: 192.168.10.10/24 | DNS: 127.0.0.1             |                                      |
   |---------------------------------------------------|                                      |
   | [1] Roles: AD DS (ntds.dit + SYSVOL) & DNS Server |                                      |
   | [2] Cấu trúc Cây OU & GPO:                        |                                      |
   |     corp.local                                    |                                      |
   |      └── [OU] _CORP                               |                                      |
   |           └── [OU] PhongKeToan                    |                                      |
   |                ├── [OU] Computers (Chứa: PC01$)   | <--- Link: [GPO_Block_USB]           |
   |                ├── [OU] Users (lan.nt, hoa.tt)    | <--- Link: [GPO_KeToan_UserPolicy]   |
   |                └── [Groups] SG_KeToan_Staff       |      (Map ổ Z: + Khóa Control Panel) |
   |                             SG_KeToan_Manager     |                                      |
   |---------------------------------------------------|                                      |
   | [3] File Share: C:\\Shares\\KeToan (\\\\DC01\\KeToan$) |                                      |
   |     • SMB Share : Authenticated Users = Change    |                                      |
   |     • NTFS Cha  : Staff (Modify), Manager (Modify)|                                      |
   |     • NTFS Con  : \\BaoCaoMat (Tắt kế thừa ->      |                                      |
   |                   Chỉ Manager có quyền Modify!)   |                                      |
   +---------------------------------------------------+                                      |
                                                                                              |
   +---------------------------------------------------+                                      |
   | MÁY TRẠM: PC01.corp.local (Windows 10 / 11 Pro)   | <====================================+
   | IP: 192.168.10.101/24 | Preferred DNS: 192.168.10.10
   | Đăng nhập: CORP\\lan.nt -> Tự nhận ổ Z:, bị khóa USB, khóa Control Panel & chặn BaoCaoMat!
   +---------------------------------------------------+`,
      keyTakeaways: [
        "Luôn đặt IP tĩnh và trỏ đúng DNS trước khi nâng cấp DC cũng như trước khi Join máy trạm vào Domain.",
        "Ngay sau khi Join máy trạm vào Domain, phải di chuyển (Move) Computer Account từ `CN=Computers` về đúng `OU=Computers` thì các GPO nhánh Computer mới có hiệu lực.",
        "Thiết kế File Server chuẩn: Mở `Authenticated Users = Change` ở cổng SMB Share, kiểm soát chi tiết bằng Security Group ở lớp NTFS và dùng `Disable Inheritance` cho các thư mục con nhạy cảm.",
        "Luôn hoàn tất công việc bằng bước Nghiệm thu (`nslookup`, `klist`, `gpresult /r`, kiểm tra truy cập thực tế và xem Event Viewer)."
      ]
    },
    level3_practice: {
      scenario: "Dưới đây là toàn bộ kịch bản thực hành từng bước (Step-by-Step Runbook) để cậu dựng hoàn chỉnh phòng Lab Tuần 2 trên 2 máy ảo `DC01` và `PC01`. Cậu có thể làm bằng giao diện đồ họa (GUI) kết hợp chạy các khối lệnh PowerShell bên dưới để hoàn thành cực nhanh và chuẩn xác!",
      steps: [
        {
          title: "Bước 1 (Trên DC01): Đặt IP tĩnh, cài đặt AD DS và nâng cấp lên Domain Controller `corp.local`",
          instruction: "Trên máy ảo Windows Server (`DC01`), mở PowerShell với quyền Administrator để đặt IP tĩnh `192.168.10.10`, đổi tên máy thành `DC01`, sau đó cài đặt Role AD DS và nâng cấp lên Domain Controller (hoặc thao tác qua `Server Manager -> Add Roles and Features -> Promote this server to a domain controller`).",
          commandOrConfig: `# 1. Đặt IP tĩnh 192.168.10.10/24 và đổi tên máy thành DC01 (chạy trước khi nâng cấp DC):
PS C:\\> New-NetIPAddress -InterfaceAlias "Ethernet0" -IPAddress 192.168.10.10 -PrefixLength 24
PS C:\\> Set-DnsClientServerAddress -InterfaceAlias "Ethernet0" -ServerAddresses 192.168.10.10
PS C:\\> Rename-Computer -NewName "DC01" -Restart

# 2. Sau khi máy khởi động lại, cài đặt Role AD DS kèm bộ công cụ quản trị (GUI + PowerShell):
PS C:\\> Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# 3. Nâng cấp máy chủ thành Domain Controller đầu tiên của Forest 'corp.local' (tự động cài DNS):
PS C:\\> Install-ADDSForest -DomainName "corp.local" -DomainNetbiosName "CORP" -InstallDns:$true -Force`,
          explanation: "Khi chạy lệnh `Install-ADDSForest`, hệ thống sẽ hỏi cậu nhập mật khẩu `SafeModeAdministratorPassword` (đây chính là mật khẩu DSRM dùng để cứu hộ AD khi khởi động vào chế độ Directory Services Restore Mode). Sau khi chạy xong, máy chủ sẽ tự khởi động lại và chính thức trở thành `DC01.corp.local`."
        },
        {
          title: "Bước 2 (Trên DC01): Xây dựng cấu trúc OU, tạo Users (`lan.nt`, `hoa.tt`) và Security Groups",
          instruction: "Sau khi đăng nhập vào `CORP\\Administrator` trên `DC01`, hãy chạy đoạn script PowerShell dưới đây (hoặc tạo trong `Active Directory Users and Computers - dsa.msc`) để dựng toàn bộ cây OU, tài khoản nhân viên và nhóm bảo mật cho Phòng Kế Toán.",
          commandOrConfig: `# 1. Tạo cây OU chuẩn: _CORP -> PhongKeToan -> (Users & Computers)
PS C:\\> New-ADOrganizationalUnit -Name "_CORP" -Path "DC=corp,DC=local"
PS C:\\> New-ADOrganizationalUnit -Name "PhongKeToan" -Path "OU=_CORP,DC=corp,DC=local"
PS C:\\> New-ADOrganizationalUnit -Name "Users" -Path "OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"
PS C:\\> New-ADOrganizationalUnit -Name "Computers" -Path "OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"

# 2. Tạo 2 Security Group cho Nhân viên Kế toán và Trưởng phòng Kế toán:
PS C:\\> $ouKT = "OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"
PS C:\\> New-ADGroup -Name "SG_KeToan_Staff" -GroupScope Global -GroupCategory Security -Path $ouKT
PS C:\\> New-ADGroup -Name "SG_KeToan_Manager" -GroupScope Global -GroupCategory Security -Path $ouKT

# 3. Tạo 2 tài khoản User (lan.nt và hoa.tt) với mật khẩu "Password@123" và đưa vào Group:
PS C:\\> $pass = ConvertTo-SecureString "Password@123" -AsPlainText -Force
PS C:\\> $ouUsers = "OU=Users,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"
PS C:\\> New-ADUser -Name "Nguyen Thi Lan" -SamAccountName "lan.nt" -UserPrincipalName "lan.nt@corp.local" -Path $ouUsers -AccountPassword $pass -Enabled $true
PS C:\\> New-ADUser -Name "Tran Thi Hoa" -SamAccountName "hoa.tt" -UserPrincipalName "hoa.tt@corp.local" -Path $ouUsers -AccountPassword $pass -Enabled $true

PS C:\\> Add-ADGroupMember -Identity "SG_KeToan_Staff" -Members "lan.nt"
PS C:\\> Add-ADGroupMember -Identity "SG_KeToan_Manager" -Members "hoa.tt"`,
          explanation: "Mở công cụ `Active Directory Users and Computers (dsa.msc)` và bấm F5 (Refresh), cậu sẽ thấy toàn bộ cây thư mục `_CORP -> PhongKeToan` cùng 2 nhân viên và 2 nhóm bảo mật đã hiện ra cực kỳ ngăn nắp!"
        },
        {
          title: "Bước 3 (Trên DC01): Tạo thư mục chia sẻ `KeToan$` và phân quyền SMB Share + NTFS",
          instruction: "Tiếp tục trên `DC01`, tạo thư mục `C:\\Shares\\KeToan` và thư mục con `BaoCaoMat`, bật chia sẻ SMB và phân quyền NTFS đúng chuẩn thiết kế.",
          commandOrConfig: `# 1. Tạo cấu trúc thư mục và file mẫu trên ổ cứng:
PS C:\\> New-Item -Path "C:\\Shares\\KeToan\\BaoCaoMat" -ItemType Directory -Force
PS C:\\> Set-Content -Path "C:\\Shares\\KeToan\\QuyDinhChung.txt" -Value "Tai lieu chung cua Phong Ke Toan"
PS C:\\> Set-Content -Path "C:\\Shares\\KeToan\\BaoCaoMat\\LuongGiamDoc.txt" -Value "Du lieu bi mat chi danh cho Ke Toan Truong"

# 2. Tạo SMB Share ẩn 'KeToan$' (Authenticated Users = Change, Domain Admins = Full Control):
PS C:\\> New-SmbShare -Name "KeToan$" -Path "C:\\Shares\\KeToan" -FullAccess "CORP\\Domain Admins" -ChangeAccess "Authenticated Users"

# 3. Cấp quyền NTFS Modify (M) trên thư mục cha cho cả Staff và Manager:
PS C:\\> icacls "C:\\Shares\\KeToan" /grant "CORP\\SG_KeToan_Staff:(OI)(CI)M" "CORP\\SG_KeToan_Manager:(OI)(CI)M"

# 4. Tắt kế thừa trên thư mục con 'BaoCaoMat' và gỡ quyền của nhóm Staff + Users thường:
PS C:\\> icacls "C:\\Shares\\KeToan\\BaoCaoMat" /inheritance:d
PS C:\\> icacls "C:\\Shares\\KeToan\\BaoCaoMat" /remove:g "CORP\\SG_KeToan_Staff" "BUILTIN\\Users"`,
          explanation: "Sau khi chạy xong bước này, cậu có thể mở `C:\\Shares\\KeToan` và `C:\\Shares\\KeToan\\BaoCaoMat` -> chuột phải chọn `Properties -> Security` để quan sát trực quan cách các dòng quyền đã được áp dụng và cách kế thừa đã bị ngắt ở thư mục con."
        },
        {
          title: "Bước 4 (Trên PC01 & DC01): Join `PC01` vào Domain, Move vào OU, áp GPO và Nghiệm thu!",
          instruction: "Sang máy trạm `PC01`: Đặt IP `192.168.10.101/24`, DNS `192.168.10.10`, kiểm tra bản ghi SRV rồi Join Domain. Sau đó trên `DC01`: Move `PC01` vào `OU=Computers`, tạo 2 GPO (`GPO_Block_USB` gắn vào `OU=Computers` và `GPO_KeToan_UserPolicy` gắn vào `OU=Users` theo đúng hướng dẫn ở Bài 10). Cuối cùng đăng nhập `corp\\lan.nt` trên `PC01` để nghiệm thu toàn bộ!",
          commandOrConfig: `# [TRÊN PC01] — Kiểm tra DNS SRV và Join vào Domain corp.local:
PS C:\\> nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local
PS C:\\> Add-Computer -DomainName "corp.local" -Credential "corp\\Administrator" -Restart

# [TRÊN DC01] — Di chuyển PC01 từ CN=Computers vào đúng OU=Computers của Phòng Kế Toán:
PS C:\\> Get-ADComputer "PC01" | Move-ADObject -TargetPath "OU=Computers,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local"

# [TRÊN PC01] — Đăng nhập bằng tài khoản CORP\\lan.nt (Password@123) và chạy nghiệm thu:
C:\\Users\\lan.nt> gpupdate /force
C:\\Users\\lan.nt> gpresult /r
C:\\Users\\lan.nt> klist
C:\\Users\\lan.nt> net use
New connections will be remembered.
Status       Local     Remote                    Network
-------------------------------------------------------------------------------
OK           Z:        \\\\dc01.corp.local\\KeToan$ Microsoft Windows Network`,
          explanation: "Chúc mừng cậu! Khi lệnh `net use` hiện ổ đĩa `Z:`, `gpresult /r` hiện đủ cả `GPO_Block_USB` lẫn `GPO_KeToan_UserPolicy`, `lan.nt` tạo được file mới trong ổ `Z:` nhưng bấm vào `Z:\\BaoCaoMat` bị báo *Access is denied* và bấm mở *Control Panel* bị báo khóa bởi Administrator — tức là cậu đã làm chủ hoàn toàn kiến thức Tuần 2!"
        }
      ],
      troubleshootingChecklist: [
        {
          symptom: "Trong lúc chạy lệnh `Add-Computer -DomainName corp.local` trên máy `PC01`, hệ thống báo lỗi không tìm thấy Domain `corp.local` mặc dù trên `DC01` đã nâng cấp Domain Controller xong",
          hypothesis: "Hai máy ảo `DC01` và `PC01` đang đặt ở 2 chế độ card mạng ảo khác nhau (ví dụ 1 máy để NAT, 1 máy để Host-Only), hoặc trên `PC01` chưa trỏ Preferred DNS về `192.168.10.10`, hoặc Firewall trên `DC01` đang chặn kết nối.",
          testCommand: "ping 192.168.10.10 && nslookup -type=srv _ldap._tcp.dc._msdcs.corp.local 192.168.10.10",
          fix: "Đảm bảo cả 2 máy ảo `DC01` và `PC01` nằm trong cùng một `LAN Segment` hoặc `Host-Only` network trên VMware/Hyper-V, ping thông IP `192.168.10.10` và chỉnh Preferred DNS của `PC01` về duy nhất địa chỉ `192.168.10.10`."
        },
        {
          symptom: "Sau khi đăng nhập `corp\\lan.nt` trên `PC01` và chạy `gpupdate /force`, phần `USER SETTINGS` trong `gpresult /r` đã nhận `GPO_KeToan_UserPolicy`, nhưng phần `COMPUTER SETTINGS` vẫn chưa nhận `GPO_Block_USB`",
          hypothesis: "Quên thực hiện bước di chuyển (Move) tài khoản máy tính `PC01` từ Container `CN=Computers` mặc định sang `OU=Computers,OU=PhongKeToan,OU=_CORP,DC=corp,DC=local`.",
          testCommand: "gpresult /r (nhìn dòng CN=PC01,... dưới mục COMPUTER SETTINGS xem đang ở CN=Computers hay OU=Computers)",
          fix: "Lên máy chủ `DC01`, mở ADUC (`dsa.msc`) -> vào mục `Computers` -> kéo thả `PC01` vào `OU=Computers` dưới `PhongKeToan`, sau đó quay lại `PC01` chạy `gpupdate /force`."
        },
        {
          symptom: "Đã cấu hình GPO Map Network Drive ổ `Z:` trỏ vào `\\\\dc01.corp.local\\KeToan$` nhưng khi `lan.nt` đăng nhập vào `PC01` vẫn không thấy ổ đĩa `Z:` xuất hiện trong This PC",
          hypothesis: "Đường dẫn Location trong cấu hình Drive Maps bị gõ thừa dấu gạch chéo ở cuối (ví dụ `\\\\dc01.corp.local\\KeToan$\\` thay vì `\\\\dc01.corp.local\\KeToan$`), hoặc chưa chọn chữ cái ổ đĩa (Drive Letter), hoặc cần đăng xuất rồi đăng nhập lại.",
          testCommand: "Thử mở trực tiếp đường dẫn `\\\\dc01.corp.local\\KeToan$` từ hộp thoại Run (`Win + R`) trên `PC01` xem có truy cập được không; và xem mục Group Policy Drive Maps trong file báo cáo `gpresult /h C:\\report.html`.",
          fix: "Sửa lại chính xác đường dẫn Location trong GPO là `\\\\dc01.corp.local\\KeToan$` (không có dấu `\\` ở cuối), đặt Action là `Update`, chọn Drive Letter `Z:`, sau đó trên `PC01` chạy `gpupdate /force`, đăng xuất (Sign out) và đăng nhập lại."
        }
      ]
    },
    level4_interview: {
      trapQuestions: [
        {
          question: "Câu hỏi tổng hợp thiết kế hệ thống: Công ty mới mở chi nhánh có 80 nhân viên chia làm 4 phòng ban (Kế toán, Nhân sự, Kinh doanh, Kỹ thuật). Nếu giao cho em triển khai hệ thống Windows Server từ đầu để quản lý tài khoản, chia sẻ dữ liệu nội bộ và áp chính sách bảo mật (chặn USB, cài đặt màn hình nền, gắn ổ đĩa mạng tự động), em sẽ thiết kế kiến trúc hệ thống gồm những thành phần gì và theo nguyên tắc nào?",
          wrongAnswer: "Em sẽ cài 1 máy Windows Server làm Domain Controller, tạo 4 cái OU cho 4 phòng ban rồi cho nhân viên vào đó, sau đó tạo 4 thư mục chia sẻ cấp quyền cho 4 OU đó và tạo 1 GPO chung áp cho cả công ty.",
          rightAnswer: "Để hệ thống vừa đảm bảo tính sẵn sàng cao (High Availability), vừa chuẩn mực bảo mật và dễ mở rộng, em sẽ thiết kế theo 5 trụ cột sau:\n1. **Hạ tầng Domain Controller & DNS**: Dựng tối thiểu **02 máy chủ Domain Controller** (`DC01` và `DC02`) chạy dịch vụ **AD DS** và **AD-Integrated DNS** đồng bộ với nhau để dự phòng HA. Toàn bộ máy trạm nhận IP qua DHCP và chỉ trỏ DNS về IP của `DC01`, `DC02`; còn trên DNS Server của DC cấu hình **DNS Forwarders** ra Internet.\n2. **Quy hoạch cấu trúc OU (Phục vụ GPO & Delegation)**: Tạo một OU gốc của chi nhánh (ví dụ `OU=_BranchHQ`), bên dưới tạo 4 OU cho 4 phòng ban. Trong mỗi phòng ban đều tách rõ 2 OU con là **`OU=Users`** (chứa tài khoản nhân viên) và **`OU=Computers`** (chứa tài khoản máy tính bàn/laptop của phòng đó).\n3. **Quy hoạch Security Group theo chuẩn AGDLP (Phục vụ Phân quyền)**: Tuyệt đối không dùng OU để phân quyền. Em tạo các **Security Group** theo từng phòng ban và cấp bậc (ví dụ `SG_KeToan_Staff`, `SG_KeToan_Manager`) để quản lý quyền truy cập.\n4. **Thiết kế File Server 2 lớp (SMB Share + NTFS)**: Tại lớp SMB Share, cấp quyền `Authenticated Users = Change` và `Domain Admins = Full Control`. Tại lớp NTFS, phân quyền chi tiết theo từng Security Group với mức tối đa là **`Modify`** cho nhân viên (không cấp `Full Control`). Với các thư mục con nhạy cảm của cấp quản lý, sử dụng **Disable Inheritance (Convert)** và gỡ bỏ nhóm nhân viên thường thay vì dùng quyền `Deny`.\n5. **Triển khai Group Policy (GPO)**: Tách biệt rõ các GPO theo chức năng: Các chính sách gắn với máy tính như **Chặn USB, bật Firewall** cấu hình ở `Computer Configuration` và Link vào các **`OU=Computers`**; còn các chính sách gắn với người dùng như **Map Network Drive, đặt Wallpaper** cấu hình ở `User Configuration` và Link vào các **`OU=Users`**.",
          keyPoints: [
            "Nêu đủ 5 trụ cột: 2 DC + AD DNS (HA), Cấu trúc OU tách Users/Computers, Security Group chuẩn AGDLP, File Server (Share mở + NTFS chặt ở mức Modify), và GPO gắn đúng OU",
            "Tránh mọi lỗi cơ bản: Không dùng 1 DC đơn độc, không trỏ DNS 8.8.8.8 trên client, không dùng OU để phân quyền, không Link nhầm GPO Computer vào OU User"
          ]
        },
        {
          question: "Trong quá trình vận hành hệ thống mà em vừa dựng, nếu một nhân viên phòng Kinh doanh được điều chuyển sang làm việc tại phòng Kế toán (ngồi luôn vào chiếc máy tính bàn bên phòng Kế toán), người quản trị hệ thống cần thực hiện những thao tác gì trên Active Directory để nhân viên đó nhận đầy đủ quyền truy cập File Server và GPO mới của phòng Kế toán?",
          wrongAnswer: "Em sẽ xóa tài khoản cũ của nhân viên đó đi và tạo lại một tài khoản mới trong phòng Kế toán.",
          rightAnswer: "Tuyệt đối không xóa tài khoản cũ để giữ nguyên lịch sử dữ liệu và SID cá nhân của nhân viên. Em chỉ cần thực hiện 3 thao tác chuẩn trên Active Directory:\n1. **Cập nhật Security Group (Để đổi quyền File Server)**: Gỡ tài khoản của nhân viên đó khỏi Security Group `SG_KinhDoanh_Staff` và thêm vào Security Group `SG_KeToan_Staff`.\n2. **Di chuyển OU (Để đổi chính sách GPO User)**: Trong công cụ ADUC, thực hiện **Move** đối tượng User Account của nhân viên đó từ `OU=Users` của phòng Kinh doanh sang `OU=Users` của phòng Kế toán (còn chiếc máy tính bàn bên phòng Kế toán vốn dĩ đã nằm sẵn trong `OU=Computers` của phòng Kế toán nên đã nhận sẵn GPO máy tính của phòng Kế toán).\n3. **Làm mới phiên đăng nhập**: Yêu cầu nhân viên **Sign out (Logoff) và Sign in (Logon) lại** trên máy tính mới để hệ thống cấp lại **Access Token** mới (nhận quyền File Server Kế toán) và thực thi lại tiến trình **User Logon GPO** (tự động Map ổ đĩa mạng Kế toán).",
          keyPoints: [
            "Không xóa tạo lại User: Giữ nguyên tài khoản để bảo toàn SID và hồ sơ dữ liệu",
            "Thao tác 1: Đổi thành viên Security Group (Gỡ Group Kinh doanh -> Thêm vào Group Kế toán) để đổi quyền NTFS/Share",
            "Thao tác 2 & 3: Move User Account sang OU Kế toán để nhận GPO mới, và yêu cầu User Logoff/Logon lại để làm mới Access Token"
          ]
        },
        {
          question: "Giả sử trên máy chủ Domain Controller kiêm File Server của phòng Lab, em muốn cho phép nhóm nhân viên Kỹ thuật (`SG_IT_Helpdesk`) có quyền Reset mật khẩu và Unlock tài khoản cho nhân viên thuộc `OU=PhongKeToan`, nhưng tuyệt đối KHÔNG được phép đụng vào tài khoản thuộc `OU=BanGiamDoc` và không được cấp quyền Domain Admins. Em dùng tính năng gì của Active Directory để làm việc đó?",
          wrongAnswer: "Em tạo một GPO cấp quyền reset mật khẩu rồi gắn vào OU Phòng Kế Toán.",
          rightAnswer: "Để trao quyền quản trị một phần cây thư mục AD cho nhóm IT Helpdesk mà không cần đưa họ vào nhóm `Domain Admins`, ta không dùng GPO mà sử dụng tính năng **Delegation of Control (Ủy quyền quản trị)** trực tiếp trên **OU**! Cụ thể: Trong công cụ `Active Directory Users and Computers (dsa.msc)`, em chuột phải vào **`OU=PhongKeToan` -> chọn `Delegate Control...`** -> chọn nhóm bảo mật **`SG_IT_Helpdesk`** -> trong danh sách tác vụ ủy quyền, tích chọn ***'Reset user passwords and force password change at next logon'*** (và quyền đọc/ghi thuộc tính `lockoutTime` để Unlock tài khoản). Nhờ cơ chế phân quyền trên đối tượng AD theo phạm vi OU này, nhóm `SG_IT_Helpdesk` chỉ có thể reset mật khẩu và mở khóa cho các User nằm bên trong `OU=PhongKeToan`, còn khi bấm vào `OU=BanGiamDoc` thì hoàn toàn không có quyền!",
          keyPoints: [
            "Nêu đúng tên công cụ: **Delegation of Control Wizard (`Delegate Control...`)** trên OU trong ADUC",
            "Nhắc lại đúng vai trò thứ 2 của OU: Ngoài việc gắn GPO, OU chính là ranh giới để Ủy quyền quản trị (Delegation)",
            "Đảm bảo nguyên tắc Least Privilege (Quyền tối thiểu): Cấp quyền qua Security Group `SG_IT_Helpdesk` chỉ trong phạm vi `OU=PhongKeToan`, không cấp `Domain Admins`"
          ]
        }
      ],
      quizzes: [
        {
          question: "Trong bài Lab triển khai hạ tầng Active Directory hoàn chỉnh, thứ tự thực hiện nào dưới đây là ĐÚNG chuẩn kỹ thuật từ đầu đến cuối?",
          options: [
            "Join máy trạm vào Domain -> Đặt IP tĩnh cho Server -> Nâng cấp Domain Controller -> Cấu hình DNS",
            "Đặt IP tĩnh & đổi Hostname cho Server -> Cài đặt AD DS & Nâng cấp lên Domain Controller (kèm AD DNS) -> Tạo cấu trúc OU, Users, Security Groups -> Trỏ DNS máy trạm về IP của DC, Join Domain và Move máy trạm vào OU -> Cấu hình File Share/NTFS và Link GPO",
            "Tạo GPO trước -> Gắn GPO vào Container Computers mặc định -> Phân quyền Folder cho OU -> Nâng cấp Domain Controller",
            "Trỏ DNS máy trạm ra 8.8.8.8 -> Join máy trạm vào Domain -> Tạo Security Group để gắn GPO trực tiếp vào Group"
          ],
          correctIndex: 1,
          explanation: "Quy trình chuẩn bắt buộc phải đi từ nền móng: (1) Chuẩn hóa IP tĩnh và tên máy chủ -> (2) Dựng Domain Controller + AD DNS -> (3) Xây dựng cây OU, Users, Groups -> (4) Trỏ DNS máy trạm về DC, Join Domain và Move Computer về đúng OU -> (5) Phân quyền File Server theo Security Group và Link GPO vào đúng OU."
        },
        {
          question: "Tại sao trong bài Lab, khi tạo chia sẻ SMB có tên là `KeToan$` (có dấu `$` ở cuối tên Share), người dùng bình thường khi gõ `\\\\dc01.corp.local` vào File Explorer lại không nhìn thấy thư mục `KeToan$` hiển thị ra?",
          options: [
            "Vì dấu `$` làm hỏng dịch vụ LanmanServer trên Windows Server",
            "Vì trong Windows SMB, bất kỳ tên Share nào kết thúc bằng ký tự `$` đều trở thành Hidden Share (Thư mục chia sẻ ẩn), giúp ẩn thư mục khỏi danh sách duyệt mạng thông thường nhưng vẫn cho phép truy cập trực tiếp hoặc Map ổ đĩa qua GPO",
            "Vì chỉ có hệ điều hành Linux mới đọc được các thư mục có dấu `$`",
            "Vì dấu `$` tự động mã hóa toàn bộ file bên trong bằng BitLocker"
          ],
          correctIndex: 1,
          explanation: "Đặt dấu `$` ở cuối tên SMB Share (ví dụ `KeToan$`, tương tự như các share mặc định `C$`, `ADMIN$`, `IPC$`) sẽ biến thư mục chia sẻ đó thành **Hidden Share (Chia sẻ ẩn)**. Khi người dùng gõ `\\\\Server` sẽ không thấy nó liệt kê ra, giúp hạn chế sự tò mò của những người không có phận sự, trong khi nhân viên phòng Kế toán vẫn được GPO tự động Map ổ đĩa `Z:` vào thẳng `\\\\dc01.corp.local\\KeToan$`."
        },
        {
          question: "Sau khi hoàn tất toàn bộ bài Lab, nhân viên `lan.nt` (thuộc `SG_KeToan_Staff`, KHÔNG thuộc `SG_KeToan_Manager`) đăng nhập vào máy `PC01`. Kết quả nào dưới đây chứng tỏ hệ thống đã hoạt động ĐÚNG 100% theo thiết kế?",
          options: [
            "lan.nt không thấy ổ đĩa Z:, cắm USB dùng bình thường và mở được thư mục Z:\\BaoCaoMat",
            "lan.nt tự động có ổ đĩa mạng Z:, tạo/sửa file trong Z:\\ bình thường, nhưng bị chặn khi mở Z:\\BaoCaoMat, bị chặn khi cắm USB lưu trữ và bị khóa không mở được Control Panel",
            "lan.nt có quyền Full Control trên cả ổ Z:\\ lẫn thư mục Z:\\BaoCaoMat và tự sửa được bảng phân quyền NTFS",
            "lan.nt phải trỏ DNS về 8.8.8.8 thì mới nhìn thấy ổ đĩa mạng Z:"
          ],
          correctIndex: 1,
          explanation: "Thiết kế của bài Lab bao gồm: (1) `GPO_KeToan_UserPolicy` tự động Map ổ đĩa `Z:` và khóa Control Panel cho `lan.nt`; (2) `GPO_Block_USB` chặn cắm USB trên máy `PC01`; (3) Quyền Share (`Change`) + NTFS (`Modify`) cho phép `lan.nt` tạo/sửa file trong `Z:\\`; và (4) Việc tắt kế thừa + gỡ nhóm `SG_KeToan_Staff` trên thư mục con `Z:\\BaoCaoMat` chặn đứng `lan.nt` không cho phép mở thư mục mật của Kế toán trưởng."
        }
      ]
    }
  }
];
