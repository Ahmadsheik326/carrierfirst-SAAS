import { getLoads } from '@/actions/loads';
import LoadBoardClient from '@/components/load-board/load-board-client';

export default async function LoadBoardPage() {
  const loads = await getLoads();
  const available = loads.filter((l) =>
    ['pending', 'approved', 'bidding'].includes(l.status)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Load Board</h1>
      <LoadBoardClient loads={available} />
    </div>
  );
}