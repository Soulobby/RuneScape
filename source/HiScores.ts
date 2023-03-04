import { URLSearchParams } from "node:url";
import { request } from "undici";

/**
 * Represents the skills in RuneScape.
 */
export enum Skill {
	Attack = "Attack",
	Defence = "Defence",
	Strength = "Strength",
	Constitution = "Constitution",
	Ranged = "Ranged",
	Prayer = "Prayer",
	Magic = "Magic",
	Cooking = "Cooking",
	Woodcutting = "Woodcutting",
	Fletching = "Fletching",
	Fishing = "Fishing",
	Firemaking = "Firemaking",
	Crafting = "Crafting",
	Smithing = "Smithing",
	Mining = "Mining",
	Herblore = "Herblore",
	Agility = "Agility",
	Thieving = "Thieving",
	Slayer = "Slayer",
	Farming = "Farming",
	Runecrafting = "Runecrafting",
	Hunter = "Hunter",
	Construction = "Construction",
	Summoning = "Summoning",
	Dungeoneering = "Dungeoneering",
	Divination = "Divination",
	Invention = "Invention",
	Archaeology = "Archaeology",
}

/**
 * Represents the data of a HiScore skill.
 */
export interface HiScoreSkill<T extends "Total" | Skill> {
	name: T;
	rank: number;
	level: number;
	totalXP: number;
}

/**
 * Represents a player's HiScore data.
 */
export interface HiScore {
	total: HiScoreSkill<"Total">;
	attack: HiScoreSkill<Skill.Attack>;
	defence: HiScoreSkill<Skill.Defence>;
	strength: HiScoreSkill<Skill.Strength>;
	constitution: HiScoreSkill<Skill.Constitution>;
	ranged: HiScoreSkill<Skill.Ranged>;
	prayer: HiScoreSkill<Skill.Prayer>;
	magic: HiScoreSkill<Skill.Magic>;
	cooking: HiScoreSkill<Skill.Cooking>;
	woodcutting: HiScoreSkill<Skill.Woodcutting>;
	fletching: HiScoreSkill<Skill.Fletching>;
	fishing: HiScoreSkill<Skill.Fishing>;
	firemaking: HiScoreSkill<Skill.Firemaking>;
	crafting: HiScoreSkill<Skill.Crafting>;
	smithing: HiScoreSkill<Skill.Smithing>;
	mining: HiScoreSkill<Skill.Mining>;
	herblore: HiScoreSkill<Skill.Herblore>;
	agility: HiScoreSkill<Skill.Agility>;
	thieving: HiScoreSkill<Skill.Thieving>;
	slayer: HiScoreSkill<Skill.Slayer>;
	farming: HiScoreSkill<Skill.Farming>;
	runecrafting: HiScoreSkill<Skill.Runecrafting>;
	hunter: HiScoreSkill<Skill.Hunter>;
	construction: HiScoreSkill<Skill.Construction>;
	summoning: HiScoreSkill<Skill.Summoning>;
	dungeoneering: HiScoreSkill<Skill.Dungeoneering>;
	divination: HiScoreSkill<Skill.Divination>;
	invention: HiScoreSkill<Skill.Invention>;
	archaeology: HiScoreSkill<Skill.Archaeology>;
}

/**
 * Represents the options to provide for fetching a player's HiScore data.
 */
export interface HiScoreOptions {
	/**
	 * The player's name.
	 */
	name: string;
	/**
	 * The options for the request.
	 */
	requestOptions?: Parameters<typeof request>[1];
}

/**
 * Returns the player's HiScore data.
 *
 * @param options - The options to provide
 * @returns The HiScore data of the player.
 */
export async function hiScore({ name, requestOptions }: HiScoreOptions): Promise<HiScore> {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("player", name);
	const data = await request(`https://secure.runescape.com/m=hiscore/index_lite.ws?${urlSearchParams}`, requestOptions);
	if (data.statusCode !== 200) throw new Error(`[${data.statusCode}] Error fetching HiScore data.`);
	const html = await data.body.text();
	const dataLine = html.split("\n").map((line) => line.split(","));

	return {
		total: {
			name: "Total",
			rank: Number(dataLine[0]![0]),
			level: Number(dataLine[0]![1]),
			totalXP: Number(dataLine[0]![2]),
		},
		attack: {
			name: Skill.Attack,
			rank: Number(dataLine[1]![0]),
			level: Number(dataLine[1]![1]),
			totalXP: Number(dataLine[1]![2]),
		},
		defence: {
			name: Skill.Defence,
			rank: Number(dataLine[2]![0]),
			level: Number(dataLine[2]![1]),
			totalXP: Number(dataLine[2]![2]),
		},
		strength: {
			name: Skill.Strength,
			rank: Number(dataLine[3]![0]),
			level: Number(dataLine[3]![1]),
			totalXP: Number(dataLine[3]![2]),
		},
		constitution: {
			name: Skill.Constitution,
			rank: Number(dataLine[4]![0]),
			level: Number(dataLine[4]![1]),
			totalXP: Number(dataLine[4]![2]),
		},
		ranged: {
			name: Skill.Ranged,
			rank: Number(dataLine[5]![0]),
			level: Number(dataLine[5]![1]),
			totalXP: Number(dataLine[5]![2]),
		},
		prayer: {
			name: Skill.Prayer,
			rank: Number(dataLine[6]![0]),
			level: Number(dataLine[6]![1]),
			totalXP: Number(dataLine[6]![2]),
		},
		magic: {
			name: Skill.Magic,
			rank: Number(dataLine[7]![0]),
			level: Number(dataLine[7]![1]),
			totalXP: Number(dataLine[7]![2]),
		},
		cooking: {
			name: Skill.Cooking,
			rank: Number(dataLine[8]![0]),
			level: Number(dataLine[8]![1]),
			totalXP: Number(dataLine[8]![2]),
		},
		woodcutting: {
			name: Skill.Woodcutting,
			rank: Number(dataLine[9]![0]),
			level: Number(dataLine[9]![1]),
			totalXP: Number(dataLine[9]![2]),
		},
		fletching: {
			name: Skill.Fletching,
			rank: Number(dataLine[10]![0]),
			level: Number(dataLine[10]![1]),
			totalXP: Number(dataLine[10]![2]),
		},
		fishing: {
			name: Skill.Fishing,
			rank: Number(dataLine[11]![0]),
			level: Number(dataLine[11]![1]),
			totalXP: Number(dataLine[11]![2]),
		},
		firemaking: {
			name: Skill.Firemaking,
			rank: Number(dataLine[12]![0]),
			level: Number(dataLine[12]![1]),
			totalXP: Number(dataLine[12]![2]),
		},
		crafting: {
			name: Skill.Crafting,
			rank: Number(dataLine[13]![0]),
			level: Number(dataLine[13]![1]),
			totalXP: Number(dataLine[13]![2]),
		},
		smithing: {
			name: Skill.Smithing,
			rank: Number(dataLine[14]![0]),
			level: Number(dataLine[14]![1]),
			totalXP: Number(dataLine[14]![2]),
		},
		mining: {
			name: Skill.Mining,
			rank: Number(dataLine[15]![0]),
			level: Number(dataLine[15]![1]),
			totalXP: Number(dataLine[15]![2]),
		},
		herblore: {
			name: Skill.Herblore,
			rank: Number(dataLine[16]![0]),
			level: Number(dataLine[16]![1]),
			totalXP: Number(dataLine[16]![2]),
		},
		agility: {
			name: Skill.Agility,
			rank: Number(dataLine[17]![0]),
			level: Number(dataLine[17]![1]),
			totalXP: Number(dataLine[17]![2]),
		},
		thieving: {
			name: Skill.Thieving,
			rank: Number(dataLine[18]![0]),
			level: Number(dataLine[18]![1]),
			totalXP: Number(dataLine[18]![2]),
		},
		slayer: {
			name: Skill.Slayer,
			rank: Number(dataLine[19]![0]),
			level: Number(dataLine[19]![1]),
			totalXP: Number(dataLine[19]![2]),
		},
		farming: {
			name: Skill.Farming,
			rank: Number(dataLine[20]![0]),
			level: Number(dataLine[20]![1]),
			totalXP: Number(dataLine[20]![2]),
		},
		runecrafting: {
			name: Skill.Runecrafting,
			rank: Number(dataLine[21]![0]),
			level: Number(dataLine[21]![1]),
			totalXP: Number(dataLine[21]![2]),
		},
		hunter: {
			name: Skill.Hunter,
			rank: Number(dataLine[22]![0]),
			level: Number(dataLine[22]![1]),
			totalXP: Number(dataLine[22]![2]),
		},
		construction: {
			name: Skill.Construction,
			rank: Number(dataLine[23]![0]),
			level: Number(dataLine[23]![1]),
			totalXP: Number(dataLine[23]![2]),
		},
		summoning: {
			name: Skill.Summoning,
			rank: Number(dataLine[24]![0]),
			level: Number(dataLine[24]![1]),
			totalXP: Number(dataLine[24]![2]),
		},
		dungeoneering: {
			name: Skill.Dungeoneering,
			rank: Number(dataLine[25]![0]),
			level: Number(dataLine[25]![1]),
			totalXP: Number(dataLine[25]![2]),
		},
		divination: {
			name: Skill.Divination,
			rank: Number(dataLine[26]![0]),
			level: Number(dataLine[26]![1]),
			totalXP: Number(dataLine[26]![2]),
		},
		invention: {
			name: Skill.Invention,
			rank: Number(dataLine[27]![0]),
			level: Number(dataLine[27]![1]),
			totalXP: Number(dataLine[27]![2]),
		},
		archaeology: {
			name: Skill.Archaeology,
			rank: Number(dataLine[28]![0]),
			level: Number(dataLine[28]![1]),
			totalXP: Number(dataLine[28]![2]),
		},
	};
}
