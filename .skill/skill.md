# Antigravity Skill Rules: Weather & Travel Itinerary Application

## 1. QUY TẮC VẬN HÀNH BẮT BUỘC (CORE WORKFLOW RULES)

1. **Lập kế hoạch trước khi viết code (Plan First)**:
   - Trước khi tạo mới hoặc thay đổi bất kỳ dòng code nào, BẮT BUỘC phải trình bày **Kế hoạch triển khai (Implementation Plan)** chi tiết bao gồm: các file ảnh hưởng, danh sách hàm/logic sẽ thêm/sửa, và luồng dữ liệu.

2. **Cung cấp lựa chọn trước khi thay đổi (Options Before Changes)**:
   - Khi có nhiều phương án xử lý (giao diện, cấu trúc dữ liệu, thuật toán), BẮT BUỘC phải đưa ra **tối thiểu 2 - 3 lựa chọn** đi kèm ưu/nhược điểm và chờ người dùng xác nhận mới tiến hành viết code.

3. **Công nghệ & Cấu trúc dự án (Tech Stack & Project Structure)**:
   - **Công nghệ**: Chỉ sử dụng thuần HTML5, CSS3, JavaScript (Vanilla JS ES6+). Không sử dụng thư viện/framework ngoài (như React, Vue, jQuery, Tailwind, Bootstrap...).
   - **Cấu trúc thư mục**: Tuân thủ nghiêm ngặt các thư mục đã tạo:
     ├── css/          # Tất cả file .css (style.css, glass.css,...)
     ├── js/           # Tất cả file .js (app.js, weather.js, itinerary.js, storage.js)
     ├── image/        # Hình ảnh nền, icon, assets hình ảnh
     └── video/        # Video truyền thông hoặc background video
     |__ Page/         # Dùng để chứa các trang khác 

---

## 2. QUY CHUẨN THIẾT KẾ VÀ DỰ ÁN

### A. Phong cách giao diện (Glassmorphism & Responsive)
- **Glassmorphism**: 
  - Sử dụng `backdrop-filter: blur(12px - 16px)`
  - Màu nền mờ: `background: rgba(255, 255, 255, 0.15)` đến `rgba(255, 255, 255, 0.25)`
  - Viền mờ tinh tế: `border: 1px solid rgba(255, 255, 255, 0.3)`
  - Đổ bóng nhẹ: `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2)`
- **Hình nền**: Background thiên nhiên/du lịch chất lượng cao, độ tương phản tốt với các khung kính.
- **Bố cục (Layout)**:
  - **Desktop**: Chia 2 cột (Trái: Weather Module, Phải: Itinerary Module).
  - **Mobile**: Xếp chồng dọc (Single column layout).
- **Tương tác**: Hiệu ứng chuyển động mượt cho nút bấm (`:hover`, `:active`) và hiệu ứng CSS Animation/Transition khi thêm/xóa thẻ.

### B. Quy chuẩn Danh sách (List Specification - Bắt buộc cho mọi danh sách)
Tất cả các danh sách dữ liệu (ví dụ: Danh sách lịch trình) phải bao gồm đủ 4 tính năng:
1. **Tìm kiếm (Search)**: Lọc thời gian thực theo tiêu đề/tên địa điểm.
2. **Lọc (Filter)**: Lọc theo trạng thái (Tất cả / Đã đến / Chưa đến).
3. **Sắp xếp (Sort)**: Theo tiêu đề (A-Z, Z-A) hoặc thời gian ghé thăm.
4. **Phân trang (Pagination)**: Chọn số lượng hiển thị (10, 20, 50, Tất cả) kèm các nút chuyển trang (`Previous`, `Next`, số trang).

---

## 3. CHỨC NĂNG CHI TIẾT ỨNG DỤNG

### Module Thời tiết (Weather Module)
- **Dữ liệu mẫu**: Mảng chứa tối thiểu 3 thành phố (Biên Hòa, Đà Lạt, Vũng Tàu...) với các thuộc tính: `tên`, `nhiệt độ`, `độ ẩm`, `tình trạng` (Nắng/Mưa/Mây).
- Thẻ `<select>` chọn thành phố, cập nhật tức thì (SPA - không reload trang).
- Thay đổi theme màu chủ đạo và icon linh hoạt theo tình trạng thời tiết:
  - **Nắng**: Tông vàng/cam ấm áp.
  - **Mưa**: Tông xanh dương/xám dịu mát.
  - **Mây**: Tông xanh nhạt/trắng trung tính.

### Module Lịch trình (Itinerary Module)
- Form nhập gồm: `Tên địa điểm` và `Thời gian ghé thăm`.
- Thao tác:
  - **Đánh dấu đã đến**: Chuyển trạng thái, gạch ngang chữ hoặc đổi màu nhãn.
  - **Xóa**: Xóa phần tử khỏi danh sách.
  - **Hiệu ứng**: CSS transition/animation mượt mà khi thêm mới hoặc xóa phần tử.

### Lưu trữ dữ liệu (Data Persistence)
- Sử dụng `localStorage` lưu danh sách địa điểm và thành phố đang chọn.
- Khôi phục chính xác trạng thái gần nhất khi bật lại trình duyệt.