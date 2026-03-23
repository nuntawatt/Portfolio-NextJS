// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';

// // ─────────────────────────────────────────────────────────────────────────────
// // SVG Icon Library
// // ─────────────────────────────────────────────────────────────────────────────
// const Icons = {
//   GitHub: () => (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
//     </svg>
//   ),
//   Mail: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect width="20" height="16" x="2" y="4" rx="2" />
//       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//     </svg>
//   ),
//   Phone: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.5z" />
//     </svg>
//   ),
//   MapPin: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
//   GraduationCap: () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
//       <path d="M22 10v6" />
//       <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
//     </svg>
//   ),
//   Briefcase: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//       <rect width="20" height="14" x="2" y="6" rx="2" />
//     </svg>
//   ),
//   Code2: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="m18 16 4-4-4-4" />
//       <path d="m6 8-4 4 4 4" />
//       <path d="m14.5 4-5 16" />
//     </svg>
//   ),
//   ArrowRight: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   ),
//   Cpu: () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect width="16" height="16" x="4" y="4" rx="2" />
//       <rect width="6" height="6" x="9" y="9" rx="1" />
//       <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
//     </svg>
//   ),
//   TrendingUp: () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
//       <polyline points="16 7 22 7 22 13" />
//     </svg>
//   ),
//   Layers: () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
//       <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
//       <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
//     </svg>
//   ),
//   Globe: () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
//       <path d="M2 12h20" />
//     </svg>
//   ),
//   Rocket: () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
//       <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
//       <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
//       <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
//     </svg>
//   ),
// };

// // Tech-specific SVG icons (simplified logomarks)
// const TechIcons: Record<string, React.FC> = {
//   JavaScript: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
//     </svg>
//   ),
//   TypeScript: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
//     </svg>
//   ),
//   Python: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21V6.07h2.09l.14.01zm-6.47 14.25a.72.72 0 1 0 0 1.44.72.72 0 0 0 0-1.44zM20.07 7.98l.35.1.32.14.29.18.25.21.22.25.19.28.14.31.1.34.07.36.04.38.02.39v5.62l-.02.4-.04.38-.07.36-.1.34-.14.31-.19.28-.22.25-.25.21-.29.18-.32.14-.35.1-.37.06-.4.02H8.93l-.4-.02-.37-.06-.35-.1-.32-.14-.29-.18-.25-.21-.22-.25-.19-.28-.14-.31-.1-.34-.07-.36-.04-.38-.02-.39V8.97l.02-.39.04-.38.07-.36.1-.34.14-.31.19-.28.22-.25.25-.21.29-.18.32-.14.35-.1.37-.06.4-.02h5.76l.4.02.37.06zm-7.14 6.27a.72.72 0 1 0 0 1.44.72.72 0 0 0 0-1.44z" />
//     </svg>
//   ),
//   React: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
//     </svg>
//   ),
//   'Next.js': () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474.0002.9413.0137 1.1326.1021 1.7522.7295 4.9906 4.476 9.1591 9.4297 10.58.7765.2129 1.587.3559 2.514.4378.3542.0327 1.8773.0327 2.2318 0 1.5487-.1415 2.8575-.5664 4.1921-1.3756.2007-.1243.2389-.1605.2118-.1895-.0176-.0188-1.1309-1.5049-2.4755-3.303l-2.4437-3.2716-3.0602-4.528c-1.6859-2.4928-3.0682-4.5238-3.0829-4.5238-.0145-.0004-.0287 2.0004-.0357 4.4505-.0114 4.2796-.0131 4.4565-.0496 4.5266-.0552.1079-.1019.1546-.1987.2082-.0708.0374-.1331.044-.4684.044H9.045l-.1011-.0629c-.0651-.0404-.1165-.0963-.1507-.1623l-.048-.1024.0053-5.9852.0073-5.9867.0706-.0893c.0367-.049.1151-.1113.1711-.139.0962-.0465.1338-.0516.5076-.0516.4518 0 .5274.0177.6779.1492.0415.0371 1.6921 2.5261 3.6685 5.5291l6.9962 10.5449 2.8198-4.1818C22.8112 14.1 24 12.3694 24 12.3608c0-.024-.5543-8.6232-.5785-8.9741-.0145-.2001-.038-.4124-.0502-.4726-.1075-.5368-.4927-1.0232-.9842-1.2531-.2684-.1264-.5462-.184-.8877-.184-.3315 0-.5992.0534-.877.1726-.5497.2346-.9444.6942-1.0783 1.2593-.0439.1838-.0489.2916-.0547 1.1893-.0048.6884-.0048 1.3745.0002 2.0593l.0039 1.2384-1.4937-2.2637-1.5055-2.2855C17.3977 2.9047 16.5547 1.9 16.5237 1.849c-.3183-.5282-.9127-.9033-1.5597-.9872-.1516-.0196-1.9636-.0287-2.3915-.0138z" />
//     </svg>
//   ),
//   'Node.js': () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
//     </svg>
//   ),
//   MySQL: () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.152zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-3.96c-.096 1.11-.384 1.99-.86 2.64-.418.59-.9.88-1.45.88-.35 0-.645-.094-.886-.28-.24-.19-.36-.454-.36-.795 0-.357.1-.65.298-.88.2-.226.48-.34.84-.34.267 0 .5.068.698.21.2.138.336.336.4.593l-.1.023c-.014-.157-.077-.284-.192-.378-.115-.095-.262-.142-.44-.142-.27 0-.482.098-.636.294-.154.197-.23.46-.23.79 0 .286.08.512.237.68.16.165.38.248.657.248.416 0 .756-.2 1.018-.6.26-.4.43-.975.51-1.72h-1.16c-.054-.25-.116-.52-.184-.807h1.67c.047-.385.074-.79.08-1.217H8.89c-.022.396-.072.784-.15 1.168h.6c.064.24.12.49.17.75zm9.445 5.13c-.2.032-.408.048-.625.048-1.048 0-1.572-.594-1.572-1.782V16.39h-.668v-.578h.668v-.9l.71-.144v1.044h.875v.578h-.875v1.74c0 .374.053.627.158.758.104.13.285.194.544.194.113 0 .23-.017.352-.05l-.03.575zm2.86.04c-.256.045-.512.068-.77.068-.606 0-1.076-.178-1.41-.533-.336-.355-.502-.854-.502-1.5 0-.63.19-1.13.57-1.497.38-.367.898-.55 1.558-.55.244 0 .49.025.738.075l-.056.616c-.228-.073-.45-.11-.666-.11-.416 0-.745.14-.987.42-.24.28-.362.666-.362 1.157 0 .497.117.878.35 1.144.23.265.56.397.987.397.22 0 .44-.035.658-.104l.046.617zm2.89-5.315c-.065-.02-.13-.032-.197-.032-.205 0-.38.066-.526.195-.148.13-.27.36-.37.69h-.01l-.016-.845h-.63c.016.4.025.84.025 1.32v2.86h.7v-2.475c0-.37.063-.665.19-.888.128-.223.338-.334.628-.334.076 0 .156.01.238.03l-.032-.52zm3.33 5.18h-.71v-2.74c0-.386-.065-.668-.194-.848-.13-.18-.34-.27-.63-.27-.298 0-.533.115-.706.344-.172.23-.258.535-.258.916v2.598h-.706v-5.535l.706-.117v2.1h.014c.2-.36.528-.54.984-.54.6 0 .9.39.9 1.17v2.922zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.645 17.04c-.27.046-.545.084-.822.114a15.79 15.79 0 01-.853.063c-.3.014-.6.024-.9.024-.69 0-1.347-.04-1.97-.118-.622-.08-1.174-.224-1.658-.435-.48-.212-.866-.508-1.158-.887-.29-.38-.437-.874-.437-1.485 0-.543.12-1.003.36-1.38.24-.376.56-.686.958-.93.4-.244.847-.42 1.34-.532.493-.11.993-.165 1.5-.165.34 0 .68.027 1.02.08v-1.06c0-.46-.094-.8-.28-1.02-.188-.22-.49-.33-.906-.33-.27 0-.534.044-.792.132-.26.088-.505.208-.74.36l-.298-.517c.266-.19.556-.34.87-.45.312-.108.635-.163.966-.163.634 0 1.12.178 1.455.534.337.355.505.88.505 1.572v4.04zm-3.655-7.04c-1.108 0-2.034.304-2.78.91-.746.607-1.12 1.428-1.12 2.465 0 1.026.367 1.838 1.1 2.437.732.598 1.67.897 2.814.897.397 0 .785-.035 1.165-.106l-.018-.586c-.335.066-.67.1-1.007.1-.988 0-1.783-.244-2.383-.73-.6-.487-.9-1.14-.9-1.96 0-.85.31-1.515.93-1.994.62-.48 1.425-.72 2.413-.72.33 0 .66.036.99.107l.005-.57c-.37-.067-.74-.1-1.21-.15z"/>
//     </svg>
//   ),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Types
// // ─────────────────────────────────────────────────────────────────────────────
// interface Vec3 { x: number; y: number; z: number }
// interface ParticleData extends Vec3 {
//   vx: number; vy: number; vz: number;
//   size: number; opacity: number; colorIdx: number;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // useIntersectionObserver
// // ─────────────────────────────────────────────────────────────────────────────
// function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
//   const ref = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, inView];
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // useCountUp
// // ─────────────────────────────────────────────────────────────────────────────
// function useCountUp(target: number, active: boolean, duration = 1800): number {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!active || !target) return;
//     let start = 0;
//     const raf = (ts: number) => {
//       if (!start) start = ts;
//       const p = Math.min((ts - start) / duration, 1);
//       const eased = 1 - Math.pow(1 - p, 4);
//       setValue(Math.round(eased * target));
//       if (p < 1) requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);
//   }, [active, target, duration]);
//   return value;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // 3D Particle Canvas
// // ─────────────────────────────────────────────────────────────────────────────
// const PALETTE = ['rgba(249,115,22,0.9)', 'rgba(234,88,12,0.7)', 'rgba(253,186,116,0.5)', 'rgba(255,237,213,0.3)'];

// function ParticleCanvas() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef   = useRef<number>(0);
//   const mouseRef  = useRef({ x: 0, y: 0 });
//   const ptcRef    = useRef<ParticleData[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d')!;

//     const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);

//     ptcRef.current = Array.from({ length: 70 }, () => ({
//       x: Math.random(), y: Math.random(),
//       z: Math.random() * 900 + 100,
//       vx: (Math.random() - 0.5) * 0.0003,
//       vy: (Math.random() - 0.5) * 0.0003,
//       vz: (Math.random() - 0.5) * 1.1,
//       size: Math.random() * 2.5 + 0.8,
//       opacity: Math.random() * 0.7 + 0.2,
//       colorIdx: Math.floor(Math.random() * PALETTE.length),
//     }));

//     const project = (nx: number, ny: number, z: number, w: number, h: number) => {
//       const fov = 700;
//       const scale = fov / (fov + z);
//       return { px: (nx - 0.5) * w * scale + w / 2, py: (ny - 0.5) * h * scale + h / 2, scale };
//     };

//     const frame = () => {
//       const w = canvas.width; const h = canvas.height;
//       ctx.clearRect(0, 0, w, h);
//       const mx = (mouseRef.current.x / w - 0.5) * 0.00012;
//       const my = (mouseRef.current.y / h - 0.5) * 0.00012;
//       const pts = ptcRef.current;

//       for (let i = 0; i < pts.length; i++) {
//         const p = pts[i];
//         p.x = (p.x + p.vx + mx + 1) % 1;
//         p.y = (p.y + p.vy + my + 1) % 1;
//         p.z = ((p.z + p.vz) + 1000) % 1000;
//         const { px, py, scale } = project(p.x, p.y, p.z, w, h);

//         for (let j = i + 1; j < pts.length; j++) {
//           const p2 = pts[j];
//           const { px: px2, py: py2 } = project(p2.x, p2.y, p2.z, w, h);
//           const d = Math.hypot(px - px2, py - py2);
//           if (d < 90) {
//             ctx.beginPath();
//             ctx.moveTo(px, py);
//             ctx.lineTo(px2, py2);
//             ctx.strokeStyle = 'rgba(249,115,22,1)';
//             ctx.globalAlpha = (1 - d / 90) * 0.1 * scale;
//             ctx.lineWidth = 0.6;
//             ctx.stroke();
//           }
//         }

//         ctx.beginPath();
//         ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
//         ctx.fillStyle = PALETTE[p.colorIdx];
//         ctx.globalAlpha = p.opacity * scale;
//         ctx.fill();
//       }
//       ctx.globalAlpha = 1;
//       animRef.current = requestAnimationFrame(frame);
//     };
//     frame();

//     const onMouse = (e: MouseEvent) => {
//       const r = canvas.getBoundingClientRect();
//       mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
//     };
//     window.addEventListener('mousemove', onMouse);
//     return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); window.removeEventListener('mousemove', onMouse); };
//   }, []);

//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // TiltCard — perspective-3D hover
// // ─────────────────────────────────────────────────────────────────────────────
// function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     const el = ref.current; if (!el) return;
//     const r = el.getBoundingClientRect();
//     const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
//     const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
//     el.style.transform    = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.025,1.025,1.025)`;
//     el.style.transition   = 'transform 0.05s linear';
//   }, []);
//   const onLeave = useCallback(() => {
//     const el = ref.current; if (!el) return;
//     el.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
//     el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
//   }, []);
//   return (
//     <div ref={ref} className={className} style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
//       onMouseMove={onMove} onMouseLeave={onLeave}>
//       {children}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // StatCard
// // ─────────────────────────────────────────────────────────────────────────────
// interface StatItem { value: number; suffix: string; label: string; icon: React.ReactNode }

// function StatCard({ stat }: { stat: StatItem }) {
//   const [ref, inView] = useInView(0.4);
//   const count = useCountUp(stat.value, inView);
//   return (
//     <TiltCard
//       className="relative rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden"
//       style={{ background: 'rgba(255,255,255,0.032)', border: '1px solid rgba(249,115,22,0.18)', backdropFilter: 'blur(16px)' }}
//     >
//       <div className="p-2.5 rounded-xl" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316' }}>
//         {stat.icon}
//       </div>
//       <div ref={ref} className="text-center">
//         <p className="font-black leading-none" style={{ fontSize: '2.25rem', fontFamily: "'Clash Display', 'Playfair Display', Georgia, serif", background: 'linear-gradient(135deg,#fb923c,#ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//           {count}{stat.suffix}
//         </p>
//         <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: '#6b7280', letterSpacing: '0.12em' }}>{stat.label}</p>
//       </div>
//       <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//         style={{ background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 65%)' }} />
//     </TiltCard>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SkillPill
// // ─────────────────────────────────────────────────────────────────────────────
// interface SkillItem { label: string; level: number }

// function SkillPill({ skill, index }: { skill: SkillItem; index: number }) {
//   const [ref, inView] = useInView(0.1);
//   const [hov, setHov] = useState(false);
//   const TechIcon = TechIcons[skill.label];

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? 'none' : 'translateY(16px)',
//         transition: `opacity 0.45s ${index * 0.04}s ease, transform 0.45s ${index * 0.04}s ease`,
//       }}
//     >
//       <div
//         className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default select-none overflow-hidden"
//         style={{
//           background: hov ? 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.12))' : 'rgba(255,255,255,0.04)',
//           border: `1px solid ${hov ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)'}`,
//           transform: hov ? 'perspective(300px) translateZ(10px) scale(1.04)' : 'perspective(300px) translateZ(0px) scale(1)',
//           boxShadow: hov ? '0 8px 24px rgba(249,115,22,0.25)' : 'none',
//           transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
//         }}
//       >
//         {TechIcon ? (
//           <span style={{ color: hov ? '#fb923c' : '#9ca3af', transition: 'color 0.25s ease' }}>
//             <TechIcon />
//           </span>
//         ) : (
//           <span style={{ color: hov ? '#fb923c' : '#6b7280', transition: 'color 0.25s ease' }}>
//             <Icons.Code2 />
//           </span>
//         )}
//         <span className="text-sm font-semibold" style={{ color: hov ? '#fff' : '#d1d5db', transition: 'color 0.25s ease' }}>
//           {skill.label}
//         </span>
//         {/* proficiency bar */}
//         <span className="ml-auto flex gap-0.5">
//           {[1,2,3,4,5].map(i => (
//             <span key={i} className="block rounded-full" style={{
//               width: 4, height: 4,
//               background: i <= skill.level ? (hov ? '#f97316' : 'rgba(249,115,22,0.7)') : 'rgba(255,255,255,0.12)',
//               transition: 'background 0.25s ease',
//             }} />
//           ))}
//         </span>
//         {hov && (
//           <span className="absolute inset-0 pointer-events-none rounded-xl"
//             style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, transparent 60%)' }} />
//         )}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // TimelineItem
// // ─────────────────────────────────────────────────────────────────────────────
// interface ExpItem {
//   period: string; title: string; company: string;
//   desc: string; tags: string[]; type: 'internship' | 'project';
// }

// function TimelineItem({ exp, index }: { exp: ExpItem; index: number }) {
//   const [ref, inView] = useInView(0.15);
//   const [hov, setHov] = useState(false);
//   return (
//     <div
//       ref={ref}
//       className="relative md:ml-14"
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? 'none' : 'translateX(-20px)',
//         transition: `opacity 0.55s ${index * 0.1}s ease, transform 0.55s ${index * 0.1}s ease`,
//       }}
//     >
//       {/* dot */}
//       <div className="absolute -left-[3.1rem] top-5 hidden md:flex items-center justify-center w-4 h-4 rounded-full z-10"
//         style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 0 14px rgba(249,115,22,0.55)' }}>
//         <div className="w-1.5 h-1.5 rounded-full bg-white" />
//       </div>

//       <TiltCard
//         className="relative rounded-2xl p-5 overflow-hidden cursor-default"
//         style={{
//           background: hov ? 'rgba(249,115,22,0.05)' : 'rgba(255,255,255,0.025)',
//           border: `1px solid ${hov ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.07)'}`,
//           backdropFilter: 'blur(12px)',
//           transition: 'background 0.3s ease, border-color 0.3s ease',
//         }}
//       >
//         <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//           className="absolute inset-0" />

//         <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>
//               {exp.type === 'internship' ? <Icons.Briefcase /> : <Icons.Rocket />}
//             </div>
//             <div>
//               <h4 className="font-bold text-white text-sm leading-snug">{exp.title}</h4>
//               <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{exp.company}</p>
//             </div>
//           </div>
//           <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0" style={{
//             background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#fb923c', letterSpacing: '0.05em',
//           }}>{exp.period}</span>
//         </div>

//         <p className="text-sm leading-relaxed mb-3" style={{ color: '#9ca3af', paddingLeft: '2.75rem' }}>{exp.desc}</p>

//         <div className="flex gap-2 flex-wrap" style={{ paddingLeft: '2.75rem' }}>
//           {exp.tags.map(t => (
//             <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-md" style={{
//               color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)',
//             }}>{t}</span>
//           ))}
//         </div>
//       </TiltCard>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Section Header
// // ─────────────────────────────────────────────────────────────────────────────
// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2.5" style={{ color: '#f97316', letterSpacing: '0.18em' }}>
//       <span className="block w-5 h-px" style={{ background: '#f97316' }} />
//       {children}
//       <span className="block flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.4), transparent)' }} />
//     </p>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Component
// // ─────────────────────────────────────────────────────────────────────────────
// export function AboutSection() {
//   const [headerRef, headerInView] = useInView(0.2);

//   const stats: StatItem[] = [
//     { value: 6,  suffix: '+', label: 'Projects Built',     icon: <Icons.Rocket /> },
//     { value: 3,  suffix: '',  label: 'Tech Stacks',        icon: <Icons.Layers /> },
//     { value: 40, suffix: '%', label: 'Efficiency Gained',  icon: <Icons.TrendingUp /> },
//     { value: 3,  suffix: '',  label: 'Languages',          icon: <Icons.Globe /> },
//   ];

//   const skills: SkillItem[] = [
//     { label: 'JavaScript', level: 5 }, { label: 'TypeScript', level: 4 },
//     { label: 'Python',     level: 4 }, { label: 'PHP',        level: 3 },
//     { label: 'C#',         level: 3 }, { label: 'C++',        level: 3 },
//     { label: 'React',      level: 5 }, { label: 'Next.js',    level: 5 },
//     { label: 'Node.js',    level: 4 }, { label: 'Tailwind CSS', level: 5 },
//     { label: 'MySQL',      level: 4 }, { label: 'MongoDB',    level: 3 },
//     { label: 'Firebase',   level: 3 }, { label: 'YOLOv5',     level: 3 },
//     { label: 'HTML / CSS', level: 5 },
//   ];

//   const experiences: ExpItem[] = [
//     {
//       period: '2025', type: 'internship',
//       title: 'People Detection System',
//       company: 'NT Khon Kaen — Internship',
//       desc: 'Built a real-time people-detection pipeline with YOLOv5 and Python consuming live RTSP streams from CCTV cameras. Designed the monitoring UI using Tailwind CSS.',
//       tags: ['YOLOv5', 'Python', 'RTSP', 'Tailwind CSS'],
//     },
//     {
//       period: '2024', type: 'project',
//       title: 'Shopping Cart System',
//       company: 'Personal Project',
//       desc: 'Responsive shopping cart built with Next.js featuring real-time cart updates, optimised state management, and a consistent UX across all viewport sizes.',
//       tags: ['Next.js', 'React', 'State Management'],
//     },
//     {
//       period: '2024', type: 'project',
//       title: 'Weather Forecast Application',
//       company: 'Personal Project',
//       desc: 'React application consuming the OpenWeather API with search functionality, HTML5 Geolocation, and a fully responsive layout for mobile and desktop.',
//       tags: ['React', 'OpenWeather API', 'Geolocation'],
//     },
//     {
//       period: '2023', type: 'project',
//       title: 'Student Activity Registration',
//       company: 'Academic Project',
//       desc: 'Web platform built with PHP, MySQL, and Bootstrap that centralised event registrations and provided an admin dashboard, improving registration efficiency by 40%.',
//       tags: ['PHP', 'MySQL', 'Bootstrap'],
//     },
//     {
//       period: '2023', type: 'project',
//       title: 'E-commerce Platform & Admin Dashboard',
//       company: 'Academic Project',
//       desc: 'Full-stack PHP/MySQL IT-product store with secure payment flow, inventory management, order tracking, and a dedicated admin control panel.',
//       tags: ['PHP', 'MySQL', 'Admin Dashboard'],
//     },
//     {
//       period: '2023', type: 'project',
//       title: 'Restaurant Seat Reservation System',
//       company: 'Academic Project',
//       desc: 'C# desktop application that streamlined seating management, reduced overbooking incidents, and enforced role-based access for staff and customers.',
//       tags: ['C#', 'Role-based Access'],
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Figtree:wght@300;400;500;600;700;800&display=swap');

//         :root {
//           --accent:       #f97316;
//           --accent-light: #fb923c;
//           --accent-dark:  #ea580c;
//           --surface:      rgba(255,255,255,0.03);
//           --border:       rgba(255,255,255,0.07);
//           --text-primary: #f3f4f6;
//           --text-muted:   #9ca3af;
//           --text-faint:   #4b5563;
//         }

//         .about-section * { font-family: 'Figtree', sans-serif; }

//         @keyframes orb-drift {
//           0%   { transform: translate(0,0) scale(1);     opacity: .15; }
//           50%  { transform: translate(20px,-30px) scale(1.08); opacity: .22; }
//           100% { transform: translate(-10px,15px) scale(.95);  opacity: .12; }
//         }
//         @keyframes slide-up {
//           from { opacity:0; transform: translateY(32px); }
//           to   { opacity:1; transform: translateY(0);    }
//         }
//         @keyframes line-grow {
//           from { transform: scaleX(0); }
//           to   { transform: scaleX(1); }
//         }
//         @keyframes badge-pop {
//           0%   { transform: scale(0.85); opacity: 0; }
//           60%  { transform: scale(1.06); }
//           100% { transform: scale(1);    opacity: 1; }
//         }
//         @keyframes dot-breathe {
//           0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
//           50%     { box-shadow: 0 0 0 6px rgba(249,115,22,0); }
//         }

//         .orb { animation: orb-drift ease-in-out infinite alternate; border-radius: 50%; position:absolute; filter:blur(60px); pointer-events:none; }
//         .hero-text-in    { animation: slide-up 0.75s cubic-bezier(0.22,1,0.36,1) both; }
//         .divider-grow    { transform-origin: left; animation: line-grow 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
//         .status-dot      { animation: dot-breathe 2s ease-in-out infinite; }
//         .badge-in        { animation: badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }

//         /* scrollbar */
//         .about-section ::-webkit-scrollbar { width: 4px; }
//         .about-section ::-webkit-scrollbar-track { background: transparent; }
//         .about-section ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 2px; }
//       `}</style>

//       <section
//         id="about"
//         className="about-section relative scroll-mt-24 py-28 overflow-hidden"
//         style={{ background: '#080808' }}
//       >
//         {/* ── Background layers ── */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <ParticleCanvas />
//           <div className="orb" style={{ width:500, height:500, left:'-8%',  top:'-10%', background:'radial-gradient(circle,rgba(249,115,22,1),transparent 70%)', animationDuration:'7s',  animationDelay:'0s' }} />
//           <div className="orb" style={{ width:380, height:380, right:'-6%', top:'40%',  background:'radial-gradient(circle,rgba(234,88,12,1),transparent 70%)',  animationDuration:'9s',  animationDelay:'2s' }} />
//           <div className="orb" style={{ width:280, height:280, left:'40%',  bottom:'-5%',background:'radial-gradient(circle,rgba(253,186,116,1),transparent 70%)',animationDuration:'11s', animationDelay:'4s' }} />
//           {/* subtle grid */}
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.018) 1px, transparent 1px)',
//             backgroundSize: '60px 60px',
//           }} />
//         </div>

//         <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

//           {/* ── Section Header ── */}
//           <div ref={headerRef} className="mb-20">
//             <div
//               className="hero-text-in"
//               style={{ animationDelay: '0s', opacity: headerInView ? undefined : 0 }}
//             >
//               <p className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: '#f97316', letterSpacing: '0.2em' }}>
//                 <span className="divider-grow block w-8 h-px bg-orange-500" />
//                 Who I Am
//               </p>
//               <h2 style={{
//                 fontFamily: "'Playfair Display', Georgia, serif",
//                 fontSize: 'clamp(3rem, 7vw, 5.5rem)',
//                 fontWeight: 900,
//                 lineHeight: 1,
//                 letterSpacing: '-0.03em',
//                 color: '#f9fafb',
//               }}>
//                 About{' '}
//                 <em style={{
//                   fontStyle: 'normal',
//                   background: 'linear-gradient(110deg, #fb923c 0%, #f97316 45%, #ea580c 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}>
//                   Me.
//                 </em>
//               </h2>
//             </div>
//           </div>

//           {/* ── Bio + Stats ── */}
//           <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start mb-24">

//             {/* Bio */}
//             <TiltCard
//               className="relative rounded-3xl p-8 overflow-hidden"
//               style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)' }}
//             >
//               {/* corner accent */}
//               <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none rounded-3xl overflow-hidden">
//                 <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.12),transparent 65%)' }} />
//               </div>

//               {/* identity row */}
//               <div className="flex items-start gap-5 mb-7">
//                 <div className="relative flex-shrink-0">
//                   <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
//                     style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow:'0 0 28px rgba(249,115,22,0.5)' }}>
//                     <Icons.Code2 />
//                   </div>
//                   <span className="status-dot absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500"
//                     style={{ border:'2px solid #080808' }} />
//                 </div>
//                 <div>
//                   <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'1.6rem', fontWeight:900, color:'#f9fafb', letterSpacing:'-0.02em', lineHeight:1.1 }}>
//                     Nuntawat Sae-Huam
//                   </h3>
//                   <p className="text-sm font-semibold mt-1" style={{ color:'#fb923c' }}>Full-Stack Engineer · AI Enthusiast</p>
//                   <div className="flex items-center gap-4 mt-2 flex-wrap">
//                     {[
//                       { icon: <Icons.MapPin />, text: 'Khon Kaen, Thailand' },
//                       { icon: <Icons.Phone />, text: '062-520-6392' },
//                     ].map(({ icon, text }) => (
//                       <span key={text} className="flex items-center gap-1.5 text-xs" style={{ color:'#6b7280' }}>
//                         {icon} {text}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* divider */}
//               <div className="mb-6 h-px" style={{ background:'linear-gradient(to right, rgba(249,115,22,0.3), transparent)' }} />

//               <p className="leading-loose mb-4" style={{ color:'#d1d5db', fontSize:'0.9375rem' }}>
//                 Computer and Information Science student at{' '}
//                 <span style={{ color:'#fb923c', fontWeight:700 }}>Khon Kaen University</span>{' '}
//                 (Expected May 2026, GPAX 3.21), focused on architecting scalable backend systems,
//                 full-stack web applications, and machine learning–driven solutions.
//               </p>
//               <p className="leading-loose mb-7" style={{ color:'#9ca3af', fontSize:'0.875rem' }}>
//                 From building real-time CCTV detection pipelines with <span style={{ color:'#fb923c' }}>YOLOv5</span> to
//                 shipping e-commerce platforms—I obsess over clean architecture, performance, and code that is maintainable
//                 long after handoff. Fluent in Thai, conversational in English.
//               </p>

//               {/* CTAs */}
//               <div className="flex gap-3 flex-wrap">
//                 <a
//                   href="https://github.com/nuntawatt"
//                   target="_blank" rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold"
//                   style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff', boxShadow:'0 4px 18px rgba(249,115,22,0.35)', textDecoration:'none', transition:'transform 0.2s, box-shadow 0.2s' }}
//                   onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1.05)'; el.style.boxShadow='0 8px 28px rgba(249,115,22,0.5)'; }}
//                   onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1)';    el.style.boxShadow='0 4px 18px rgba(249,115,22,0.35)'; }}
//                 >
//                   <Icons.GitHub /> GitHub
//                 </a>
//                 <a
//                   href="mailto:nanthawat.s@kkumail.com"
//                   className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold"
//                   style={{ background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.3)', color:'#fb923c', textDecoration:'none', transition:'all 0.2s' }}
//                   onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(249,115,22,0.15)'; el.style.transform='scale(1.04)'; }}
//                   onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(249,115,22,0.08)'; el.style.transform='scale(1)'; }}
//                 >
//                   <Icons.Mail /> Contact
//                 </a>
//               </div>
//             </TiltCard>

//             {/* Right column: stats + education */}
//             <div className="flex flex-col gap-4">
//               <div className="grid grid-cols-2 gap-4">
//                 {stats.map(s => <StatCard key={s.label} stat={s} />)}
//               </div>

//               {/* Education card */}
//               <TiltCard className="rounded-2xl p-5 overflow-hidden" style={{
//                 background:'rgba(255,255,255,0.025)', border:'1px solid rgba(249,115,22,0.18)', backdropFilter:'blur(16px)',
//               }}>
//                 <div className="flex items-center gap-4">
//                   <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
//                     style={{ background:'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(234,88,12,0.1))', color:'#f97316' }}>
//                     <Icons.GraduationCap />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color:'#f97316', letterSpacing:'0.12em' }}>Education</p>
//                     <p className="font-bold text-sm text-white leading-snug">B.Sc. Computer & Information Science</p>
//                     <p className="text-xs mt-0.5" style={{ color:'#6b7280' }}>Khon Kaen University · GPAX 3.21 · May 2026</p>
//                   </div>
//                 </div>
//               </TiltCard>
//             </div>
//           </div>

//           {/* ── Skills ── */}
//           <div className="mb-24">
//             <SectionLabel>Technical Skills</SectionLabel>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
//               {skills.map((s, i) => <SkillPill key={s.label} skill={s} index={i} />)}
//             </div>
//           </div>

//           {/* ── Experience & Projects ── */}
//           <div>
//             <SectionLabel>Experience &amp; Projects</SectionLabel>
//             <div className="relative">
//               {/* timeline spine */}
//               <div className="absolute left-6 top-2 bottom-2 w-px hidden md:block"
//                 style={{ background:'linear-gradient(to bottom,transparent,rgba(249,115,22,0.5) 15%,rgba(234,88,12,0.5) 85%,transparent)' }} />
//               <div className="space-y-4">
//                 {experiences.map((exp, i) => <TimelineItem key={i} exp={exp} index={i} />)}
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }