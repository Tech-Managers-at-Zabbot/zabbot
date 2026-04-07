import { db } from "@/lib/db";
import AgentCard from "./AgentCard";
import { Agent } from "@/types/agents";

export default async function AIHub() {
  let agents: Agent[] = [];

  try {
    const data = await db.aIAgent.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });

    agents = data.map((agent) => ({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      mascot: agent.mascot,
      xp: agent.xpReward,
      route: agent.route,
      color: agent.color,
      tag: agent.tag,
    }));
  } catch (error) {
    console.error("AIHub Fetch Error:", error);
  }

  if (!agents.length) {
    return (
      <div className="text-sm text-slate-400">
        No AI agents available
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-black text-[#162B6E] dark:text-white uppercase tracking-tight">
          AI Practice
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Turn knowledge into real Yoruba confidence
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}