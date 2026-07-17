import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, Polygon } from 'react-native-svg';
import { StyleSheet } from 'react-native';

export interface TemplateProps {
  fills: Record<string, string>;
  onFill: (regionId: string) => void;
}

// 1. Flower
export const FlowerTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 150" style={styles.svgImage}>
    <Path d="M 50 60 Q 60 100 50 140" stroke="#1e293b" strokeWidth="6" fill="none" />
    <Path d="M 50 100 Q 20 100 30 80 Q 45 90 50 100 Z" stroke="#1e293b" strokeWidth="4" fill={fills['leaf1'] || '#ffffff'} onPress={() => onFill('leaf1')} />
    <Path d="M 50 110 Q 80 110 70 90 Q 55 100 50 110 Z" stroke="#1e293b" strokeWidth="4" fill={fills['leaf2'] || '#ffffff'} onPress={() => onFill('leaf2')} />
    <Circle cx="50" cy="25" r="18" stroke="#1e293b" strokeWidth="4" fill={fills['petal1'] || '#ffffff'} onPress={() => onFill('petal1')} />
    <Circle cx="75" cy="50" r="18" stroke="#1e293b" strokeWidth="4" fill={fills['petal2'] || '#ffffff'} onPress={() => onFill('petal2')} />
    <Circle cx="50" cy="75" r="18" stroke="#1e293b" strokeWidth="4" fill={fills['petal3'] || '#ffffff'} onPress={() => onFill('petal3')} />
    <Circle cx="25" cy="50" r="18" stroke="#1e293b" strokeWidth="4" fill={fills['petal4'] || '#ffffff'} onPress={() => onFill('petal4')} />
    <Circle cx="50" cy="50" r="15" stroke="#1e293b" strokeWidth="4" fill={fills['center'] || '#ffffff'} onPress={() => onFill('center')} />
  </Svg>
);

// 2. Apple
export const AppleTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 120" style={styles.svgImage}>
    <Path d="M 50 25 Q 55 10 65 5" stroke="#1e293b" strokeWidth="4" fill="none" />
    <Path d="M 55 15 Q 75 5 80 20 Q 65 30 55 15 Z" stroke="#1e293b" strokeWidth="4" fill={fills['leaf'] || '#ffffff'} onPress={() => onFill('leaf')} />
    <Path d="M 50 25 C 40 10 20 15 15 35 C 10 60 25 90 45 95 C 50 96 55 95 55 95 C 75 90 90 60 85 35 C 80 15 60 10 50 25 Z" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
  </Svg>
);

// 3. Car
export const CarTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 120 100" style={styles.svgImage}>
    <Path d="M 30 40 L 40 15 L 80 15 L 90 40 Z" stroke="#1e293b" strokeWidth="4" fill={fills['top'] || '#ffffff'} onPress={() => onFill('top')} />
    <Path d="M 10 40 L 110 40 L 110 65 L 10 65 Z" stroke="#1e293b" strokeWidth="4" fill={fills['bottom'] || '#ffffff'} onPress={() => onFill('bottom')} />
    <Path d="M 35 40 L 43 20 L 58 20 L 58 40 Z" stroke="#1e293b" strokeWidth="4" fill={fills['win1'] || '#ffffff'} onPress={() => onFill('win1')} />
    <Path d="M 62 40 L 62 20 L 77 20 L 85 40 Z" stroke="#1e293b" strokeWidth="4" fill={fills['win2'] || '#ffffff'} onPress={() => onFill('win2')} />
    <Circle cx="30" cy="65" r="15" stroke="#1e293b" strokeWidth="4" fill={fills['wheel1'] || '#ffffff'} onPress={() => onFill('wheel1')} />
    <Circle cx="30" cy="65" r="6" stroke="#1e293b" strokeWidth="2" fill={fills['hub1'] || '#ffffff'} onPress={() => onFill('hub1')} />
    <Circle cx="90" cy="65" r="15" stroke="#1e293b" strokeWidth="4" fill={fills['wheel2'] || '#ffffff'} onPress={() => onFill('wheel2')} />
    <Circle cx="90" cy="65" r="6" stroke="#1e293b" strokeWidth="2" fill={fills['hub2'] || '#ffffff'} onPress={() => onFill('hub2')} />
  </Svg>
);

// 4. Sun
export const SunTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Polygon points="50,5 55,25 50,30 45,25" stroke="#1e293b" strokeWidth="3" fill={fills['ray1'] || '#ffffff'} onPress={() => onFill('ray1')} />
    <Polygon points="50,95 55,75 50,70 45,75" stroke="#1e293b" strokeWidth="3" fill={fills['ray2'] || '#ffffff'} onPress={() => onFill('ray2')} />
    <Polygon points="5,50 25,45 30,50 25,55" stroke="#1e293b" strokeWidth="3" fill={fills['ray3'] || '#ffffff'} onPress={() => onFill('ray3')} />
    <Polygon points="95,50 75,45 70,50 75,55" stroke="#1e293b" strokeWidth="3" fill={fills['ray4'] || '#ffffff'} onPress={() => onFill('ray4')} />
    <Polygon points="18,18 32,32 36,28 22,14" stroke="#1e293b" strokeWidth="3" fill={fills['ray5'] || '#ffffff'} onPress={() => onFill('ray5')} />
    <Polygon points="82,82 68,68 64,72 78,86" stroke="#1e293b" strokeWidth="3" fill={fills['ray6'] || '#ffffff'} onPress={() => onFill('ray6')} />
    <Polygon points="82,18 68,32 64,28 78,14" stroke="#1e293b" strokeWidth="3" fill={fills['ray7'] || '#ffffff'} onPress={() => onFill('ray7')} />
    <Polygon points="18,82 32,68 36,72 22,86" stroke="#1e293b" strokeWidth="3" fill={fills['ray8'] || '#ffffff'} onPress={() => onFill('ray8')} />
    <Circle cx="50" cy="50" r="22" stroke="#1e293b" strokeWidth="4" fill={fills['center'] || '#ffffff'} onPress={() => onFill('center')} />
  </Svg>
);

// 5. Tree
export const TreeTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 120" style={styles.svgImage}>
    <Path d="M 40 100 L 45 50 L 55 50 L 60 100 Z" stroke="#1e293b" strokeWidth="4" fill={fills['trunk'] || '#ffffff'} onPress={() => onFill('trunk')} />
    <Circle cx="50" cy="30" r="25" stroke="#1e293b" strokeWidth="4" fill={fills['leaves1'] || '#ffffff'} onPress={() => onFill('leaves1')} />
    <Circle cx="30" cy="50" r="20" stroke="#1e293b" strokeWidth="4" fill={fills['leaves2'] || '#ffffff'} onPress={() => onFill('leaves2')} />
    <Circle cx="70" cy="50" r="20" stroke="#1e293b" strokeWidth="4" fill={fills['leaves3'] || '#ffffff'} onPress={() => onFill('leaves3')} />
  </Svg>
);

// 6. House
export const HouseTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Rect x="20" y="45" width="60" height="50" stroke="#1e293b" strokeWidth="4" fill={fills['wall'] || '#ffffff'} onPress={() => onFill('wall')} />
    <Polygon points="10,45 50,15 90,45" stroke="#1e293b" strokeWidth="4" fill={fills['roof'] || '#ffffff'} onPress={() => onFill('roof')} />
    <Rect x="40" y="65" width="20" height="30" stroke="#1e293b" strokeWidth="4" fill={fills['door'] || '#ffffff'} onPress={() => onFill('door')} />
    <Rect x="25" y="55" width="12" height="12" stroke="#1e293b" strokeWidth="4" fill={fills['win1'] || '#ffffff'} onPress={() => onFill('win1')} />
    <Rect x="63" y="55" width="12" height="12" stroke="#1e293b" strokeWidth="4" fill={fills['win2'] || '#ffffff'} onPress={() => onFill('win2')} />
  </Svg>
);

// 7. Ice Cream
export const IceCreamTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 120" style={styles.svgImage}>
    <Polygon points="25,60 75,60 50,110" stroke="#1e293b" strokeWidth="4" fill={fills['cone'] || '#ffffff'} onPress={() => onFill('cone')} />
    <Circle cx="50" cy="50" r="25" stroke="#1e293b" strokeWidth="4" fill={fills['scoop1'] || '#ffffff'} onPress={() => onFill('scoop1')} />
    <Circle cx="50" cy="25" r="20" stroke="#1e293b" strokeWidth="4" fill={fills['scoop2'] || '#ffffff'} onPress={() => onFill('scoop2')} />
    <Circle cx="50" cy="5" r="8" stroke="#1e293b" strokeWidth="4" fill={fills['cherry'] || '#ffffff'} onPress={() => onFill('cherry')} />
  </Svg>
);

// 8. Fish
export const FishTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 120 80" style={styles.svgImage}>
    <Polygon points="15,40 5,20 25,40" stroke="#1e293b" strokeWidth="4" fill={fills['tailTop'] || '#ffffff'} onPress={() => onFill('tailTop')} />
    <Polygon points="15,40 5,60 25,40" stroke="#1e293b" strokeWidth="4" fill={fills['tailBot'] || '#ffffff'} onPress={() => onFill('tailBot')} />
    <Ellipse cx="60" cy="40" rx="40" ry="25" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Polygon points="55,15 70,5 65,18" stroke="#1e293b" strokeWidth="4" fill={fills['finTop'] || '#ffffff'} onPress={() => onFill('finTop')} />
    <Circle cx="80" cy="30" r="4" stroke="#1e293b" strokeWidth="2" fill={fills['eye'] || '#ffffff'} onPress={() => onFill('eye')} />
  </Svg>
);

// 9. Butterfly
export const ButterflyTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 120 100" style={styles.svgImage}>
    <Ellipse cx="40" cy="35" rx="30" ry="25" stroke="#1e293b" strokeWidth="4" fill={fills['wingTL'] || '#ffffff'} onPress={() => onFill('wingTL')} />
    <Ellipse cx="80" cy="35" rx="30" ry="25" stroke="#1e293b" strokeWidth="4" fill={fills['wingTR'] || '#ffffff'} onPress={() => onFill('wingTR')} />
    <Ellipse cx="45" cy="70" rx="20" ry="25" stroke="#1e293b" strokeWidth="4" fill={fills['wingBL'] || '#ffffff'} onPress={() => onFill('wingBL')} />
    <Ellipse cx="75" cy="70" rx="20" ry="25" stroke="#1e293b" strokeWidth="4" fill={fills['wingBR'] || '#ffffff'} onPress={() => onFill('wingBR')} />
    <Ellipse cx="60" cy="50" rx="8" ry="35" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Path d="M 60 15 Q 50 5 45 10" stroke="#1e293b" strokeWidth="3" fill="none" />
    <Path d="M 60 15 Q 70 5 75 10" stroke="#1e293b" strokeWidth="3" fill="none" />
  </Svg>
);

// 10. Heart
export const HeartTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Path d="M 50 30 C 50 30 35 10 15 20 C -5 30 5 65 50 95 C 95 65 105 30 85 20 C 65 10 50 30 50 30 Z" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
  </Svg>
);

// 11. Star
export const StarTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Path d="M 50 10 L 62 38 L 90 42 L 68 61 L 74 90 L 50 75 L 26 90 L 32 61 L 10 42 L 38 38 Z" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
  </Svg>
);

// 12. Boat
export const BoatTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Path d="M 20 60 L 80 60 L 70 85 L 30 85 Z" stroke="#1e293b" strokeWidth="4" fill={fills['hull'] || '#ffffff'} onPress={() => onFill('hull')} />
    <Path d="M 50 60 L 50 15" stroke="#1e293b" strokeWidth="4" fill="none" />
    <Polygon points="50,15 80,50 50,55" stroke="#1e293b" strokeWidth="4" fill={fills['sail1'] || '#ffffff'} onPress={() => onFill('sail1')} />
    <Polygon points="45,25 20,50 45,55" stroke="#1e293b" strokeWidth="4" fill={fills['sail2'] || '#ffffff'} onPress={() => onFill('sail2')} />
  </Svg>
);

// 13. Balloon
export const BalloonTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 120" style={styles.svgImage}>
    <Path d="M 50 75 L 50 115" stroke="#1e293b" strokeWidth="3" fill="none" />
    <Polygon points="45,75 55,75 50,85" stroke="#1e293b" strokeWidth="3" fill={fills['tie'] || '#ffffff'} onPress={() => onFill('tie')} />
    <Ellipse cx="50" cy="40" rx="35" ry="40" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Path d="M 30 25 Q 40 10 50 15" stroke="#1e293b" strokeWidth="2" fill="none" />
  </Svg>
);

// 14. Rocket
export const RocketTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 120" style={styles.svgImage}>
    <Polygon points="35,30 65,30 50,5" stroke="#1e293b" strokeWidth="4" fill={fills['nose'] || '#ffffff'} onPress={() => onFill('nose')} />
    <Rect x="35" y="30" width="30" height="50" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Circle cx="50" cy="50" r="8" stroke="#1e293b" strokeWidth="4" fill={fills['win'] || '#ffffff'} onPress={() => onFill('win')} />
    <Polygon points="35,60 20,80 35,80" stroke="#1e293b" strokeWidth="4" fill={fills['finL'] || '#ffffff'} onPress={() => onFill('finL')} />
    <Polygon points="65,60 80,80 65,80" stroke="#1e293b" strokeWidth="4" fill={fills['finR'] || '#ffffff'} onPress={() => onFill('finR')} />
    <Polygon points="40,80 60,80 50,110" stroke="#1e293b" strokeWidth="4" fill={fills['flame'] || '#ffffff'} onPress={() => onFill('flame')} />
  </Svg>
);

// 15. Pizza
export const PizzaTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Polygon points="50,10 20,80 80,80" stroke="#1e293b" strokeWidth="4" fill={fills['slice'] || '#ffffff'} onPress={() => onFill('slice')} />
    <Path d="M 15 80 Q 50 95 85 80" stroke="#1e293b" strokeWidth="6" fill={fills['crust'] || '#ffffff'} onPress={() => onFill('crust')} />
    <Circle cx="45" cy="40" r="6" stroke="#1e293b" strokeWidth="2" fill={fills['pep1'] || '#ffffff'} onPress={() => onFill('pep1')} />
    <Circle cx="55" cy="65" r="6" stroke="#1e293b" strokeWidth="2" fill={fills['pep2'] || '#ffffff'} onPress={() => onFill('pep2')} />
    <Circle cx="35" cy="55" r="6" stroke="#1e293b" strokeWidth="2" fill={fills['pep3'] || '#ffffff'} onPress={() => onFill('pep3')} />
  </Svg>
);

// 16. Bear
export const BearTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Circle cx="25" cy="30" r="15" stroke="#1e293b" strokeWidth="4" fill={fills['earL'] || '#ffffff'} onPress={() => onFill('earL')} />
    <Circle cx="75" cy="30" r="15" stroke="#1e293b" strokeWidth="4" fill={fills['earR'] || '#ffffff'} onPress={() => onFill('earR')} />
    <Circle cx="50" cy="55" r="35" stroke="#1e293b" strokeWidth="4" fill={fills['head'] || '#ffffff'} onPress={() => onFill('head')} />
    <Ellipse cx="50" cy="70" rx="15" ry="10" stroke="#1e293b" strokeWidth="4" fill={fills['snout'] || '#ffffff'} onPress={() => onFill('snout')} />
    <Circle cx="35" cy="45" r="4" fill="#1e293b" />
    <Circle cx="65" cy="45" r="4" fill="#1e293b" />
    <Circle cx="50" cy="67" r="3" fill="#1e293b" />
  </Svg>
);

// 17. Cat
export const CatTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Polygon points="20,20 40,40 20,50" stroke="#1e293b" strokeWidth="4" fill={fills['earL'] || '#ffffff'} onPress={() => onFill('earL')} />
    <Polygon points="80,20 60,40 80,50" stroke="#1e293b" strokeWidth="4" fill={fills['earR'] || '#ffffff'} onPress={() => onFill('earR')} />
    <Ellipse cx="50" cy="60" rx="40" ry="30" stroke="#1e293b" strokeWidth="4" fill={fills['head'] || '#ffffff'} onPress={() => onFill('head')} />
    <Circle cx="35" cy="55" r="4" fill="#1e293b" />
    <Circle cx="65" cy="55" r="4" fill="#1e293b" />
    <Polygon points="45,65 55,65 50,70" fill="#1e293b" />
    <Path d="M 40 70 L 20 65 M 40 75 L 20 75" stroke="#1e293b" strokeWidth="2" />
    <Path d="M 60 70 L 80 65 M 60 75 L 80 75" stroke="#1e293b" strokeWidth="2" />
  </Svg>
);

// 18. Moon
export const MoonTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Path d="M 60 10 A 40 40 0 1 0 90 60 A 35 35 0 1 1 60 10 Z" stroke="#1e293b" strokeWidth="4" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Circle cx="40" cy="30" r="5" stroke="#1e293b" strokeWidth="2" fill={fills['crater1'] || '#ffffff'} onPress={() => onFill('crater1')} />
    <Circle cx="30" cy="60" r="8" stroke="#1e293b" strokeWidth="2" fill={fills['crater2'] || '#ffffff'} onPress={() => onFill('crater2')} />
  </Svg>
);

// 19. Cloud
export const CloudTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Path d="M 30 60 C 20 60 10 50 15 40 C 15 30 25 25 35 30 C 45 15 65 15 70 30 C 85 25 95 35 90 50 C 95 65 75 75 65 65 C 55 75 35 75 30 60 Z" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
  </Svg>
);

// 20. Crown
export const CrownTemplate = ({ fills, onFill }: TemplateProps) => (
  <Svg viewBox="0 0 100 100" style={styles.svgImage}>
    <Polygon points="10,80 90,80 95,40 70,60 50,20 30,60 5,40" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" fill={fills['body'] || '#ffffff'} onPress={() => onFill('body')} />
    <Circle cx="5" cy="35" r="5" stroke="#1e293b" strokeWidth="3" fill={fills['gem1'] || '#ffffff'} onPress={() => onFill('gem1')} />
    <Circle cx="50" cy="15" r="5" stroke="#1e293b" strokeWidth="3" fill={fills['gem2'] || '#ffffff'} onPress={() => onFill('gem2')} />
    <Circle cx="95" cy="35" r="5" stroke="#1e293b" strokeWidth="3" fill={fills['gem3'] || '#ffffff'} onPress={() => onFill('gem3')} />
    <Ellipse cx="50" cy="65" rx="8" ry="5" stroke="#1e293b" strokeWidth="3" fill={fills['gem4'] || '#ffffff'} onPress={() => onFill('gem4')} />
  </Svg>
);

export const ALL_TEMPLATES = [
  { id: 'flower', icon: '🌸', component: FlowerTemplate },
  { id: 'apple', icon: '🍎', component: AppleTemplate },
  { id: 'car', icon: '🚗', component: CarTemplate },
  { id: 'sun', icon: '☀️', component: SunTemplate },
  { id: 'tree', icon: '🌳', component: TreeTemplate },
  { id: 'house', icon: '🏠', component: HouseTemplate },
  { id: 'icecream', icon: '🍦', component: IceCreamTemplate },
  { id: 'fish', icon: '🐟', component: FishTemplate },
  { id: 'butterfly', icon: '🦋', component: ButterflyTemplate },
  { id: 'heart', icon: '❤️', component: HeartTemplate },
  { id: 'star', icon: '⭐', component: StarTemplate },
  { id: 'boat', icon: '⛵', component: BoatTemplate },
  { id: 'balloon', icon: '🎈', component: BalloonTemplate },
  { id: 'rocket', icon: '🚀', component: RocketTemplate },
  { id: 'pizza', icon: '🍕', component: PizzaTemplate },
  { id: 'bear', icon: '🐻', component: BearTemplate },
  { id: 'cat', icon: '🐱', component: CatTemplate },
  { id: 'moon', icon: '🌙', component: MoonTemplate },
  { id: 'cloud', icon: '☁️', component: CloudTemplate },
  { id: 'crown', icon: '👑', component: CrownTemplate },
];

const styles = StyleSheet.create({
  svgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
