import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock a minimal db surface used by the queries module
const mockedDb: any = {
  query: { cards: { findMany: vi.fn() } },
  insert: vi.fn(),
  select: vi.fn(),
  delete: vi.fn(),
};

vi.mock("../index", () => ({ db: mockedDb }));

// Provide a lightweight tracer mock used by the module
vi.mock("@opentelemetry/api", () => {
  const tracerObj = {
    startActiveSpan: async (name: string, fn: any) => {
      return fn({ end: () => undefined });
    },
  };
  return {
    default: { trace: { getTracer: () => tracerObj } },
    trace: { getTracer: () => tracerObj },
  };
});

const cardsModule = await import("../queries/cards");
const {
  getCardByID,
  createNewCard,
  getCategoryByID,
  deleteCard,
  createNewCategory,
  listCategories,
  deleteCategory,
} = cardsModule;

describe("cards queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedDb.query.cards.findMany = vi.fn();
    mockedDb.insert = vi.fn();
    mockedDb.select = vi.fn();
    mockedDb.delete = vi.fn();
  });

  it("getCardByID returns validated card when found (number and string id)", async () => {
    const mockRow = {
      id: 1,
      category_key: 2,
      question: "Q? ",
      answer: "A!",
      use_history: { uses: [] },
      next_session: 1,
      category: {
        id: 2,
        category_name: "cat",
        session_number: 0,
        last_play_date: "2020-01-01",
      },
    };
    mockedDb.query.cards.findMany.mockResolvedValue([mockRow]);

    const result1 = await getCardByID(1);
    expect(result1).toMatchObject({ id: 1, question: "Q? " });

    const result2 = await getCardByID("1");
    expect(result2).toMatchObject({ id: 1, question: "Q? " });
  });

  it("getCardByID returns null when not found", async () => {
    mockedDb.query.cards.findMany.mockResolvedValue([]);
    const result = await getCardByID(9999);
    expect(result).toBeNull();
  });

  it("createNewCard inserts validated card and returns result", async () => {
    const cardInput = {
      category_key: 1,
      question: "q",
      answer: "a",
      next_session: 1,
      use_history: { uses: [] },
    };
    const returning = [{ id: 42, ...cardInput }];
    mockedDb.insert.mockImplementation(() => ({
      values: () => ({ returning: () => Promise.resolve(returning) }),
    }));

    const result = await createNewCard(cardInput);
    expect(result).toEqual(returning);
  });

  it("getCategoryByID returns validated category when found and null when not", async () => {
    const mockCategory = {
      id: 2,
      category_name: "cat",
      session_number: 0,
      last_play_date: "2020-01-01",
    };
    mockedDb.select.mockImplementation(() => ({
      from: () => ({ where: () => Promise.resolve([mockCategory]) }),
    }));

    const result = await getCategoryByID(2);
    expect(result).toMatchObject({ id: 2, category_name: "cat" });

    mockedDb.select.mockImplementation(() => ({
      from: () => ({ where: () => Promise.resolve([]) }),
    }));
    const result2 = await getCategoryByID(9999);
    expect(result2).toBeNull();
  });

  it("deleteCard calls delete and returns result", async () => {
    const returning = [{ id: 5 }];
    mockedDb.delete.mockImplementation(() => ({
      where: () => ({ returning: () => Promise.resolve(returning) }),
    }));
    const res = await deleteCard(5);
    expect(res).toEqual(returning);
  });

  it("createNewCategory inserts validated category and returns result", async () => {
    const categoryInput = {
      category_name: "new-cat",
      session_number: 0,
      last_play_date: "2020-01-01",
    };
    const returning = [{ id: 7, ...categoryInput }];
    mockedDb.insert.mockImplementation(() => ({
      values: () => ({ returning: () => Promise.resolve(returning) }),
    }));

    const result = await createNewCategory(categoryInput);
    expect(result).toEqual(returning);
  });

  it("listCategories queries categories and returns all categories", async () => {
    const mockList = [
      {
        id: 1,
        category_name: "cat",
        session_number: 0,
        last_play_date: "2020-01-01",
      },
      {
        id: 2,
        category_name: "dog",
        session_number: 0,
        last_play_date: "2020-01-01",
      },
    ];
    mockedDb.select.mockImplementation(() => ({
      from: () => Promise.resolve(mockList),
    }));

    const result = await listCategories();
    expect(mockedDb.select).toHaveBeenCalled();
    // expect(result).toBeUndefined();
    expect(result).toMatchObject([{ id: 1, category_name: "cat" },{ id: 2, category_name: "dog" }]);

  });

  it("deleteCategory deletes related cards then deletes category and returns result", async () => {
    const returning = [{ id: 3 }];
    mockedDb.delete
      .mockImplementationOnce(() => ({ where: () => Promise.resolve() }))
      .mockImplementationOnce(() => ({
        where: () => ({ returning: () => Promise.resolve(returning) }),
      }));

    const res = await deleteCategory(3);
    expect(mockedDb.delete).toHaveBeenCalledTimes(2);
    expect(res).toEqual(returning);
  });
});
