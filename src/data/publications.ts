export type Publication = {
  title: string
  authors: string
  venue: string
  href: string
}

export const publications: Publication[] = [
  { title: "FLIQS: One-Shot Mixed-Precision Floating-Point and Integer Quantization Search", authors: "Jordan Dotzel, Gang Wu, Andrew Li, Muhammad Umar, Yun Ni, Mohamed S. Abdelfattah, Zhiru Zhang, Liqun Cheng, Martin G. Dixon, Norman P. Jouppi, Quoc V. Le, Sheng Li", venue: "AutoML 2024 · Best Paper", href: "https://arxiv.org/abs/2308.03290" },
  { title: "Learning from Students: Applying T-Distributions to Explore Accurate and Efficient Formats for LLMs", authors: "Jordan Dotzel, Yuzong Chen, Bahaa Kotb, Sushma Prasad, Gang Wu, Sheng Li, Mohamed S. Abdelfattah, Zhiru Zhang", venue: "ICML 2024", href: "https://arxiv.org/abs/2405.03103" },
  { title: "Exploring the Limits of Semantic Image Compression at Micro-Bits per Pixel", authors: "Jordan Dotzel*, Bahaa Kotb*, James Dotzel, Mohamed S. Abdelfattah, Zhiru Zhang", venue: "ICLR Tiny Papers 2024", href: "https://arxiv.org/abs/2402.13536" },
  { title: "Opportunities for Post-Training Dynamic Layer Sparsity in Large Vision and Language Models", authors: "Jordan Dotzel, Carly Jiang, Mohamed S. Abdelfattah, Zhiru Zhang", venue: "CVPR Workshop 2024", href: "https://openaccess.thecvf.com/content/CVPR2024W/ELVM/papers/Dotzel_Opportunities_for_Post-Training_Dynamic_Layer_Sparsity_in_Large_Vision_and_CVPRW_2024_paper.pdf" },
  { title: "Semantic Compression of 3D Objects for Open and Collaborative Virtual Worlds", authors: "Jordan Dotzel*, Tony Montes*, Mohamed S. Abdelfattah, Zhiru Zhang", venue: "arXiv 2025", href: "https://arxiv.org/abs/2505.16679" },
  { title: "Radial Networks: Dynamic Layer Routing for High-Performance Large Language Models", authors: "Jordan Dotzel*, Yash Akhauri*, Ahmed S. AbouElhamayed, Carly Jiang, Mohamed S. Abdelfattah, Zhiru Zhang", venue: "arXiv 2024", href: "https://arxiv.org/abs/2404.04900" },
  { title: "OverQ: Opportunistic Outlier Quantization for Neural Network Accelerators", authors: "Jordan Dotzel*, Ritchie Zhao*, Zhanqiu Hu, Preslav Ivanov, Christopher De Sa, Zhiru Zhang", venue: "arXiv 2019", href: "https://arxiv.org/abs/1910.06909" },
  { title: "Improving Neural Network Quantization Without Retraining Using Outlier Channel Splitting", authors: "Ritchie Zhao, Yuwei Hu, Jordan Dotzel, Christopher De Sa, Zhiru Zhang", venue: "ICML 2019", href: "https://arxiv.org/abs/1901.09504" },
  { title: "Building Efficient Deep Neural Networks With Unitary Group Convolutions", authors: "Ritchie Zhao, Yuwei Hu, Jordan Dotzel, Christopher De Sa, Zhiru Zhang", venue: "CVPR 2019", href: "https://arxiv.org/abs/1811.07755" },
  { title: "ShadowLLM: Predictor-based Contextual Sparsity for Large Language Models", authors: "Yash Akhauri, Ahmed F. AbouElhamayed, Jordan Dotzel, Zhiru Zhang, Alexander M. Rush, Safeen Huda, Mohamed S. Abdelfattah", venue: "EMNLP 2024", href: "https://arxiv.org/abs/2406.16635" },
  { title: "SparAMX: Accelerating Compressed LLMs Token Generation on AMX-powered CPUs", authors: "Ahmed F. AbouElhamayed, Jordan Dotzel, Yash Akhauri, Chi-Chih Chang, Sameh Gobriel, J. Pablo Muñoz, Vui Seng Chua, Nilesh Jain, Mohamed S. Abdelfattah", venue: "arXiv 2025", href: "https://arxiv.org/abs/2502.12444" },
  { title: "M4BRAM: Mixed-Precision Matrix-Matrix Multiplication in FPGA Block RAMs", authors: "Yuzong Chen, Jordan Dotzel, Mohamed S. Abdelfattah", venue: "FPT 2023", href: "https://arxiv.org/abs/2311.02758" },
  { title: "Logic Synthesis Meets Machine Learning: Trading Exactness for Generalization", authors: "S. Rai, W. L. Neto, …, Y. Zhou, Y. Zhang, J. Dotzel, Z. Zhang, …", venue: "DATE 2021", href: "https://arxiv.org/abs/2012.02530" },
  { title: "Enabling Design Methodologies and Future Trends for Edge AI: Specialization and Co-Design", authors: "Cong Hao, Jordan Dotzel, Jinjun Xiong, Luca Benini, Zhiru Zhang, Deming Chen", venue: "IEEE Design & Test 2021", href: "https://arxiv.org/abs/2103.15750" },
]
