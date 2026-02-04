# HƯỚNG DẪN RESPONSIVE DESIGN - TOXI PROJECT

## Tổng quan

Dự án TOXI đã được cập nhật để hỗ trợ responsive design đầy đủ cho cả desktop (máy tính) và mobile (điện thoại).

## Breakpoints Tailwind CSS được sử dụng

- **sm** (640px): Điện thoại nhỏ
- **md** (768px): Tablet
- **lg** (1024px): Desktop nhỏ
- **xl** (1280px): Desktop lớn

## Các trang đã được cập nhật

### 1. Home Page (HomePage)
- ✅ **HERO SECTION**: Responsive text sizes, flexible buttons
- ✅ **CORE VALUE SECTION**: Grid layout thích nghi (1 cột mobile, 2 cột desktop)
- ✅ **COURSES & PRODUCTS - TWO COLUMNS**: 
  - Mobile: Stack vertically (1 cột)
  - Tablet: 2 cột
  - Desktop: 2 cột side-by-side
  - Courses trái, Products phải
- ✅ **CONVERSATION SECTION**: 1 cột mobile, 2-3 cột desktop
- ✅ **WORKING PROFESSIONALS**: Flexible layout với images
- ✅ **HALL OF FAME & BLOG**: Responsive grid layoutcd

### 2. Global CSS (index.css)
- ✅ Responsive container padding
- ✅ Responsive typography
- ✅ Responsive grid utilities
- ✅ Form input styling
- ✅ Smooth scroll behavior
- ✅ Custom scrollbar
- ✅ Accessibility support

### 3. Responsive CSS File
- ✅ Created `src/styles/responsive.css`
- Utilities cho responsive design

## Quy tắc Responsive Design trong dự án

### 1. Mobile First Approach
Luôn viết CSS cho mobile trước, sau đó extend cho desktop.

```jsx
{/* Mobile size - default */}
<div className="text-sm md:text-base lg:text-lg">
  Content
</div>
```

### 2. Tailwind Classes Pattern

#### Text & Font Sizes
```jsx
<h1 className="text-xl md:text-2xl lg:text-3xl font-black">
  Heading
</h1>

<p className="text-xs md:text-sm lg:text-base">
  Paragraph
</p>
```

#### Padding & Spacing
```jsx
<section className="py-4 md:py-8 lg:py-12 px-4 md:px-6 lg:px-12">
  Content
</section>
```

#### Grid Layouts
```jsx
{/* Single column mobile, 2 columns tablet, 3 columns desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Items */}
</div>
```

#### Flexbox Responsive
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  {/* Stacks on mobile, side-by-side on desktop */}
</div>
```

#### Display & Visibility
```jsx
{/* Hidden on mobile, shown on desktop */}
<div className="hidden lg:block">Desktop only</div>

{/* Shown on mobile, hidden on desktop */}
<div className="lg:hidden">Mobile only</div>
```

### 3. Responsive Images

```jsx
{/* Aspect ratio responsive */}
<div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-lg overflow-hidden">
  <img src="..." className="w-full h-full object-cover" alt="" />
</div>
```

### 4. Responsive Buttons & CTAs

```jsx
<button className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg">
  Click me
</button>
```

## Cảnh báo cho nhà phát triển

Khi thêm tính năng mới hoặc chỉnh sửa các trang:

### ✅ DO:
- Sử dụng Tailwind responsive prefixes (sm:, md:, lg:)
- Test trên cả mobile (375px) và desktop (1920px)
- Sử dụng relative sizing (%, em, rem) thay vì fixed pixels
- Ưu tiên content readability trên mobile
- Sử dụng `max-w-7xl` cho containers lớn

### ❌ DON'T:
- Sử dụng fixed width/height (trừ khi cần thiết)
- Quên test responsive trên thiết bị thực
- Sử dụng overflow-x cho horizontal scroll trừ khi cần thiết
- Sử dụng font-size quá nhỏ trên mobile
- Quên cấp padding/margin cho safe-area trên notched devices

## CSS Classes có sẵn

### Responsive Utilities
```css
.grid-responsive /* Responsive grid 1-2-3 columns */
.flex-responsive /* Responsive flex direction */
.text-responsive /* Responsive text size */
.heading-responsive /* Responsive heading */
.btn-responsive /* Responsive button sizing */
.container /* Responsive container padding */
```

## Mobile Testing Checklist

- [ ] Text is readable (min 16px on mobile)
- [ ] Buttons are easily tappable (min 44x44px)
- [ ] Images scale properly
- [ ] No horizontal scroll unless necessary
- [ ] Touch targets have proper spacing
- [ ] Form inputs are properly sized
- [ ] Navigation is mobile-friendly
- [ ] Images have proper aspect ratios
- [ ] Colors have good contrast
- [ ] Layout doesn't break at intermediate sizes

## Kích thước thiết bị để test

- **Mobile**: 375px (iPhone SE)
- **Mobile**: 414px (iPhone 11)
- **Mobile**: 768px (iPad)
- **Tablet**: 1024px (iPad Pro)
- **Desktop**: 1280px (MacBook)
- **Desktop**: 1920px (Full HD)

## Performance Tips

1. **Optimize Images**: Sử dụng `next/image` hoặc `<img>` với `srcset`
2. **Lazy Loading**: Sử dụng `loading="lazy"` cho off-screen images
3. **Responsive Design**: Tránh over-styling với Tailwind
4. **Mobile First**: Viết CSS đơn giản cho mobile, extend cho desktop

## File cấu hình

- `tailwind.config.js`: Tailwind configuration
- `src/index.css`: Global responsive styles
- `src/styles/responsive.css`: Additional responsive utilities

## Ví dụ thực tế

### Responsive Card Component
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-lg transition-all">
    <div className="aspect-video md:aspect-square rounded-lg overflow-hidden mb-4">
      <img src="..." alt="" className="w-full h-full object-cover" />
    </div>
    <h3 className="text-base md:text-lg font-bold mb-2">Title</h3>
    <p className="text-xs md:text-sm text-gray-600 mb-4">Description</p>
    <button className="w-full px-4 py-2 md:py-3 bg-primary text-white rounded-lg text-sm md:text-base hover:bg-primary/90 transition-all">
      Action
    </button>
  </div>
</div>
```

## Nếu có vấn đề

1. Kiểm tra Tailwind classes có đúng không
2. Clear browser cache (Ctrl+Shift+Del)
3. Rebuild project: `npm run dev`
4. Kiểm tra DevTools responsive mode
5. Test trên nhiều thiết bị khác nhau

---

**Last Updated**: January 28, 2025
**Status**: ✅ Home Page & Global Styles - Complete
**Next Steps**: Update remaining pages (Blog, Cart, Checkout, etc.)
