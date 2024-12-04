import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  PanResponder,
} from 'react-native';

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 500 });

  const faqs = [
    { question: 'Giao dịch lỗi...', answer: 'Vui lòng kiểm tra thông tin giao dịch.' },
    { question: 'Giao dịch thành công nhưng không nhận được...', answer: 'Liên hệ tổng đài hỗ trợ.' },
    { question: 'Lỗi nạp tiền từ nguồn liên kết...', answer: 'Kiểm tra thông tin tài khoản ngân hàng.' },
    { question: 'Làm thế nào để đăng ký data gói Không giới hạn?', answer: 'Có cái nịt ấy, có làm mới có ăn.' },
    { question: 'Làm sao để thay đổi mật khẩu tài khoản?', answer: 'Vào phần cài đặt tài khoản và chọn "Đổi mật khẩu".' },
    { question: 'Tại sao tôi không thể đăng nhập?', answer: 'Kiểm tra lại tên người dùng và mật khẩu, hoặc thử đặt lại mật khẩu.' },
    { question: 'Làm sao để kiểm tra dung lượng data còn lại?', answer: 'Vào phần "Data" trong ứng dụng để kiểm tra số dung lượng còn lại.' },
    { question: 'Gói cước 4G của tôi đã hết, tôi làm sao để nạp thêm?', answer: 'Bạn có thể nạp tiền qua các hình thức chuyển khoản ngân hàng hoặc thẻ cào.' },
    { question: 'Tôi có thể hủy gói cước đang sử dụng không?', answer: 'Có thể hủy gói cước qua ứng dụng hoặc gọi tổng đài để yêu cầu hủy.' },
    { question: 'Có thể chuyển tiền từ tài khoản này sang tài khoản khác không?', answer: 'Bạn có thể chuyển tiền bằng cách sử dụng dịch vụ chuyển tiền trực tuyến hoặc qua ngân hàng.' },
    { question: 'Tại sao tôi không thể thanh toán qua thẻ tín dụng?', answer: 'Có thể do lỗi hệ thống của ngân hàng hoặc thẻ tín dụng của bạn chưa được kích hoạt.' },
    { question: 'Tại sao dịch vụ của tôi không hoạt động sau khi nạp tiền?', answer: 'Vui lòng kiểm tra kết nối mạng và thử lại hoặc liên hệ với bộ phận hỗ trợ.' },
    { question: 'Tôi có thể mua thẻ điện thoại qua ứng dụng này không?', answer: 'Có, bạn có thể mua thẻ điện thoại trực tiếp trong ứng dụng.' },
    { question: 'Tôi có thể sử dụng nhiều gói cước cùng lúc không?', answer: 'Không, chỉ có thể sử dụng một gói cước tại một thời điểm.' },
    { question: 'Có cách nào nhận thông báo khi có khuyến mãi không?', answer: 'Bạn có thể bật thông báo trong phần cài đặt để nhận các thông tin khuyến mãi mới nhất.' },
    { question: 'Làm sao để xem lịch sử giao dịch?', answer: 'Vào mục "Lịch sử giao dịch" trong ứng dụng để xem chi tiết các giao dịch đã thực hiện.' },
    { question: 'Tại sao tôi không nhận được mã OTP để xác thực?', answer: 'Hãy chắc chắn rằng bạn đã nhập đúng số điện thoại và kiểm tra kết nối mạng.' },
    { question: 'Tôi có thể sử dụng mã giảm giá ở đâu?', answer: 'Mã giảm giá có thể được nhập tại phần thanh toán trong ứng dụng.' },
    { question: 'Làm sao để liên hệ với tổng đài hỗ trợ?', answer: 'Bạn có thể gọi số hotline hoặc gửi email cho bộ phận hỗ trợ khách hàng.' },
    { question: 'Ứng dụng này có hỗ trợ tiếng Anh không?', answer: 'Có, bạn có thể chuyển ngôn ngữ trong phần cài đặt.' },
    { question: 'Tại sao tôi không thể tải ứng dụng về máy?', answer: 'Hãy kiểm tra kết nối mạng hoặc thử tải lại từ App Store/Google Play.' },
    { question: 'Có chương trình khuyến mãi nào đang diễn ra không?', answer: 'Bạn có thể theo dõi các chương trình khuyến mãi trên trang chủ ứng dụng.' },
    { question: 'Làm sao để cập nhật ứng dụng?', answer: 'Bạn có thể cập nhật ứng dụng thông qua App Store hoặc Google Play.' },
    { question: 'Làm thế nào để hủy đăng ký nhận thông báo?', answer: 'Bạn có thể tắt thông báo trong phần cài đặt của ứng dụng.' },
    { question: 'Tôi có thể thanh toán bằng hình thức nào?', answer: 'Ứng dụng hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng và ví điện tử.' },
    { question: 'Tại sao tôi bị tính phí quá cao?', answer: 'Kiểm tra lại gói cước và các dịch vụ mà bạn đã đăng ký để đảm bảo không phát sinh phí ngoài ý muốn.' },
    { question: 'Gói cước của tôi có bao nhiêu data?', answer: 'Mỗi gói cước sẽ có dung lượng data khác nhau, bạn có thể xem chi tiết trong phần "Gói cước" của ứng dụng.' },
    { question: 'Làm sao để liên hệ với bộ phận hỗ trợ?', answer: 'Bạn có thể liên hệ với bộ phận hỗ trợ qua email, hotline hoặc trò chuyện trực tiếp trong ứng dụng.' },
    { question: 'Có thể hoàn tiền nếu tôi hủy gói cước không?', answer: 'Tùy thuộc vào chính sách của nhà cung cấp, bạn có thể yêu cầu hoàn tiền trong một số trường hợp nhất định.' },
    { question: 'Tại sao tôi không thể sử dụng dịch vụ sau khi thanh toán?', answer: 'Có thể do lỗi hệ thống, vui lòng liên hệ bộ phận hỗ trợ để được giải quyết.' },
    { question: 'Tôi có thể đổi tên người dùng không?', answer: 'Hiện tại, bạn không thể thay đổi tên người dùng sau khi đã đăng ký.' },
    { question: 'Làm thế nào để nhận hỗ trợ khẩn cấp?', answer: 'Liên hệ với tổng đài hoặc sử dụng tính năng hỗ trợ khẩn cấp trong ứng dụng.' },
    { question: 'Có thể lấy lại tài khoản đã bị khóa không?', answer: 'Bạn cần liên hệ với bộ phận hỗ trợ để yêu cầu mở khóa tài khoản.' },
    { question: 'Có hỗ trợ bảo mật 2 lớp không?', answer: 'Có, bạn có thể bật bảo mật 2 lớp trong phần cài đặt tài khoản.' }
];

const categories = [
  { name: 'Gói ưu đãi', icon: '✅' },
  { name: 'Đăng ký, định danh', icon: '📷' },
  { name: 'Nạp, rút tiền', icon: '💳' },
  { name: 'Liên hệ tổng đài', icon: '🖕' },
  { name: 'Khuyến mãi', icon: '🎉' },
  { name: 'Tài khoản của tôi', icon: '👤' },
  { name: 'Lịch sử giao dịch', icon: '📝' },
  { name: 'Cài đặt', icon: '⚙️' },
  { name: 'Mua thẻ điện thoại', icon: '📱' },
  { name: 'Gói cước 4G', icon: '📶' },
  { name: 'Hỗ trợ khách hàng', icon: '🧑‍💻' },
  { name: 'Quản lý thông báo', icon: '🔔' },
  { name: 'Xem sản phẩm', icon: '🛒' },
  { name: 'Chính sách bảo mật', icon: '🔒' },
  { name: 'Cập nhật ứng dụng', icon: '🔄' },
  { name: 'Đổi mật khẩu', icon: '🔑' },
  { name: 'Hỗ trợ thanh toán', icon: '💸' },
  { name: 'Lịch sử đơn hàng', icon: '📦' },
  { name: 'Tìm kiếm sản phẩm', icon: '🔍' },
  { name: 'Đánh giá dịch vụ', icon: '⭐' },
  { name: 'Giới thiệu bạn bè', icon: '👯‍♂️' },
  { name: 'Điều khoản sử dụng', icon: '📜' },
  { name: 'Gói dịch vụ gia đình', icon: '👨‍👩‍👧‍👦' },
  { name: 'Chính sách đổi trả', icon: '🔄' },
  { name: 'Gói cước sinh viên', icon: '🎓' },
  { name: 'Lịch sử khiếu nại', icon: '📑' },
  { name: 'Điều kiện và quy định', icon: '📋' },
  { name: 'Liên kết tài khoản', icon: '🔗' },
  { name: 'Đăng xuất', icon: '🚪' },
  { name: 'Hỗ trợ kỹ thuật', icon: '🛠️' },
  { name: 'Lịch sử đăng nhập', icon: '⌨️' }
];


  // Sử dụng useMemo để tối ưu hóa việc lọc các câu hỏi
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Cập nhật vị trí của ChatBot theo sự thay đổi của gestureState
      setPosition((prevPosition) => ({
        x: prevPosition.x + gestureState.dx, // Thêm sự thay đổi theo chiều x
        y: prevPosition.y + gestureState.dy, // Thêm sự thay đổi theo chiều y
      }));
    },
    onPanResponderRelease: (_, gestureState) => {
      // Khi kết thúc di chuyển, tiếp tục cập nhật vị trí
      setPosition((prevPosition) => ({
        x: prevPosition.x + gestureState.dx,
        y: prevPosition.y + gestureState.dy,
      }));
    },
  });

  return (
    <>
      {/* Hiển thị bong bóng ChatBot nếu trạng thái isChatVisible là true */}
      {isChatVisible && (
        <View
          style={[styles.chatBubble, { top: position.y, left: position.x }]} // Sử dụng position trong style
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={() => setIsChatOpen(true)}>
            <Text style={styles.chatBubbleText}>💬</Text>
          </TouchableOpacity>
          {/* Nút tắt bong bóng chat */}
          <TouchableOpacity
            style={styles.closeBubbleButton}
            onPress={() => setIsChatVisible(false)}
          >
            <Text style={styles.closeBubbleText}>✖</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Chat Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChatOpen}
        onRequestClose={() => {
          setIsChatOpen(false);
          setSelectedAnswer('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            <Text style={styles.headerText}>Trung tâm hỗ trợ</Text>

            {/* Banner */}
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                Bạn không thể thực hiện giao dịch online khi chưa hoàn thành cập nhật thông tin!
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Thực hiện ngay</Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Tìm kiếm các vấn đề của bạn"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* FAQ Section */}
            <ScrollView>
              <Text style={styles.sectionHeader}>Câu hỏi thường gặp</Text>
              {filteredFaqs.map((faq, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.faqItem}
                  onPress={() => setSelectedAnswer(faq.answer)}
                >
                  <Text style={styles.faqText}>{faq.question}</Text>
                </TouchableOpacity>
              ))}

              {/* Hiển thị câu trả lời */}
              {selectedAnswer && (
                <View style={styles.answerBox}>
                  <Text style={styles.answerText}>{selectedAnswer}</Text>
                </View>
              )}

              {/* Categories */}
              <Text style={styles.sectionHeader}>Trợ giúp theo chủ đề</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                  <View key={index} style={styles.category}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Nút đóng */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setIsChatOpen(false);
                setSelectedAnswer('');
              }}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same
  chatBubble: {
    position: 'absolute',
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatBubbleText: {
    color: 'white',
    fontSize: 24,
  },
  closeBubbleButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff4d4d',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  closeBubbleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 50,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  banner: {
    backgroundColor: '#ffe5e5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 14,
    color: '#d32f2f',
  },
  bannerButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
    alignItems: 'center',
  },
  bannerButtonText: {
    color: 'white',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  faqItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  faqText: {
    fontSize: 16,
  },
  answerBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#555',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ChatBot;
