export const categories = ['US', 'FR', 'NANAR', 'B.O', 'UCPM', 'VUS', 'SÉRIES', 'LP'] as const
export type Category = typeof categories[number]
export type Entry = { title: string; year: number; category: Category; colors: [string, string]; seen?: boolean }
const films: [string, number][] = [
  ['Les Dents de la mer', 1975], ['Retour vers le futur', 1985], ["L’Arme fatale 2", 1989], ["Des hommes d’honneur", 1992],
  ['Un jour sans fin', 1993], ['Pulp Fiction', 1994], ['Les Évadés', 1994], ['Le Flic de Beverly Hills 2', 1987], ['Point Break', 1991],
  ['Seven', 1995], ['Forrest Gump', 1994], ['La Guerre des Rose', 1989], ['Impitoyable', 1992], ['The Big Lebowski', 1998],
  ['Les Affranchis', 1990], ['Cocktail', 1988], ['True Romance', 1993], ['Philadelphia', 1993], ['Danse avec les loups', 1990]
]
const palette: Entry['colors'][] = [['#176983','#d5e6d6'],['#2b215a','#ffbb59'],['#6d241d','#e8a944'],['#292748','#d4b79b'],['#554d3a','#e9dbc1'],['#861e33','#ffd548'],['#303362','#d6d8fc'],['#88391a','#fa9f3c'],['#375873','#d0e2ef']]
export const catalog: Entry[] = [
  ...films.map(([title,year],i): Entry=>({title, year, category:'US', colors:palette[i%palette.length], seen:i%3===0})),
  {title:'Le Samouraï',year:1967,category:'FR',colors:palette[3]},
  {title:'Twin Peaks',year:1990,category:'SÉRIES',colors:palette[6]},
  {title:'Kind of Blue',year:1959,category:'LP',colors:palette[8]}
]
const normalize = (title: string) => title.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase()
export function visibleEntries(entries: Entry[], category: Category, query: string) {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean)
  return entries.filter(entry => {
    const matchesCategory = category === 'VUS' ? entry.seen === true : entry.category === category
    return matchesCategory && words.every(word => normalize(entry.title).includes(word) || String(entry.year).includes(word))
  })
}
