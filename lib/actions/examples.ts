export async function getExamples() {
  return {
    // 编辑功能示例
    editExamples: [
      { title: '背景替换', before: '人像照片', after: '背景替换' },
      { title: '物体移除', before: '人像照片', after: '物体移除' },
      { title: '颜色调整', before: '人像照片', after: '颜色调整' },
      { title: '细节增强', before: '人像照片', after: '细节增强' },
    ],
    // 风格转换示例
    styleExamples: [
      { title: '水彩画', before: '人像照片', after: '水彩风格' },
      { title: '油画', before: '风景照片', after: '油画风格' },
      { title: '素描', before: '建筑照片', after: '素描风格' },
      { title: '动漫', before: '人物照片', after: '动漫风格' },
      { title: '吉卜力', before: '风景照片', after: '吉卜力风格' },
      { title: '赛博朋克', before: '城市照片', after: '赛博朋克风格' },
    ],
    // 头像风格示例
    avatarExamples: [
      { title: '商务正装', before: '人像照片', after: '商务正装' },
      { title: '休闲风格', before: '人像照片', after: '休闲风格' },
      { title: '创意风格', before: '人像照片', after: '创意风格' },
      { title: '学术风格', before: '人像照片', after: '学术风格' },
    ],
  };
}
