import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Spacing at the top container
content = content.replace(
    '<div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 w-full">',
    '<div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-4 w-full">'
)
content = content.replace(
    '<div className="w-full flex flex-col items-center gap-24 mt-8">',
    '<div className="w-full flex flex-col items-center gap-16 mt-2">'
)
content = content.replace(
    '<section className="w-full max-w-5xl flex flex-col justify-center items-center text-center gap-8 py-20 mt-10 relative">',
    '<section className="w-full max-w-5xl flex flex-col justify-center items-center text-center gap-8 pt-4 pb-12 mt-0 relative">'
)

# 2. Add IDs to sections
content = content.replace(
    '      {/* 4. Tính năng nổi bật */}\n      <section className="w-full max-w-7xl flex flex-col gap-10 py-10">',
    '      {/* 4. Tính năng nổi bật */}\n      <section id="features" className="w-full max-w-7xl flex flex-col gap-10 py-10">'
)

content = content.replace(
    '      {/* 5. Lộ trình theo mục tiêu */}\n      <section className="w-full max-w-7xl flex flex-col gap-10">',
    '      {/* 5. Lộ trình theo mục tiêu */}\n      <section id="paths" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">'
)

content = content.replace(
    '      {/* 7. Học viên nói gì (thay bằng dữ liệu thật khi có) */}\n      <section className="w-full max-w-7xl flex flex-col gap-10">',
    '      {/* 7. Học viên nói gì (thay bằng dữ liệu thật khi có) */}\n      <section id="testimonials" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">'
)

content = content.replace(
    '      {/* 8. Bảng giá */}\n      <section className="w-full max-w-7xl flex flex-col gap-10">',
    '      {/* 8. Bảng giá */}\n      <section id="plans" className="w-full max-w-7xl flex flex-col gap-10 scroll-m-24">'
)

with open("src/app/page.tsx", "w") as f:
    f.write(content)

