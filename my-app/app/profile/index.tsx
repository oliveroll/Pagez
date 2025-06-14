import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const pagezLogoSvg = `<svg width="48" height="15" viewBox="0 0 48 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46.5026 11.1419C46.4203 11.1419 46.2381 11.1184 45.956 11.0714C45.4036 10.9891 44.8865 10.948 44.4046 10.948H40.1735C39.6446 10.948 39.3801 10.7893 39.3801 10.4719C39.3801 10.3544 39.4095 10.2193 39.4683 10.0665C39.5388 9.91367 39.6211 9.77264 39.7151 9.64335L43.5936 4.08997C43.6524 4.0077 43.6818 3.93131 43.6818 3.86079C43.6818 3.7315 43.6113 3.66686 43.4702 3.66686H42.1833C41.9482 3.66686 41.7543 3.73738 41.6015 3.87842C41.4604 4.01945 41.3135 4.2604 41.1607 4.60124C41.0432 4.87156 40.9139 5.05961 40.7729 5.16539C40.6318 5.27117 40.4555 5.32406 40.244 5.32406C40.0677 5.32406 39.9208 5.27705 39.8032 5.18302C39.6975 5.08899 39.6446 4.90682 39.6446 4.6365C39.6446 4.38968 39.7033 4.05471 39.8209 3.6316C39.9619 3.14972 40.0736 2.803 40.1558 2.59144C40.2499 2.36813 40.3498 2.22122 40.4555 2.1507C40.5731 2.08018 40.7317 2.04492 40.9315 2.04492C41.0138 2.04492 41.196 2.06843 41.4781 2.11544C42.0305 2.19771 42.5476 2.23885 43.0295 2.23885H47.4193C47.6074 2.23885 47.7484 2.29174 47.8424 2.39752C47.9364 2.49154 47.9835 2.59144 47.9835 2.69722C47.9835 2.86177 47.9071 3.06157 47.7543 3.29663L43.7699 9.11446C43.7229 9.20848 43.6994 9.279 43.6994 9.32601C43.6994 9.4553 43.7699 9.51994 43.911 9.51994H45.2508C45.4859 9.51994 45.674 9.44942 45.815 9.30839C45.9678 9.16735 46.1206 8.92641 46.2734 8.58556C46.3909 8.31524 46.5202 8.12719 46.6612 8.02141C46.8023 7.91563 46.9786 7.86274 47.1901 7.86274C47.3664 7.86274 47.5074 7.90976 47.6132 8.00378C47.7308 8.09781 47.7895 8.27998 47.7895 8.55031C47.7895 8.79712 47.7308 9.13209 47.6132 9.5552C47.4722 10.0488 47.3547 10.4014 47.2606 10.613C47.1784 10.8245 47.0785 10.9656 46.9609 11.0361C46.8551 11.1066 46.7024 11.1419 46.5026 11.1419Z" fill="#EB4D2A"/><path d="M35.1586 11.1595C34.2184 11.1595 33.3898 10.9538 32.6728 10.5424C31.9676 10.1311 31.4211 9.57866 31.0333 8.88522C30.6572 8.18003 30.4691 7.4102 30.4691 6.57572C30.4691 5.68248 30.6866 4.89502 31.1214 4.21333C31.5563 3.53165 32.1381 3.00275 32.8668 2.62665C33.5955 2.25055 34.3829 2.0625 35.2292 2.0625C36.0401 2.0625 36.7336 2.22704 37.3095 2.55613C37.8971 2.88522 38.3379 3.29658 38.6317 3.79022C38.9373 4.2721 39.0901 4.73635 39.0901 5.18297C39.0901 5.6766 38.9725 6.03507 38.7375 6.25839C38.5142 6.46994 38.1146 6.61686 37.5387 6.69913L34.4887 7.13987C34.3477 7.15163 34.2478 7.18101 34.189 7.22802C34.142 7.26328 34.1185 7.32792 34.1185 7.42195C34.1185 7.64526 34.2008 7.88032 34.3653 8.12714C34.5416 8.37396 34.7943 8.58551 35.1234 8.76181C35.4525 8.93811 35.8286 9.02626 36.2517 9.02626C36.7218 9.02626 37.139 8.93811 37.5034 8.76181C37.8677 8.57376 38.1498 8.3622 38.3496 8.12714C38.4436 8.03311 38.5435 7.9861 38.6493 7.9861C38.8139 7.9861 38.9314 8.03311 39.0019 8.12714C39.0842 8.22116 39.1253 8.3387 39.1253 8.47973C39.1253 8.56201 39.1195 8.62077 39.1077 8.65603C38.9196 9.32596 38.4907 9.91362 37.8207 10.419C37.1626 10.9126 36.2752 11.1595 35.1586 11.1595ZM35.5112 5.51793C35.711 5.48267 35.8521 5.42391 35.9343 5.34164C36.0166 5.24761 36.0578 5.1242 36.0578 4.97141C36.0578 4.75985 35.999 4.53654 35.8815 4.30148C35.7757 4.05466 35.6288 3.84898 35.4407 3.68444C35.2527 3.51989 35.047 3.43762 34.8237 3.43762C34.095 3.43762 33.7306 3.99002 33.7306 5.09482C33.7306 5.36514 33.7541 5.55319 33.8011 5.65897C33.8482 5.753 33.9246 5.80001 34.0303 5.80001L34.2419 5.76475L35.5112 5.51793Z" fill="#EB4D2A"/><path d="M27.9132 8.95592C29.4176 9.32027 30.1698 10.0548 30.1698 11.1596C30.1698 12.0999 29.7291 12.8403 28.8476 13.381C27.9661 13.9216 26.8025 14.192 25.3569 14.192C24.7927 14.192 24.2227 14.1273 23.6468 13.998C23.0826 13.8805 22.5773 13.7042 22.1306 13.4691C21.6723 13.2341 21.3079 12.952 21.0376 12.6229C20.779 12.2938 20.6497 11.9236 20.6497 11.5122C20.6497 11.0891 20.779 10.7659 21.0376 10.5426C21.3079 10.3193 21.637 10.2076 22.0249 10.2076C22.4245 10.2076 22.8065 10.3193 23.1708 10.5426C23.5351 10.7659 23.8055 11.0832 23.9818 11.4946C24.1346 11.859 24.352 12.1528 24.6341 12.3761C24.9984 12.6699 25.3863 12.8168 25.7976 12.8168C26.1502 12.8051 26.4441 12.6876 26.6791 12.4642C26.9142 12.2409 27.0317 11.9295 27.0317 11.5299C27.0317 10.9775 26.8437 10.5015 26.4676 10.1019C26.1032 9.70225 25.6155 9.48482 25.0043 9.44956C24.1698 9.44956 23.4176 9.29676 22.7477 8.99118C22.0778 8.67385 21.5489 8.23898 21.161 7.68658C20.7732 7.12243 20.5792 6.476 20.5792 5.7473C20.5792 5.01861 20.779 4.37806 21.1786 3.82566C21.5782 3.26151 22.1365 2.82664 22.8535 2.52106C23.5704 2.20372 24.4049 2.04505 25.3569 2.04505C25.9798 2.04505 26.5851 2.12145 27.1728 2.27424C27.3138 2.29775 27.4078 2.3095 27.4548 2.3095C27.7134 2.3095 27.8897 2.21547 27.9837 2.02742C28.0778 1.82762 28.1248 1.54554 28.1248 1.1812C28.1248 0.79334 28.254 0.499511 28.5126 0.299706C28.7712 0.0999022 29.0709 0 29.4117 0C29.7643 0 30.064 0.117532 30.3109 0.352596C30.5694 0.575907 30.6987 0.840353 30.6987 1.14593C30.6987 1.63957 30.5459 2.06856 30.2403 2.43291C29.9465 2.79726 29.5293 3.05583 28.9886 3.20862C29.7408 3.8903 30.1169 4.73653 30.1169 5.7473C30.1169 6.476 29.923 7.11655 29.5351 7.66895C29.159 8.22135 28.6184 8.65034 27.9132 8.95592ZM25.0396 3.43781C24.7105 3.43781 24.4401 3.57884 24.2286 3.86092C24.0288 4.143 23.9289 4.5191 23.9289 4.98922C23.9289 5.90597 24.0817 6.64642 24.3873 7.21058C24.7046 7.76297 25.1159 8.03917 25.6213 8.03917C25.9622 8.03917 26.2325 7.89814 26.4323 7.61606C26.6439 7.33398 26.7496 6.95788 26.7496 6.48775C26.7496 5.57101 26.591 4.83643 26.2736 4.28403C25.9681 3.71988 25.5567 3.43781 25.0396 3.43781Z" fill="#EB4D2A"/><path d="M13.8699 11.1596C12.8121 11.1596 12.0481 10.9245 11.578 10.4544C11.1079 9.97249 10.8728 9.36133 10.8728 8.62088C10.8728 7.77465 11.243 7.09296 11.9835 6.57582C12.7239 6.04693 13.6877 5.73547 14.8748 5.64145C15.2509 5.60619 15.5271 5.56505 15.7034 5.51804C15.8914 5.47103 16.0148 5.40051 16.0736 5.30648C16.1441 5.2007 16.1676 5.05379 16.1441 4.86574L16.1088 4.56603C16.0618 4.18993 15.9619 3.90785 15.8091 3.7198C15.6681 3.53175 15.4272 3.43773 15.0863 3.43773C14.816 3.43773 14.5692 3.52 14.3459 3.68454C14.1343 3.84909 13.9874 4.0959 13.9051 4.42499C13.8111 4.78934 13.6524 5.05966 13.4291 5.23596C13.2058 5.41226 12.8943 5.50041 12.4947 5.50041C12.2479 5.50041 12.0246 5.41226 11.8248 5.23596C11.625 5.05966 11.5251 4.8246 11.5251 4.53077C11.5251 4.04889 11.719 3.6199 12.1069 3.2438C12.5065 2.85594 13.0354 2.55624 13.6936 2.34468C14.3635 2.13312 15.0863 2.02734 15.862 2.02734C16.7083 2.02734 17.3723 2.15075 17.8542 2.39757C18.3478 2.63263 18.7063 2.97348 18.9296 3.4201C19.1529 3.86672 19.3116 4.43087 19.4056 5.11255L19.8111 8.14487C19.8581 8.45046 19.9169 8.65614 19.9874 8.76191C20.0697 8.85594 20.1813 8.90295 20.3224 8.90295C20.4516 8.90295 20.5692 8.87945 20.675 8.83243C20.7925 8.77367 20.8806 8.74429 20.9394 8.74429C21.2097 8.74429 21.3449 8.90883 21.3449 9.23792C21.3449 9.51999 21.245 9.80795 21.0452 10.1018C20.8571 10.3839 20.5927 10.6189 20.2518 10.807C19.9227 10.995 19.5584 11.089 19.1588 11.089C18.6181 11.089 18.195 10.9891 17.8894 10.7893C17.5956 10.5778 17.3723 10.2781 17.2195 9.89022C17.1725 9.76094 17.1137 9.69629 17.0432 9.69629C17.008 9.69629 16.8904 9.83145 16.6906 10.1018C16.5026 10.3603 16.1794 10.6013 15.721 10.8246C15.2744 11.0479 14.6573 11.1596 13.8699 11.1596ZM15.3684 9.39659C15.7092 9.39659 15.9913 9.26143 16.2146 8.9911C16.4379 8.70903 16.5496 8.33292 16.5496 7.8628C16.5496 7.79228 16.5378 7.65124 16.5143 7.43968L16.4967 7.31627C16.4614 7.0577 16.3733 6.88728 16.2323 6.80501C16.103 6.72274 15.8679 6.6816 15.5271 6.6816C14.6221 6.6816 14.1696 7.14585 14.1696 8.07435C14.1696 8.50922 14.2753 8.83831 14.4869 9.06162C14.7102 9.28493 15.004 9.39659 15.3684 9.39659Z" fill="#EB4D2A"/><path d="M2.32713 14.1037C1.44564 14.1037 0.846229 14.045 0.528893 13.9274C0.22331 13.8217 0.0705191 13.6395 0.0705191 13.3809C0.0705191 13.1341 0.199804 12.9402 0.458374 12.7991C0.799216 12.6228 1.01077 12.3936 1.09305 12.1116C1.17532 11.8295 1.21645 11.3946 1.21645 10.807V5.14781C1.21645 4.85398 1.18119 4.6248 1.11068 4.46025C1.05191 4.29571 0.934378 4.19581 0.75808 4.16055C0.511263 4.11353 0.323212 4.05477 0.193927 3.98425C0.0646425 3.91373 0 3.79032 0 3.61402C0 3.42597 0.0646425 3.28493 0.193927 3.19091C0.334966 3.08513 0.558276 2.97347 0.863858 2.85594C2.1097 2.37406 3.03232 2.13312 3.63173 2.13312C3.93731 2.13312 4.15475 2.18601 4.28403 2.29179C4.41332 2.38582 4.47796 2.56799 4.47796 2.83831V3.40247C4.47796 3.6963 4.51322 3.84321 4.58374 3.84321C4.60725 3.84321 4.73653 3.67867 4.97159 3.34958C5.20666 3.02049 5.53575 2.72078 5.95886 2.45046C6.38198 2.16838 6.89911 2.02734 7.51028 2.02734C8.09794 2.02734 8.63859 2.19189 9.13222 2.52098C9.6376 2.83831 10.0372 3.30844 10.331 3.93136C10.6366 4.55428 10.7894 5.29473 10.7894 6.15271C10.7894 7.09296 10.5896 7.94507 10.19 8.70903C9.80215 9.47298 9.26738 10.0724 8.5857 10.5073C7.91576 10.9421 7.17531 11.1596 6.36435 11.1596C5.78844 11.1596 5.30656 11.0126 4.9187 10.7188C4.74241 10.5895 4.63663 10.5249 4.60137 10.5249C4.5191 10.5249 4.47796 10.6365 4.47796 10.8599V10.9656C4.47796 11.471 4.5191 11.8471 4.60137 12.0939C4.68364 12.3525 4.88932 12.5817 5.21841 12.7815C5.35945 12.8638 5.46523 12.946 5.53575 13.0283C5.60627 13.1223 5.64152 13.2399 5.64152 13.3809C5.64152 13.5572 5.58864 13.6924 5.48286 13.7864C5.37708 13.8922 5.15964 13.9686 4.83056 14.0156C4.51322 14.0744 4.04309 14.1037 3.42017 14.1037H2.32713ZM6.08227 9.80207C6.45837 9.80207 6.77571 9.63165 7.03428 9.29081C7.29285 8.94997 7.42213 8.45046 7.42213 7.79228C7.42213 6.79326 7.28109 5.93528 6.99902 5.21833C6.71694 4.50139 6.31733 4.14292 5.80019 4.14292C5.37708 4.14292 5.04799 4.33097 4.81293 4.70707C4.58962 5.07142 4.47796 5.61206 4.47796 6.32901V6.76975C4.47796 7.75702 4.62488 8.50922 4.9187 9.02636C5.22429 9.5435 5.61214 9.80207 6.08227 9.80207Z" fill="#EB4D2A"/></svg>`;

const bookOpenSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_151_888)"><path d="M17 5.31714C17.925 5.15014 18.894 5.05314 19.956 5.01714C20.524 4.99814 21 5.44814 21 6.01614V17.8531C21 18.3951 20.567 18.8431 20.026 18.8511C16.934 18.8981 14.606 19.4681 12 21.0001C9.394 19.4681 7.066 18.8981 3.974 18.8521C3.433 18.8441 3 18.3951 3 17.8531V6.01614C3 5.45714 3.459 4.99814 4.017 5.01614C7.088 5.11514 9.406 5.69314 12 7.14614" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 15.2381V3.01212C17 2.28312 16.234 1.77412 15.583 2.10112C13.827 2.98112 12.347 4.77012 12 6.61212V21.0001C12.396 18.9011 14.261 16.8711 16.331 16.1761C16.733 16.0411 17 15.6621 17 15.2381Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;

const groupUserSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_151_734)"><path d="M2 19C2 16.791 3.791 15 6 15H10C12.209 15 14 16.791 14 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.4749 6.02513C11.8417 7.39197 11.8417 9.60804 10.4749 10.9749C9.10804 12.3417 6.89197 12.3417 5.52513 10.9749C4.15829 9.60804 4.15829 7.39197 5.52513 6.02513C6.89197 4.65829 9.10804 4.65829 10.4749 6.02513Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 14H19C20.657 14 22 15.343 22 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.2678 6.73223C20.2441 7.70854 20.2441 9.29145 19.2678 10.2678C18.2915 11.2441 16.7085 11.2441 15.7322 10.2678C14.7559 9.29145 14.7559 7.70854 15.7322 6.73223C16.7085 5.75592 18.2915 5.75592 19.2678 6.73223Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;

const heartLoveWeddingSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_151_898)"><path d="M9.071 19.0709H6.929C5.824 19.0709 4.929 18.1759 4.929 17.0709V15.7569C4.929 15.2269 4.718 14.7179 4.343 14.3429L3.414 13.4139C2.633 12.6329 2.633 11.3669 3.414 10.5859L4.343 9.65687C4.718 9.28187 4.929 8.77288 4.929 8.24288V6.92887C4.929 5.82387 5.824 4.92887 6.929 4.92887H8.243C8.773 4.92887 9.282 4.71787 9.657 4.34287L10.586 3.41387C11.367 2.63287 12.633 2.63287 13.414 3.41387L14.343 4.34287C14.718 4.71787 15.227 4.92887 15.757 4.92887H17.071C18.176 4.92887 19.071 5.82387 19.071 6.92887V8.24288C19.071 8.77288 19.282 9.28187 19.657 9.65687L20.586 10.5859C21.367 11.3669 21.367 12.6329 20.586 13.4139L19.657 14.3429C19.282 14.7179 19.071 15.2269 19.071 15.7569V17.0709C19.071 18.1759 18.176 19.0709 17.071 19.0709H15.757C15.227 19.0709 14.718 19.2819 14.343 19.6569L13.414 20.5859C12.633 21.3669 11.367 21.3669 10.586 20.5859L9.071 19.0709Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.643 8.9707C15.054 8.9707 16 10.2857 16 11.5097C16 13.9947 12.071 16.0297 12 16.0297C11.929 16.0297 8 13.9947 8 11.5097C8 10.2857 8.946 8.9707 10.357 8.9707C11.164 8.9707 11.694 9.3697 12 9.7257C12.306 9.3697 12.836 8.9707 13.643 8.9707Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;

const groupPaperSvg = `<svg width="353" height="259" viewBox="0 0 353 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M158.856 83.124L90.4682 102.28C71.6016 75.3509 65.1822 42.5303 64.9434 11.1564L133.331 -7.99981C134.934 30.3178 141.9 54.5652 158.856 83.124Z" fill="url(#paint0_linear_151_874)"/><path d="M274.151 139.825L226.814 122.106C227.285 98.7091 237.383 77.1561 250.424 59.0304L297.762 76.7499C282.588 99.4377 276.405 116.295 274.151 139.825Z" fill="url(#paint1_linear_151_874)"/><path d="M-1.61597 258.69L-25.4712 249.76C-25.2335 237.97 -20.1449 227.109 -13.573 217.974L10.2822 226.904C2.63534 238.337 -0.480243 246.832 -1.61597 258.69Z" fill="url(#paint2_linear_151_874)"/><path d="M110.754 146.854L78.8793 150.056C72.5867 136.626 72.2824 121.544 74.6121 107.585L106.487 104.382C104.224 121.533 105.437 132.848 110.754 146.854Z" fill="url(#paint3_linear_151_874)"/><path d="M377.476 194.533L354.993 204.159C347.337 195.816 343.664 184.901 342.167 174.2L364.651 164.575C366.927 177.584 370.399 185.548 377.476 194.533Z" fill="url(#paint4_linear_151_874)"/><path d="M278.51 4.9585L256.026 14.5839C248.37 6.24134 244.698 -4.67412 243.201 -15.3745L265.685 -24.9999C267.96 -11.9905 271.433 -4.02659 278.51 4.9585Z" fill="url(#paint5_linear_151_874)"/><defs><linearGradient id="paint0_linear_151_874" x1="95.6657" y1="2.55077" x2="121.19" y2="93.6746" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient><linearGradient id="paint1_linear_151_874" x1="271.69" y1="66.9906" x2="248.079" y2="130.066" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient><linearGradient id="paint2_linear_151_874" x1="-2.85642" y1="221.986" x2="-14.7546" y2="253.772" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient><linearGradient id="paint3_linear_151_874" x1="88.9315" y1="106.146" x2="93.1986" y2="148.618" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient><linearGradient id="paint4_linear_151_874" x1="352.268" y1="169.876" x2="365.093" y2="199.835" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient><linearGradient id="paint5_linear_151_874" x1="253.301" y1="-19.6986" x2="266.127" y2="10.2598" gradientUnits="userSpaceOnUse"><stop stop-color="#FCF3EC"/><stop offset="1" stop-color="#EAD5C5"/></linearGradient></defs></svg>`;

// Mock data - Backend developers should replace with real API calls
const MOCK_USER_DATA = {
  name: 'Mark Jacobs',
  username: '@markj',
  memberSince: '2002',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  stats: {
    books: 456,
    points: '4.2K',
    followers: '8.9K',
  }
};

// Import SVG icons
const leftArrowSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_151_933)">
<path d="M4.01001 11.98H19" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.013 5.98779L4.00195 11.9998L10.013 18.0118" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_151_933">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const shareSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_151_923)">
<path d="M8.55286 10.1142C9.59439 11.1557 9.59439 12.8443 8.55286 13.8859C7.51133 14.9274 5.82268 14.9274 4.78115 13.8859C3.73962 12.8443 3.73962 11.1557 4.78115 10.1142C5.82268 9.07263 7.51133 9.07263 8.55286 10.1142Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2189 4.78115C20.2604 5.82268 20.2604 7.51133 19.2189 8.55286C18.1773 9.59439 16.4887 9.59439 15.4472 8.55286C14.4056 7.51133 14.4056 5.82268 15.4472 4.78115C16.4887 3.73962 18.1773 3.73962 19.2189 4.78115Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2189 15.4472C20.2604 16.4887 20.2604 18.1773 19.2189 19.2189C18.1773 20.2604 16.4887 20.2604 15.4472 19.2189C14.4056 18.1773 14.4056 16.4887 15.4472 15.4472C16.4887 14.4056 18.1773 14.4056 19.2189 15.4472Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.04004 10.8101L14.96 7.8501" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.04004 13.1899L14.96 16.1499" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_151_923">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const settingsGearSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_504_506)">
<path d="M3.90007 15.6468L5.29807 15.8608C6.33007 16.0188 7.06707 16.9428 6.99107 17.9838L6.88807 19.3948C6.85807 19.8058 7.08207 20.1928 7.45307 20.3718L8.48707 20.8698C8.85807 21.0488 9.30107 20.9818 9.60407 20.7028L10.6431 19.7428C11.4091 19.0348 12.5911 19.0348 13.3581 19.7428L14.3971 20.7028C14.7001 20.9828 15.1421 21.0488 15.5141 20.8698L16.5501 20.3708C16.9201 20.1928 17.1431 19.8068 17.1131 19.3968L17.0101 17.9838C16.9341 16.9428 17.6711 16.0188 18.7031 15.8608L20.1011 15.6468C20.5081 15.5848 20.8361 15.2798 20.9281 14.8778L21.1831 13.7598C21.2751 13.3578 21.1121 12.9408 20.7721 12.7088L19.6051 11.9098C18.7441 11.3198 18.4811 10.1678 19.0011 9.26278L19.7061 8.03678C19.9111 7.67978 19.8771 7.23278 19.6201 6.91078L18.9051 6.01378C18.6481 5.69178 18.2201 5.55878 17.8261 5.67978L16.4741 6.09378C15.4751 6.39978 14.4101 5.88678 14.0261 4.91578L13.5081 3.60278C13.3561 3.21878 12.9851 2.96678 12.5721 2.96778L11.4261 2.97078C11.0131 2.97178 10.6431 3.22578 10.4931 3.61078L9.98807 4.90878C9.60807 5.88578 8.53807 6.40278 7.53607 6.09478L6.12807 5.66278C5.73307 5.54078 5.30307 5.67478 5.04607 5.99878L4.33607 6.89678C4.07907 7.22178 4.04807 7.66978 4.25707 8.02678L4.97807 9.25578C5.50907 10.1618 5.24907 11.3248 4.38307 11.9178L3.23007 12.7078C2.89007 12.9408 2.72707 13.3578 2.81907 13.7588L3.07407 14.8768C3.16507 15.2798 3.49307 15.5848 3.90007 15.6468Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.916 10.0835C14.974 11.1415 14.974 12.8575 13.916 13.9155C12.858 14.9735 11.142 14.9735 10.084 13.9155C9.02603 12.8575 9.02603 11.1415 10.084 10.0835C11.142 9.02554 12.858 9.02554 13.916 10.0835Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_504_506">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const penToolSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_360_306)">
<path d="M17.002 12.4502L19.697 9.75523C20.1 9.35223 20.1 8.69823 19.697 8.29523L15.705 4.30323C15.302 3.90023 14.648 3.90023 14.245 4.30323L11.55 6.99823L7.225 8.46623C6.518 8.70623 5.996 9.30923 5.859 10.0422L4 20.0002L13.958 18.1412C14.692 18.0042 15.294 17.4822 15.534 16.7752L17.002 12.4502Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 12.45L11.55 7" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 20.0001L9.19 14.8101" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.7795 12.2206C12.4961 12.9372 12.4961 14.099 11.7795 14.8156C11.0629 15.5323 9.90104 15.5323 9.18443 14.8156C8.46782 14.099 8.46782 12.9372 9.18443 12.2206C9.90104 11.504 11.0629 11.504 11.7795 12.2206Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const rightArrowSvg = `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_360_294)">
<path d="M10.677 6.98926H2.84132" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.53904 3.85693L10.6812 6.99957L7.53904 10.1422" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const authorEllipseSvg = `<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11.5" cy="11.5" r="11.5" transform="matrix(-1 0 0 1 24 1.5)" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function ProfileScreen() {
  // TODO: Backend integration - fetch user profile data
  const handleBackPress = () => {
    router.back();
  };

  const handleCreateAuthorAccount = () => {
    router.push('/profile/create-author/create-author');
  };

  const handleBooksPress = () => {
    router.push('/my-books' as any);
  };

  const handlePointsPress = () => {
    router.push('/points' as any);
  };

  const handleFollowersPress = () => {
    router.push('/followers' as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleBackPress}
            accessibilityLabel="Go back"
          >
            <SvgXml xml={leftArrowSvg} width={24} height={24} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profile</Text>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => {}}
              accessibilityLabel="Share profile"
            >
              <SvgXml xml={shareSvg} width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerButton, { marginLeft: 12 }]}
              onPress={() => {}}
              accessibilityLabel="Settings"
            >
              <SvgXml xml={settingsGearSvg} width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={[styles.scrollView, { marginTop: 24 }]}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 200 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Membership Card */}
          <LinearGradient
            colors={['#F9763D', '#EB4D2A']}
            start={{ x: 0, y: 0.002 }}
            end={{ x: 0, y: 0.9843 }}
            style={styles.membershipCard}
          >
            {/* Decorative papers background */}
            <SvgXml
              xml={groupPaperSvg}
              style={styles.paperDecoration}
              width={screenWidth - 60}
              height={(screenWidth - 60) * (259/353)}
            />
            
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.logoContainer}>
                <SvgXml xml={pagezLogoSvg} width={48} height={15} />
                <Text style={styles.membershipText}>MEMBERSHIP CARD</Text>
              </View>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image 
                  source={{ uri: MOCK_USER_DATA.profileImage }}
                  style={styles.profileImage}
                  accessibilityLabel={`${MOCK_USER_DATA.name}'s profile picture`}
                />
              </View>
              
              <Text style={styles.userName}>{MOCK_USER_DATA.name}</Text>
              <Text style={styles.userHandle}>{MOCK_USER_DATA.username}</Text>
              <Text style={{
                fontSize: 14,
                fontFamily: 'Inter',
                fontWeight: '600',
                color: 'white',
                letterSpacing: 1,
              }}>
                MEMBER SINCE 2021
              </Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <TouchableOpacity 
                style={styles.statItem}
                onPress={handleBooksPress}
                accessibilityLabel={`${MOCK_USER_DATA.stats.books} books`}
              >
                <SvgXml xml={bookOpenSvg} width={20} height={20} />
                <View style={styles.statTextContainer}>
                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: 2,
                  }}>456</Text>
                  <Text style={styles.statLabel}>Books</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.statItem}
                onPress={handlePointsPress}
                accessibilityLabel="4.2K points"
              >
                <SvgXml xml={heartLoveWeddingSvg} width={20} height={20} />
                <View style={styles.statTextContainer}>
                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: 2,
                  }}>4.2K</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.statItem}
                onPress={handleFollowersPress}
                accessibilityLabel="8.9K followers"
              >
                <SvgXml xml={groupUserSvg} width={20} height={20} />
                <View style={styles.statTextContainer}>
                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: 2,
                  }}>8.9K</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Create Author Account Button */}
          <View style={styles.createAuthorWrapper}>
            <TouchableOpacity 
              style={styles.createAuthorButton}
              onPress={handleCreateAuthorAccount}
            >
              <View style={styles.createAuthorContent}>
                <View style={styles.createAuthorLeft}>
                  <SvgXml xml={penToolSvg} width={24} height={24} />
                  <Text style={styles.createAuthorText}>Create author account</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <SvgXml xml={authorEllipseSvg} width={25} height={26} />
                  <View style={styles.rightArrowWrapper}>
                    <SvgXml xml={rightArrowSvg} width={13} height={14} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF3EC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 56,
    backgroundColor: '#FCF3EC',
    borderBottomWidth: 0
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontFamily: 'Bogart-Medium-trial',
    fontSize: 16,
    color: '#1E1E1E'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 24
  },
  membershipCard: {
    width: screenWidth - 60,
    height: 388,
    flexShrink: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.09)',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
    marginHorizontal: 30,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
    zIndex: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  membershipText: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-trial',
    color: 'white',
    letterSpacing: 1.2,
    opacity: 0.9,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 2,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  userName: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-trial',
    color: 'white',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-trial',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-trial',
    color: 'white',
    letterSpacing: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
    zIndex: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  statTextContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-trial',
    color: 'white',
    marginBottom: 2,
    lineHeight: 24,
    textAlign: 'left',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  createAuthorWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  createAuthorButton: {
    width: '100%',
    maxWidth: 353,
    padding: 20,
    backgroundColor: '#F8F0EA',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(137, 138, 141, 0.17)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createAuthorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createAuthorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  createAuthorText: {
    fontFamily: 'Bogart-Medium-trial',
    fontSize: 16,
    color: '#1E1E1E',
    marginLeft: 12,
  },
  arrowContainer: {
    position: 'relative',
    width: 25,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrowWrapper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -6.5 },
      { translateY: -7 }
    ] as any,
  },
  paperDecoration: {
    position: 'absolute',
    width: screenWidth - 60,
    height: (screenWidth - 60) * (259/353),
    flexShrink: 0,
    top: 0,
    left: 0,
    opacity: 1,
    zIndex: 1,
  },
});